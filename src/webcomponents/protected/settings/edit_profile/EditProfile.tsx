"use client";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Camera, Save, Loader2 } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UpdateProfileDto } from "@/types/account.type";
import { useGetMyProfile, useUpdateProfileMutation } from "@/api/account/query";

const profileSchema = z.object({
  dateOfBirth: z.date().optional(),
  location: z.string().min(2, "Location is required"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must not exceed 500 characters"),
});

export const EditProfile = () => {
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [originalProfileImage, setOriginalProfileImage] = useState<string | null>(null);
  const [bioLength, setBioLength] = useState(0);

  // Fetch profile data
  const { data: profileData, isLoading: isProfileLoading } = useGetMyProfile();
  
  // Update profile mutation
  const updateProfileMutation = useUpdateProfileMutation();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      dateOfBirth: undefined,
      location: "",
      firstName: "",
      lastName: "",
      bio: "",
    },
  });

  // Set form values when profile data is loaded
  useEffect(() => {
    if (profileData) {
      form.reset({
        dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined,
        location: profileData.location || "",
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        bio: profileData.bio || "",
      });
      setBioLength(profileData.bio?.length || 0);
      
      // Set original and preview profile image if exists
      if (profileData.profilePictureUrl) {
        setOriginalProfileImage(profileData.profilePictureUrl);
        setProfileImagePreview(profileData.profilePictureUrl);
      }
    }
  }, [profileData, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 5 * 1024 * 1024) {
        setProfileImageFile(file);
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setProfileImagePreview(previewUrl);
      } else {
        alert("File size must be less than 5MB");
      }
    }
  };

  // Cleanup preview URL when component unmounts or when image changes
  useEffect(() => {
    return () => {
      if (profileImagePreview && profileImagePreview !== originalProfileImage) {
        URL.revokeObjectURL(profileImagePreview);
      }
    };
  }, [profileImagePreview, originalProfileImage]);

  const getInitials = () => {
    const firstName = form.watch("firstName") || profileData?.firstName || "J";
    const lastName = form.watch("lastName") || profileData?.lastName || "D";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Check if profile image has changed
  const hasImageChanged = () => {
    return profileImageFile !== null;
  };

  // Check if any field has changed
  const hasFormChanged = () => {
    const currentValues = form.getValues();
    const originalValues = {
      dateOfBirth: profileData?.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined,
      location: profileData?.location || "",
      firstName: profileData?.firstName || "",
      lastName: profileData?.lastName || "",
      bio: profileData?.bio || "",
    };

    // Compare dates
    const dateChanged = 
      (currentValues.dateOfBirth?.toISOString() || null) !== 
      (originalValues.dateOfBirth?.toISOString() || null);

    return (
      dateChanged ||
      currentValues.location !== originalValues.location ||
      currentValues.firstName !== originalValues.firstName ||
      currentValues.lastName !== originalValues.lastName ||
      currentValues.bio !== originalValues.bio
    );
  };

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    // Only include changed fields in payload
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
    
    const dateChanged = 
      values.dateOfBirth?.toISOString() !== profileData?.dateOfBirth;
    if (dateChanged) {
      payload.dateOfBirth = values.dateOfBirth?.toISOString();
    }

    // Only make API call if something changed
    if (Object.keys(payload).length === 0 && !hasImageChanged()) {
      alert("No changes to save");
      return;
    }

    updateProfileMutation.mutate(
      {
        payload,
        image: hasImageChanged() ? profileImageFile : undefined,
      },
      {
        onSuccess: (data) => {
          console.log("Profile updated successfully", data);
          // Update original image reference after successful update
          if (data.avatar) {
            setOriginalProfileImage(data.avatar);
            setProfileImageFile(null);
          }
        },
      }
    );
  };

  if (isProfileLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-100">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Edit Profile
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Profile Picture
            </label>
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {profileImagePreview ? (
                    <Image
                      src={profileImagePreview}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-gray-600">
                      {getInitials()}
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-upload"
                  disabled={updateProfileMutation.isPending}
                />
                <label
                  htmlFor="profile-upload"
                  className={cn(
                    "absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer transition-colors",
                    updateProfileMutation.isPending
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary/90",
                  )}
                >
                  <Camera size={20} />
                </label>
              </div>

              {/* Upload Info */}
              <div>
                <p className="text-gray-900 font-medium">
                  Upload a new profile picture
                </p>
                <p className="text-sm text-gray-500">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
                {hasImageChanged() && (
                  <p className="text-sm text-green-600 mt-1">
                    ✓ New image selected
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location and Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter location" 
                      {...field} 
                      disabled={updateProfileMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={updateProfileMutation.isPending}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter first name" 
                      {...field} 
                      disabled={updateProfileMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter last name" 
                      {...field} 
                      disabled={updateProfileMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    className="min-h-32"
                    {...field}
                    disabled={updateProfileMutation.isPending}
                    onChange={(e) => {
                      field.onChange(e);
                      setBioLength(e.target.value.length);
                    }}
                  />
                </FormControl>
                <div className="text-sm text-gray-500 text-right">
                  {bioLength}/500
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error message if mutation fails */}
          {updateProfileMutation.isError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                {updateProfileMutation.error?.message || "Failed to update profile. Please try again."}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-primary text-white"
              disabled={updateProfileMutation.isPending || (!hasFormChanged() && !hasImageChanged())}
            >
              {updateProfileMutation.isPending ? (
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
      </Form>
    </div>
  );
};