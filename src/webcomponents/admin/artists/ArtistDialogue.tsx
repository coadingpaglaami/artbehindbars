"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarIcon, Upload, X } from "lucide-react";
import { useCreateArtist } from "@/api/gallary";
import { ArtistResponseDto } from "@/types/gallery.types";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const artistSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  inmateId: z.string().min(3, "Inmate ID is required"),
  state: z.string().min(2, "State is required"),
  facilityName: z.string().min(3, "Facility name is required"),
  minReleaseDate: z.date({error: 'Min release date is required' }),
  maxReleaseDate: z.date({error: 'Max release date is required' }),
  lifeSentence: z.string().min(2, "Life sentence information is required"),
  image: z.instanceof(File).optional().nullable(),
});

type FormValues = z.infer<typeof artistSchema>;

interface ArtistDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  artist?: ArtistResponseDto | null;
  mode: "add" | "edit";
  onSuccess?: () => void;
}

export const ArtistDialogue = ({
  isOpen,
  onClose,
  artist,
  mode,
  onSuccess,
}: ArtistDialogueProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { mutate: createArtistMutate, isPending } = useCreateArtist();

  const form = useForm({
    resolver: zodResolver(artistSchema),
    defaultValues: {
      fullName: "",
      inmateId: "",
      state: "",
      facilityName: "",
      minReleaseDate: undefined,
      maxReleaseDate: undefined,
      lifeSentence: "",
      image: null,
    },
  });

  useEffect(() => {
    if (artist && mode === "edit") {
      form.reset({
        fullName: artist.name,
        inmateId: artist.inmateId,
        state: artist.state,
        facilityName: artist.facilityName,
        minReleaseDate: artist.minReleaseDate
          ? new Date(artist.minReleaseDate)
          : undefined,
        maxReleaseDate: artist.maxReleaseDate
          ? new Date(artist.maxReleaseDate)
          : undefined,
        lifeSentence: artist.lifeSentence,
        image: null,
      });
      // If artist has image URL, set preview
      // setImagePreview(artist.imageUrl);
    } else {
      form.reset({
        fullName: "",
        inmateId: "",
        state: "",
        facilityName: "",
        minReleaseDate: undefined,
        maxReleaseDate: undefined,
        lifeSentence: "",
        image: null,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImagePreview(null);
    }
    setError(null);
  }, [artist, mode, form, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      form.setValue("image", file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const removeImage = () => {
    form.setValue("image", null);
    setImagePreview(null);
  };

  const onSubmit = (values: FormValues) => {
    setError(null);

    if (mode === "add") {
      // Validate image for add mode
      if (!values.image) {
        setError("Artist image is required");
        return;
      }

      const payload = {
        name: values.fullName,
        inmateId: values.inmateId,
        state: values.state,
        facilityName: values.facilityName,
    minReleaseDate: values.minReleaseDate.toISOString(),
maxReleaseDate: values.maxReleaseDate.toISOString(),
        lifeSentence: values.lifeSentence,
      };

      createArtistMutate(
        {
          payload,
          image: values.image,
        },
        {
          onSuccess: () => {
            form.reset();
            setImagePreview(null);
            onClose();
            onSuccess?.();
          },
          onError: (error) => {
            setError(error.message || "Failed to create artist");
          },
        },
      );
    } else {
      // Edit mode - API will be implemented later
      console.log("Updating artist:", values);
      onClose();
    }
  };

  const handleClose = () => {
    form.reset();
    setImagePreview(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-semibold">
            {mode === "add" ? "Add New Artist" : "Edit Artist Profile"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            {/* Image Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({}) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Artist Image *</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4">
                      {imagePreview ? (
                        <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                          <Image
                            src={imagePreview}
                            alt="Artist preview"
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
                        >
                          <Upload className="w-12 h-12 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 mb-1">
                            Click to upload artist image
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG (MAX. 5MB)
                          </p>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Inmate ID and State */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="inmateId"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Inmate ID *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter inmate ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>State *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Facility Name */}
            <FormField
              control={form.control}
              name="facilityName"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Facility Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter facility name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Min Release Date and Max Release Date */}
            <div className="grid grid-cols-2 gap-4">
              {/* Min Release Date */}
              <FormField
                control={form.control}
                name="minReleaseDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Min Release Date *</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? format(new Date(field.value), "yyyy MM dd")
                              : "Pick year"}

                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                       <Calendar
  mode="single"
  captionLayout="dropdown"
  startMonth={new Date(1900, 0)}
  endMonth={new Date(2100, 0)}
  selected={field.value ? new Date(field.value) : undefined}
onSelect={(date) =>
    field.onChange(date ? new Date(date.getFullYear(), 0, 1) : null)
  }
/>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Max Release Date */}
              <FormField
                control={form.control}
                name="maxReleaseDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Max Release Date *</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? format(new Date(field.value), "yyyy MM dd")
                              : "Pick year"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          startMonth={new Date(1900, 0)}
                          endMonth={new Date(2100, 0)} // ← allows future years
                          selected={
                            field.value
                              ? new Date(Number(field.value), 0)
                              : undefined
                          }
                       onSelect={(date) =>
    field.onChange(date ? new Date(date.getFullYear(), 0, 1) : null)
  }
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Life Sentence */}
            {/* Life Sentence */}
            <FormField
              control={form.control}
              name="lifeSentence"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Life Sentence</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter life sentence details"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-white"
                disabled={isPending}
              >
                {isPending
                  ? mode === "add"
                    ? "Creating..."
                    : "Updating..."
                  : mode === "add"
                    ? "Create Profile"
                    : "Update Profile"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
