"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Check, X } from "lucide-react";
import Image from "next/image";
import {
  useUploadArtwork,
  useUpdateArtworkMutation,
  useGetArtists,
} from "@/api/gallary";
import { ArtworkResponseDto, Category } from "@/types/gallery.types";
import { toast } from "sonner";

const artworkSchema = z.object({
  image: z.instanceof(File).optional().nullable(),
  artistId: z.string().optional(),
  artworkTitle: z.string().min(2, "Title is required"),
  category: z.enum(["Religious", "Non_Religious"]),
  buyNowPrice: z.number().min(1, "Buy now price must be at least 1"),
  startingAuctionPrice: z
    .number()
    .min(1, "Starting auction price is required")
    .optional(),
  isAnonymous: z.boolean().optional(),
});

type FormValues = z.infer<typeof artworkSchema>;

interface ArtWorkDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  artwork?: ArtworkResponseDto | null;
  mode: "add" | "edit";
  allArtists?: string[];
  onSuccess?: () => void;
}

export const ArtWorkDialogue = ({
  isOpen,
  onClose,
  artwork,
  mode,
  onSuccess,
}: ArtWorkDialogueProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [hasNewImage, setHasNewImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch artists with object destructuring
  const { data: artistsData } = useGetArtists({ page: 1, limit: 10 });

  // Mutations with object destructuring
  const { mutate: uploadArtwork, isPending: isUploading } = useUploadArtwork();
  const { mutate: updateArtwork, isPending: isUpdating } =
    useUpdateArtworkMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(artworkSchema),
    defaultValues: {
      image: null,
      artistId: "",
      artworkTitle: "",
      category: "Religious",
      buyNowPrice: 0,
      startingAuctionPrice: 0,
      isAnonymous: false,
    },
  });

  const isAnonymous = form.watch("isAnonymous");

  useEffect(() => {
    if (artwork && mode === "edit") {
      form.reset({
        image: null,
        artistId: artwork.artist?.name || "",
        artworkTitle: artwork.title,
        category: artwork.category as Category,
        buyNowPrice: artwork.buyItNowPrice,
        startingAuctionPrice: artwork.startingBidPrice,
        isAnonymous: artwork.isAnonymous,
      });

      if (artwork.imageUrl) {
        setExistingImageUrl(artwork.imageUrl);
        setImagePreview(artwork.imageUrl);
      }
      setHasNewImage(false);
    } else {
      form.reset({
        image: null,
        artistId: "",
        artworkTitle: "",
        category: "Religious",
        buyNowPrice: 0,
        startingAuctionPrice: 0,
        isAnonymous: false,
      });
      setImagePreview(null);
      setExistingImageUrl(null);
      setHasNewImage(false);
    }
    setCurrentStep(1);
    setError(null);
  }, [artwork, mode, form, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size must be less than 10MB");
        return;
      }

      form.setValue("image", file);
      setHasNewImage(true);

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
    setHasNewImage(false);

    // If in edit mode, restore existing image
    if (mode === "edit" && existingImageUrl) {
      setImagePreview(existingImageUrl);
    }
  };

  const onSubmit = (values: FormValues) => {
    setError(null);

    if (mode === "add") {
      // Validate image for add mode
      if (!values.image) {
        setError("Artwork image is required");
        return;
      }

      // Validate artist selection if not anonymous
      if (!Boolean(values.isAnonymous) && !values.artistId) {
        setError("Please select an artist or post anonymously");
        return;
      }

      // Find artist ID from name
      const selectedArtist = artistsData?.data.find(
        (artist) => artist.name === values.artistId,
      );

      const payload = {
        artistId: Boolean(values.isAnonymous) ? "" : selectedArtist?.id || "",
        title: values.artworkTitle,
        isAnonymous: Boolean(values.isAnonymous),
        category: values.category,
        startingBidPrice: values.startingAuctionPrice || 0,
        buyItNowPrice: Number(values.buyNowPrice) || 0,
      };

      uploadArtwork(
        {
          payload,
          image: values.image,
        },
        {
          onSuccess: () => {
            form.reset();
            setImagePreview(null);
            setExistingImageUrl(null);
            setHasNewImage(false);
            toast.success("Artwork uploaded successfully");
            onClose();
            onSuccess?.();
          },
          onError: (error) => {
            setError(error.message || "Failed to upload artwork");
          },
        },
      );
    } else {
      // Edit mode
      if (!artwork?.id) {
        setError("Artwork ID is missing");
        return;
      }

      // Find artist ID from name
      const selectedArtist = artistsData?.data.find(
        (artist) => artist.name === values.artistId,
      );

      const payload = {
        artistId: Boolean(values.isAnonymous) ? "" : selectedArtist?.id || "",
        title: values.artworkTitle,
        isAnonymous: Boolean(values.isAnonymous),
        category: values.category,
        startingBidPrice: values.startingAuctionPrice || 0,
        buyItNowPrice: values.buyNowPrice || 0,
      };

      updateArtwork(
        {
          id: artwork.id,
          artwork: payload,
          artworkImage: hasNewImage ? values.image || undefined : undefined,
        },
        {
          onSuccess: () => {
            form.reset();
            setImagePreview(null);
            setExistingImageUrl(null);
            setHasNewImage(false);
            toast.success("Artwork updated successfully");
            onClose();
            onSuccess?.();
          },
          onError: (error) => {
            setError(error.message || "Failed to update artwork");
          },
        },
      );
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleClose = () => {
    form.reset();
    setImagePreview(null);
    setExistingImageUrl(null);
    setHasNewImage(false);
    setCurrentStep(1);
    setError(null);
    onClose();
  };

  const isPending = isUploading || isUpdating;

  const steps = [
    { number: 1, label: "Image" },
    { number: 2, label: "Artist" },
    { number: 3, label: "Details" },
    { number: 4, label: "Pricing" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-175">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-semibold">
            {mode === "add" ? "Upload New Artwork" : "Edit Artwork"}
          </DialogTitle>
        </DialogHeader>

        {/* Steps */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check size={20} />
                  ) : (
                    step.number
                  )}
                </div>
                <span className="text-xs mt-1 text-gray-600">{step.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > step.number ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="py-4">
          {/* Step 1: Image Upload */}
          {currentStep === 1 && (
            <div className="flex flex-col items-center justify-center">
              {imagePreview ? (
                <div className="relative w-64 h-auto aspect-square border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
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
                  {mode === "edit" && !hasNewImage && (
                    <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                      Existing Image
                    </div>
                  )}
                  {hasNewImage && (
                    <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                      New Image
                    </div>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="artwork-upload"
                  className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors p-8"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <Upload size={32} className="text-blue-600" />
                  </div>
                  <p className="text-gray-900 font-medium mb-1">
                    Drop image here or click to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports JPG, PNG, WEBP up to 10MB
                  </p>
                </label>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
                id="artwork-upload"
              />
              {mode === "edit" && imagePreview && (
                <label
                  htmlFor="artwork-upload-change"
                  className="mt-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer underline text-center"
                >
                  Change Image
                  <input
                    id="artwork-upload-change"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}

          {/* Step 2: Artist */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div
                className="p-4 rounded-lg border flex items-center justify-between"
                style={{
                  backgroundColor: "#FED7AA",
                  borderColor: "#FB923C",
                }}
              >
                <span className="font-medium" style={{ color: "#C2410C" }}>
                  Post Anonymously (No Artist Profile)
                </span>
                <Switch
                  checked={isAnonymous === true}
                  onCheckedChange={(checked) => {
                    form.setValue("isAnonymous", checked);
                    if (checked) {
                      form.setValue("artistId", "");
                    }
                  }}
                />
              </div>

              {!isAnonymous && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign Artist *
                  </label>
                  <Select
                    value={form.watch("artistId")}
                    onValueChange={(value) => form.setValue("artistId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an artist" />
                    </SelectTrigger>
                    <SelectContent>
                      {artistsData?.data?.map((artist) => (
                        <SelectItem key={artist.id} value={artist.name}>
                          {artist.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <div className="flex gap-6">
              {imagePreview && (
                <div className="w-1/4">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Artwork Title *
                  </label>
                  <Input
                    placeholder="Enter artwork title"
                    value={form.watch("artworkTitle")}
                    onChange={(e) =>
                      form.setValue("artworkTitle", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <Select
                    value={form.watch("category")}
                    onValueChange={(value: "Religious" | "Non_Religious") =>
                      form.setValue("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Religious">Religious</SelectItem>
                      <SelectItem value="Non_Religious">
                        Non Religious
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Pricing */}
          {currentStep === 4 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buy It Now Price ($)
                </label>
                <Input
                  type="number"
                  placeholder="100"
                  value={form.watch("buyNowPrice") || ""}
                  onChange={(e) =>
                    form.setValue(
                      "buyNowPrice",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave 0 for auction only
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Starting Auction Price ($) *
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.watch("startingAuctionPrice") || ""}
                  onChange={(e) =>
                    form.setValue(
                      "startingAuctionPrice",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <DialogFooter className="gap-2">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isPending}
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            className="bg-primary text-white"
            onClick={handleNext}
            disabled={isPending}
          >
            {isPending
              ? mode === "add"
                ? "Uploading..."
                : "Updating..."
              : currentStep === 4
                ? mode === "add"
                  ? "Publish Artwork"
                  : "Update Artwork"
                : "Next Step"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
