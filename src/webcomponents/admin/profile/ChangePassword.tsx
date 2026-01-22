"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ChangePassword = () => {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof changePasswordSchema>) => {
    console.log(values);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Change Password
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Update your password to keep your account secure
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            {...form.register("currentPassword")}
            className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
            placeholder="Enter current password"
          />
          {form.formState.errors.currentPassword && (
            <span className="text-sm text-red-600">
              {form.formState.errors.currentPassword.message}
            </span>
          )}
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            {...form.register("newPassword")}
            className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
            placeholder="Enter new password"
          />
          {form.formState.errors.newPassword && (
            <span className="text-sm text-red-600">
              {form.formState.errors.newPassword.message}
            </span>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            {...form.register("confirmPassword")}
            className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
            placeholder="Confirm new password"
          />
          {form.formState.errors.confirmPassword && (
            <span className="text-sm text-red-600">
              {form.formState.errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="bg-primary text-white">
            <Key size={18} className="mr-2" />
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
};