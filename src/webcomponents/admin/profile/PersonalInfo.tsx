"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  department: z.string().min(2, "Department is required"),
  bio: z.string().max(500, "Bio must not exceed 500 characters"),
});

export const PersonalInfo = () => {
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
      department: "",
      bio: "",
    },
  });

  const onSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    console.log(values);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Update your personal details and information
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              {...form.register("firstName")}
              className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
              placeholder="Enter first name"
            />
            {form.formState.errors.firstName && (
              <span className="text-sm text-red-600">
                {form.formState.errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              {...form.register("lastName")}
              className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
              placeholder="Enter last name"
            />
            {form.formState.errors.lastName && (
              <span className="text-sm text-red-600">
                {form.formState.errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...form.register("email")}
              className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
              placeholder="Enter email address"
            />
            {form.formState.errors.email && (
              <span className="text-sm text-red-600">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              {...form.register("phone")}
              className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
              placeholder="Enter phone number"
            />
            {form.formState.errors.phone && (
              <span className="text-sm text-red-600">
                {form.formState.errors.phone.message}
              </span>
            )}
          </div>
        </div>

        {/* Job Title and Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              {...form.register("jobTitle")}
              className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
              placeholder="Enter job title"
            />
            {form.formState.errors.jobTitle && (
              <span className="text-sm text-red-600">
                {form.formState.errors.jobTitle.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              {...form.register("department")}
              className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
              placeholder="Enter department"
            />
            {form.formState.errors.department && (
              <span className="text-sm text-red-600">
                {form.formState.errors.department.message}
              </span>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Bio</label>
          <textarea
            {...form.register("bio")}
            className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none resize-none transition-colors min-h-24"
            placeholder="Brief description for your profile"
          />
          <p className="text-xs text-gray-500">
            Brief description for your profile
          </p>
          {form.formState.errors.bio && (
            <span className="text-sm text-red-600">
              {form.formState.errors.bio.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="bg-primary text-white">
            <Save size={18} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};