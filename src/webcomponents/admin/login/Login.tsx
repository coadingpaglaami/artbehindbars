"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { setTokens } from "@/lib/cookies";
import { useSigninMutation } from "@/api/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().default(false).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { mutate: signinMutate, isPending } = useSigninMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "admin@artbehindbar.com",
      password: "",
      rememberMe: false,
    },
  });

  const isLoading = form.formState.isSubmitting || isPending;
  const isValid = form.formState.isValid;

  function onSubmit(values: FormValues) {
    setError(null);

    signinMutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (response) => {
          const { accessToken, refreshToken, user } = response;

          // Check if user is admin
          if (user.role !== "ADMIN") {
            setError("Access denied. Admin privileges required.");
            return;
          }

          // Store tokens in cookies
          setTokens(accessToken, refreshToken);

          // Handle remember me (tokens are already set, extend expiry if needed)
          if (values.rememberMe) {
            // You can implement extended token expiry here if needed
            // Or handle on backend
          }

          // Navigate to admin dashboard
          router.push("/admin/overview");
        },
        onError: (error) => {
          setError(error.message || "Invalid email or password");
        },
      }
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/40 px-4">
      <div className="w-full max-w-md">
        {/* Header with gradient + logo */}
        <div
          className="rounded-t-xl p-10 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #C5A882 0%, #C8A980 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.4)_0%,transparent_50%)]" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="relative w-20 h-20">
              <Image
                src="/navbar/logo.svg"
                alt="Infinity Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-white tracking-tight">
                Admin Login
              </h1>
              <p className="text-white/80 text-sm">
                Sign in to manage your platform
              </p>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-b-xl shadow-lg border border-t-0 border-gray-200 p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@artbehindbar.com"
                        type="email"
                        autoComplete="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium leading-none cursor-pointer">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium hover:bg-[#B8976E]"
                disabled={!isValid || isLoading}
                style={{
                  backgroundColor: "#C5A882",
                }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};