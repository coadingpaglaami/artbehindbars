"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PasswordInput } from "../reusable";
import { setVerificationEmail, setOtpType } from "@/lib/cookies";
import { useSignupMutation } from "@/api/auth/query";
import Link from "next/link";
import { getErrorMessage } from "@/lib/utils";
import { passwordSchema } from "@/schema/passwordSchema";

// Helper function to calculate age
const calculateAge = (birthDate: string): number | null => {
  if (!birthDate) return null;

  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // Adjust age if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

// Updated schema with age validation
const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: passwordSchema,
  dateOfBirth: z
    .string()
    .min(1, { message: "Date of birth is required" })
    .refine(
      (date) => {
        const age = calculateAge(date);
        return age !== null && age >= 16;
      },
      { message: "You must be at least 16 years old" },
    ),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export const Signup = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { mutate: signupMutate, isPending } = useSignupMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange", // Enable real-time validation
  });

  // Watch dateOfBirth for real-time age calculation
  const dateOfBirth = watch("dateOfBirth");
  const [isUnderAge, setIsUnderAge] = useState<boolean>(true);

  // Update underage status when date changes
  useEffect(() => {
    if (dateOfBirth) {
      const age = calculateAge(dateOfBirth);
      setIsUnderAge(age !== null ? age < 16 : true);
    } else {
      setIsUnderAge(true);
    }
  }, [dateOfBirth]);

  const onSubmit = (data: SignupFormValues) => {
    signupMutate(
      {
        ...data,
        role: "USER" as const,
      },
      {
        onSuccess: () => {
          setVerificationEmail(data.email);
          setOtpType("signup");
          router.push("/verify");
        },
        onError: (error) => {
          const message = getErrorMessage(error);
          setError(message || "Signup failed");
        },
      },
    );
  };

  // Check if form is valid and user is not underage
  const isSubmitDisabled = isPending || !isValid || isUnderAge;

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
            placeholder="First Name"
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
            placeholder="Last Name"
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
            placeholder="Email"
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
            placeholder="Password"
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
            placeholder="Date of Birth"
            id="dateOfBirth"
            type="date"
            max={new Date().toISOString().split("T")[0]} // Prevent future dates
            {...register("dateOfBirth")}
            className={errors.dateOfBirth ? "border-red-500" : ""}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
          )}
          {/* Optional: Show age warning when date is selected but underage */}
          {dateOfBirth && !errors.dateOfBirth && isUnderAge && (
            <p className="text-sm text-yellow-600">
              You must be at least 16 years old to create an account
            </p>
          )}
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Button
          type="submit"
          className={`w-full ${!isSubmitDisabled ? "bg-[#c4a37a] hover:bg-[#b0906a]" : "bg-gray-400 cursor-not-allowed"}`}
          disabled={isSubmitDisabled}
        >
          {isPending ? "Creating account..." : "Sign up"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-gray-600">
        You already have an account?{" "}
        <Link href="/login" className="font-bold text-black">
          Login
        </Link>
      </p>
    </div>
  );
};
