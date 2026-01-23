"use client";

import { useState } from "react";
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

// ──────────────────────────────────────────────
// Zod Schema
// ──────────────────────────────────────────────
const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
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
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { push } = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const isFormValid = form.formState.isValid && !isLoading;

  async function handleSubmit(values: FormValues) {
    // setServerError(null);
    // setIsLoading(true);
    // try {
    //   const result = await onSubmit({
    //     newPassword: values.newPassword,
    //     // token, // pass to API if needed
    //   });
    //   if (!result.success) {
    //     setServerError(
    //       result.error || "Failed to reset password. Please try again.",
    //     );
    //   } else {
    //     // Success → redirect or show success message
    //     // e.g. router.push("/login?reset=success")
    //     // toast.success("Password reset successfully!")
    //   }
    // } catch (err) {
    //   setServerError("An unexpected error occurred. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
    push("/success");
    
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                disabled={!isFormValid || isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Updating..." : "Confirm password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
