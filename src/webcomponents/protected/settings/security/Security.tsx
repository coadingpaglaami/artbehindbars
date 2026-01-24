"use client";

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
import { Save } from "lucide-react";

const emailSchema = z.object({
  currentEmail: z.string().email("Invalid email address"),
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

export const Security = () => {
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

  const onEmailSubmit = (values: z.infer<typeof emailSchema>) => {
    console.log("Email change:", values);
  };

  const onPasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
    console.log("Password change:", values);
  };

  const isEmailFormValid =
    emailForm.formState.isValid &&
    emailForm.watch("currentEmail") &&
    emailForm.watch("newEmail");

  const isPasswordFormValid =
    passwordForm.formState.isValid &&
    passwordForm.watch("currentPassword") &&
    passwordForm.watch("newPassword") &&
    passwordForm.watch("confirmPassword");

  return (
    <div className=" p-6">
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
                      <Input
                        type="email"
                        placeholder="current@example.com"
                        {...field}
                      />
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
                      <Input
                        type="email"
                        placeholder="new@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary text-white"
                  disabled={!isEmailFormValid}
                >
                  <Save size={18} className="mr-2" />
                  Update Email
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
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary text-white"
                  disabled={!isPasswordFormValid}
                >
                  <Save size={18} className="mr-2" />
                  Update Password
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
