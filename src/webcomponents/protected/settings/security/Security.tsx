"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Save, Loader2, Mail, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import {
  useGetMyProfile,
  useChangePasswordMutation,
  useRequestEmailChangeMutation,
  useVerifyOldEmailMutation,
  useVerifyNewEmailMutation,
} from "@/api/account"; // Adjust import path

const emailSchema = z.object({
  currentEmail: z.email("Invalid email address"),
  newEmail: z.email("Invalid email address"),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export const Security = () => {
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [emailChangeData, setEmailChangeData] = useState<{
    currentEmail: string;
    newEmail: string;
  } | null>(null);
  const [isVerifyingOldEmail, setIsVerifyingOldEmail] = useState(false);
  const [isVerifyingNewEmail, setIsVerifyingNewEmail] = useState(false);

  // Fetch profile data
  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch,
  } = useGetMyProfile();

  // Mutations
  const changePasswordMutation = useChangePasswordMutation();
  const requestEmailChangeMutation = useRequestEmailChangeMutation();
  const verifyOldEmailMutation = useVerifyOldEmailMutation();
  const verifyNewEmailMutation = useVerifyNewEmailMutation();

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      currentEmail: "",
      newEmail: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Set current email from profile data
  useEffect(() => {
    if (profileData?.email) {
      emailForm.setValue("currentEmail", profileData.email);
    }
  }, [profileData, emailForm]);

  const onEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
    try {
      // Store email change data for later use
      setEmailChangeData(values);

      // Request email change (this will trigger OTP to be sent to old email)
      await requestEmailChangeMutation.mutateAsync({
        newEmail: values.newEmail,
      });

      // Open OTP dialog for verification
      setIsOtpDialogOpen(true);
      toast.info("Please check your current email for the verification code");
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      toast.error(
        err?.response?.data?.message || "Failed to request email change",
      );
    }
  };

  const handleOtpSubmit = async () => {
    if (!emailChangeData) return;

    if (!isVerifyingOldEmail && !isVerifyingNewEmail) {
      // First step: Verify OTP for old email
      setIsVerifyingOldEmail(true);
      setOtpError(null);

      try {
        await verifyOldEmailMutation.mutateAsync({
          otp: otpValue,
        });

        // Clear OTP for next step
        setOtpValue("");
        // Move to next step - this should happen after mutation is complete
        setIsVerifyingOldEmail(false);
        setIsVerifyingNewEmail(true);

        toast.success(
          "Old email verified successfully. Please check your new email for verification code.",
        );
      } catch (error: unknown) {
        const err = error as ErrorResponse;
        const errorMessage = err.response?.data?.message || "Invalid OTP";
        setOtpError(errorMessage);
        setIsVerifyingOldEmail(false);
        toast.error(errorMessage);
      }
    } else if (isVerifyingNewEmail) {
      // Second step: Verify OTP for new email
      try {
        await verifyNewEmailMutation.mutateAsync({
          otp: otpValue,
        });

        // Success - email changed
        toast.success("Email changed successfully!");

        // Close dialog and reset state
        setIsOtpDialogOpen(false);
        setOtpValue("");
        setOtpError(null);
        setIsVerifyingNewEmail(false);
        setEmailChangeData(null);

        // Update form with new email
        emailForm.setValue("currentEmail", emailChangeData.newEmail);
        emailForm.setValue("newEmail", "");
      } catch (error: unknown) {
        const err = error as ErrorResponse;
        const errorMessage = err.response?.data?.message || "Invalid OTP";
        setOtpError(errorMessage);
        setIsVerifyingNewEmail(false);
        toast.error(errorMessage);
      }
    }
  };

  // Update the button to use mutation pending states
  <Button
    type="button"
    className="bg-primary text-white"
    onClick={handleOtpSubmit}
    disabled={
      otpValue.length !== 6 ||
      verifyOldEmailMutation.isPending ||
      verifyNewEmailMutation.isPending
    }
  >
    {verifyOldEmailMutation.isPending || verifyNewEmailMutation.isPending ? (
      <>
        <Loader2 size={16} className="mr-2 animate-spin" />
        Verifying...
      </>
    ) : (
      "Verify"
    )}
  </Button>;
  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      await changePasswordMutation.mutateAsync({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      toast.success("Password changed successfully!");

      // Reset password form
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      toast.error(err?.response?.data?.message || "Failed to change password");
    }
  };

  const isEmailFormValid =
    emailForm.formState.isValid &&
    emailForm.watch("newEmail") &&
    emailForm.watch("newEmail") !== emailForm.watch("currentEmail");

  const isPasswordFormValid =
    passwordForm.formState.isValid &&
    passwordForm.watch("currentPassword") &&
    passwordForm.watch("newPassword") &&
    passwordForm.watch("confirmPassword");

  // Get dialog title based on verification step
  const getDialogTitle = () => {
    if (isVerifyingOldEmail) return "Verify Current Email";
    if (isVerifyingNewEmail) return "Verify New Email";
    return "Email Verification";
  };

  // Get dialog description based on verification step
  const getDialogDescription = () => {
    if (isVerifyingOldEmail) {
      return `Please enter the 6-digit code sent to ${emailChangeData?.currentEmail}`;
    }
    if (isVerifyingNewEmail) {
      return `Please enter the 6-digit code sent to ${emailChangeData?.newEmail}`;
    }
    return "Please enter the verification code";
  };

  if (isProfileLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-100">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-500">Loading security settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Security Settings
      </h2>

      <div className="space-y-8">
        {/* Change Email Address */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Change Email Address
          </h3>

          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="space-y-4"
            >
              <FormField
                control={emailForm.control}
                name="currentEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="current@example.com"
                          className="pl-10"
                          {...field}
                          disabled
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={emailForm.control}
                name="newEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="new@example.com"
                          className="pl-10"
                          {...field}
                          disabled={
                            requestEmailChangeMutation.isPending ||
                            verifyOldEmailMutation.isPending ||
                            verifyNewEmailMutation.isPending
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary text-white"
                  disabled={
                    !isEmailFormValid ||
                    requestEmailChangeMutation.isPending ||
                    verifyOldEmailMutation.isPending ||
                    verifyNewEmailMutation.isPending
                  }
                >
                  {requestEmailChangeMutation.isPending ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Requesting...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Update Email
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-300"></div>

        {/* Change Password */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Change Password
          </h3>

          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="Enter current password"
                          className="pl-10"
                          {...field}
                          disabled={changePasswordMutation.isPending}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          className="pl-10"
                          {...field}
                          disabled={changePasswordMutation.isPending}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          className="pl-10"
                          {...field}
                          disabled={changePasswordMutation.isPending}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary text-white"
                  disabled={
                    !isPasswordFormValid || changePasswordMutation.isPending
                  }
                >
                  {changePasswordMutation.isPending ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* OTP Verification Dialog */}
      <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
            <DialogDescription>{getDialogDescription()}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                  value={otpValue}
  onChange={(value) => {
    setOtpValue(value.replace(/\D/g, ""));
    setOtpError(null);
  }}
  disabled={
    verifyOldEmailMutation.isPending || 
    verifyNewEmailMutation.isPending
  }
              >
                <InputOTPGroup className="space-x-2.5 [&>div]:rounded-lg [&>div]:border-2 [&>div]:border-black/30">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {otpError && (
              <p className="text-sm text-red-500 text-center">{otpError}</p>
            )}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOtpDialogOpen(false);
                  setOtpValue("");
                  setOtpError(null);
                  setIsVerifyingOldEmail(false);
                  setIsVerifyingNewEmail(false);
                  setEmailChangeData(null);
                }}
                disabled={isVerifyingOldEmail || isVerifyingNewEmail}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-primary text-white"
                onClick={handleOtpSubmit}
                disabled={
                  otpValue.length !== 6 ||
                  verifyOldEmailMutation.isPending ||
                  verifyNewEmailMutation.isPending
                }
              >
                {verifyOldEmailMutation.isPending ||
                verifyNewEmailMutation.isPending ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
