"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { AccountProfile, UpdateProfileDto } from "@/types/account.type";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Invalid email address"),
  location: z.string().optional(),
  dateOfBirth: z.string().optional(),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
});

interface PersonalInfoProps {
  profileData?: AccountProfile;
  onUpdateProfile: (data: { payload: UpdateProfileDto; image?: File | null | undefined }) => void;
  isUpdating?: boolean;
}

export const PersonalInfo = ({ 
  profileData, 
  onUpdateProfile, 
  isUpdating = false 
}: PersonalInfoProps) => {
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      location: "",
      dateOfBirth: "",
      bio: "",
    },
  });

  // Set form values when profile data is loaded
  useEffect(() => {
    if (profileData) {
      form.reset({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        email: profileData.email || "",
        location: profileData.location || "",
        dateOfBirth: profileData.dateOfBirth 
          ? new Date(profileData.dateOfBirth).toISOString().split('T')[0]
          : "",
        bio: profileData.bio || "",
      });
    }
  }, [profileData, form]);

  const onSubmit = async (values: z.infer<typeof personalInfoSchema>) => {
    // Only include changed fields
    const payload: UpdateProfileDto = {};
    
    if (values.firstName !== profileData?.firstName) {
      payload.firstName = values.firstName;
    }
    if (values.lastName !== profileData?.lastName) {
      payload.lastName = values.lastName;
    }
    if (values.bio !== profileData?.bio) {
      payload.bio = values.bio;
    }
    if (values.location !== profileData?.location) {
      payload.location = values.location;
    }
    
    const dateChanged = values.dateOfBirth !== profileData?.dateOfBirth?.split('T')[0];
    if (dateChanged) {
      payload.dateOfBirth = values.dateOfBirth ? new Date(values.dateOfBirth).toISOString() : undefined;
    }

    // Check if anything changed
    if (Object.keys(payload).length === 0) {
      toast.info("No changes to save");
      return;
    }

     onUpdateProfile({ payload });
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
              className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors w-full"
              placeholder="Enter first name"
              disabled={isUpdating}
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
              className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors w-full"
              placeholder="Enter last name"
              disabled={isUpdating}
            />
            {form.formState.errors.lastName && (
              <span className="text-sm text-red-600">
                {form.formState.errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        {/* Email (Read Only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...form.register("email")}
              className="px-0 py-2 border-0 border-b border-gray-300 bg-gray-50 cursor-not-allowed w-full"
              placeholder="Enter email address"
              disabled
            />
            {form.formState.errors.email && (
              <span className="text-sm text-red-600">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>

          {/* Location (replaces phone) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              {...form.register("location")}
              className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors w-full"
              placeholder="City, State, Country"
              disabled={isUpdating}
            />
          </div>
        </div>

        {/* Date of Birth (replaces job title and department) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              {...form.register("dateOfBirth")}
              className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition-colors w-full"
              disabled={isUpdating}
            />
          </div>
          <div className="md:block hidden"></div> {/* Empty div for grid alignment */}
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Bio</label>
          <textarea
            {...form.register("bio")}
            className="px-0 py-2 border-0 border-b border-gray-300 focus:border-blue-600 focus:ring-0 outline-none resize-none transition-colors min-h-24 w-full"
            placeholder="Brief description for your profile"
            disabled={isUpdating}
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
          <Button 
            type="submit" 
            className="bg-primary text-white"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};