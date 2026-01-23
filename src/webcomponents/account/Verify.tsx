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
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ──────────────────────────────────────────────
// Schema & Types
// ──────────────────────────────────────────────
const formSchema = z.object({
  otp: z.string().length(5, { message: "Please enter a 5-digit code" }),
});

type FormValues = z.infer<typeof formSchema>;

// ──────────────────────────────────────────────
// Props (for easy API integration)
// ──────────────────────────────────────────────
interface OtpVerificationProps {
  email?: string; // "johndoe@example.com"
  onVerify?: (otp: string) => Promise<{ success: boolean; error?: string }>;
  onResend?: () => Promise<{ success: boolean; error?: string }>;
  initialCountdown?: number; // default 60
}

export const Verify = ({
  email,
  initialCountdown = 60,
}: OtpVerificationProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(initialCountdown);
  const [canResend, setCanResend] = useState(false);
  const forgotPaswordFlow =
    localStorage.getItem("forgot-password-flow") === "true";
  console.log(forgotPaswordFlow);
  const { push } = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  });

  const otpValue = form.watch("otp");

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Handle form submit (verify OTP)
  async function onSubmit(values: FormValues) {
    // setError(null);
    // setIsVerifying(true);
    // try {
    //   const result = await onVerify(values.otp);
    //   if (!result.success) {
    //     setError(result.error || "Invalid Code!");
    //     form.setError("otp", { message: " " }); // just to trigger red border
    //   } else {
    //     // Success → redirect or show success toast
    //     // toast.success("Verification successful!");
    //   }
    // } catch (err) {
    //   setError("Something went wrong. Please try again.");
    // } finally {
    //   setIsVerifying(false);
    // }
    if (forgotPaswordFlow) {
      push("/reset-password");
    } else {
      push("/success");
    }
  }

  // Handle resend
  async function handleResend() {
    // if (!canResend) return;
    // setCanResend(false);
    // setCountdown(initialCountdown);
    // setError(null);
    // try {
    //   const result = await onResend();
    //   if (!result.success) {
    //     setError(result.error || "Failed to resend code.");
    //   } else {
    //     // toast.success("New code sent!");
    //   }
    // } catch {
    //   setError("Failed to resend. Try again later.");
    // }
  }

  const isSubmitDisabled = otpValue.length !== 5 || isVerifying;

  return (
    <div className="flex items-center justify-center bg-background p-4">
      <Card className="w-full min-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Verify Identity</CardTitle>
          <p className="text-sm text-muted-foreground">
            Please input the verification code sent to your email
          </p>
          <p className="font-medium text-foreground">{email}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={5}
                          value={field.value}
                          onChange={(value) => {
                            const digitsOnly = value.replace(/\D/g, "");
                            field.onChange(digitsOnly);
                            setError(null);
                          }}
                        >
                          <InputOTPGroup className="space-x-2.5 [&>div]:rounded-lg [&>div]:border-2 [&>div]:border-black/30">
                            {[0, 1, 2, 3, 4].map((i) => (
                              <InputOTPSlot key={i} index={i} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <div className="text-center text-sm font-medium text-destructive">
                      {error && <p>{error}</p>}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitDisabled}
                // loading={isVerifying} // you can add loading prop if using custom button
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </form>
          </Form>

          {/* Resend Section */}
          <div className="text-center">
            <Button
              onClick={handleResend}
              disabled={!canResend}
              className={cn(
                "-mt-2.5 w-full",
                !canResend && "text-muted-foreground",
              )}
            >
              {canResend ? "Resend code" : `Resend code in ${countdown}s`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
