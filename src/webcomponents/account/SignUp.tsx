"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordInput } from "../reusable";
import { setVerificationEmail, setOtpType } from "@/lib/cookies";
import { useSignupMutation } from "@/api/auth/query";


const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export const Signup = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { mutate: signupMutate, isPending } = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormValues) => {
    signupMutate(
      {
        ...data,
        role: "USER" as const, // or get from form
      },
      {
        onSuccess: (response) => {
          // Save email and otpType to cookies
          setVerificationEmail(data.email);
          setOtpType("signup");
          
          router.push("/verify");
        },
        onError: (error) => {
          setError(error.message || "Signup failed");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">Create your account</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs space-y-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...register("dateOfBirth")}
            className={errors.dateOfBirth ? "border-red-500" : ""}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-[#c4a37a] hover:bg-[#b0906a]"
          disabled={isPending}
        >
          {isPending ? "Creating account..." : "Sign up"}
        </Button>
      </form>
    </div>
  );
};