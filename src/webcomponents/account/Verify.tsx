"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

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
import {
  getVerificationEmail,
  getOtpType,
  clearVerificationData,
} from "@/lib/cookies";
import { useSignupEmailVerifyMutation } from "@/api/auth/query";

const formSchema = z.object({
  otp: z.string().length(6, { message: "Please enter a 6-digit code" }),
});

type FormValues = z.infer<typeof formSchema>;

interface OtpVerificationProps {
  initialCountdown?: number;
}

export const Verify = ({ initialCountdown = 60 }: OtpVerificationProps) => {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(initialCountdown);
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [otpType, setOtpTypeState] = useState<"signup" | "resetPassword" | null>(
    null
  );

  const { mutate: verifyMutate, isPending: isVerifying } =
    useSignupEmailVerifyMutation();

  // Load email and otpType from cookies
  useEffect(() => {
    const storedEmail = getVerificationEmail();
    const storedOtpType = getOtpType();

    if (!storedEmail || !storedOtpType) {
      router.push("/login");
      return;
    }

    setEmail(storedEmail);
    setOtpTypeState(storedOtpType);
  }, [router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  });

  const otpValue = form.watch("otp");

  // Countdown Timer
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

  // Submit Handler
  async function onSubmit(values: FormValues) {
    if (!email || !otpType) return;

    verifyMutate(
      {
        email,
        otp: values.otp,
        otpType,
      },
      {
        onSuccess: (response) => {
          clearVerificationData();

          if (otpType === "resetPassword") {
            router.push("/reset-password");
          } else {
            router.push("/success");
          }
        },
        onError: (error) => {
          setError(error.message || "Invalid verification code");
        },
      }
    );
  }

  // Resend Handler
  async function handleResend() {
    if (!canResend || !email) return;

    setCanResend(false);
    setCountdown(initialCountdown);
    setError(null);

    // Call resend API here
    // Example: await resendOtp(email, otpType);
  }

  const isSubmitDisabled = otpValue.length !== 6 || isVerifying;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Verify Identity</CardTitle>
          <p className="text-sm text-muted-foreground">
            Please input the verification code sent to your email
          </p>
          {email && <p className="font-medium text-foreground">{email}</p>}
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value.replace(/\D/g, ""));
                            setError(null);
                          }}
                        >
                          <InputOTPGroup className="space-x-2.5 [&>div]:rounded-lg [&>div]:border-2 [&>div]:border-black/30">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                              <InputOTPSlot key={i} index={i} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>

                    {error && (
                      <p className="text-center text-sm font-medium text-destructive">
                        {error}
                      </p>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitDisabled}
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </form>
          </Form>

          <Button
            variant="outline"
            onClick={handleResend}
            disabled={!canResend}
            className={cn("w-full", !canResend && "text-muted-foreground")}
          >
            {canResend ? "Resend code" : `Resend code in ${countdown}s`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};