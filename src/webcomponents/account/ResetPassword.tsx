"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "../reusable";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/api/auth";
import { clearVerificationData, getVerificationEmail } from "@/lib/cookies";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { passwordSchema } from "@/schema/passwordSchema";

// ──────────────────────────────────────────────
// Zod Schema
// ──────────────────────────────────────────────
const formSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

// ──────────────────────────────────────────────
// Props (for API integration)
// ──────────────────────────────────────────────

export const ResetPasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { mutate: resetPasswordMutate, isPending: isResetting } =
    useResetPasswordMutation();
  const { push } = useRouter();
  const [email, setEmail] = useState<string | undefined>();

  useEffect(() => {
    const storedEmail = getVerificationEmail();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(storedEmail);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const isFormValid = form.formState.isValid && !isResetting;

  async function handleSubmit(values: FormValues) {
    resetPasswordMutate(
      {
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
        email: email as string, // or get from context/state

        // token, // pass to API if needed
      },
      {
        onSuccess: () => {
          toast.success("Password reset successfully!");
          clearVerificationData();
          push("/success");
        },
        onError: (error) => {
          const message = getErrorMessage(error);
          setServerError(
            message || "Failed to reset password. Please try again.",
          );
        },
      },
    );
  }

  return (
    <div className="flex items-center justify-center bg-background px-4">
      <Card className="w-full min-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Enter new password
          </CardTitle>
          <CardDescription>
            Choose a strong password for your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter new password"
                        {...field}
                        disabled={isResetting}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Min 8 characters • 1 uppercase • 1 number • 1 special char
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirm password"
                        {...field}
                        disabled={isResetting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Server error */}
              {serverError && (
                <div className="rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
                  {serverError}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={!isFormValid || isResetting}
              >
                {isResetting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isResetting ? "Updating..." : "Confirm password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
