// ChangePassword.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Loader2 } from "lucide-react";
import { useChangePasswordMutation } from "@/api/account";
import { toast } from "sonner";
import { useState } from "react";
import { getErrorMessage } from "@/lib/utils";

const changePasswordSchema = z
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

export const ChangePassword = () => {
  const [showForm, setShowForm] = useState(false);
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePasswordMutation();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof changePasswordSchema>) => {
    changePassword(
      {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password changed successfully!");
          form.reset();
          setShowForm(false);
        },
        onError: (error: unknown) => {
          const message = getErrorMessage(error);
          toast.error(`Failed to change password: ${message}`);
        },
      },
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
        <p className="text-sm text-gray-500 mt-1">
          Update your password to keep your account secure
        </p>
      </div>

      {!showForm ? (
        <div className="flex justify-center">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white"
          >
            <Key size={18} className="mr-2" />
            Change Password
          </Button>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Current Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Current Password
            </label>
            <Input
              type="password"
              {...form.register("currentPassword")}
              placeholder="Enter current password"
              disabled={isChangingPassword}
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
            <Input
              type="password"
              {...form.register("newPassword")}
              placeholder="Enter new password"
              disabled={isChangingPassword}
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
            <Input
              type="password"
              {...form.register("confirmPassword")}
              placeholder="Confirm new password"
              disabled={isChangingPassword}
            />
            {form.formState.errors.confirmPassword && (
              <span className="text-sm text-red-600">
                {form.formState.errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowForm(false);
                form.reset();
              }}
              disabled={isChangingPassword}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-white"
              disabled={isChangingPassword}
            >
              {isChangingPassword ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Key size={18} className="mr-2" />
                  Update Password
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
