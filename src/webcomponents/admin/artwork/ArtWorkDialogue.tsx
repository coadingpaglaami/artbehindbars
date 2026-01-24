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
import { Upload, Check } from "lucide-react";
import Image from "next/image";
import { Artwork } from "@/interface/admin";

const artworkSchema = z.object({
  image: z.string().optional(),
  artist: z.string().optional(),
  artworkTitle: z.string().min(2, "Title is required"),
  category: z.enum(["Religious", "Non Religious"]),
  buyNowPrice: z.number().min(1, "Buy now price is required"),
  startingAuctionPrice: z.number().min(1, "Starting auction price is required"),
});

interface ArtWorkDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  artwork?: Artwork | null;
  mode: "add" | "edit";
  allArtists?: string[];
}

export const ArtWorkDialogue = ({
  isOpen,
  onClose,
  artwork,
  mode,
  allArtists = [],
}: ArtWorkDialogueProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const form = useForm<z.infer<typeof artworkSchema>>({
    resolver: zodResolver(artworkSchema),
    defaultValues: {
      image: "",
      artist: "",
      artworkTitle: "",
      category: "Religious",
      buyNowPrice: 0,
      startingAuctionPrice: 0,
    },
  });

  useEffect(() => {
    if (artwork && mode === "edit") {
      form.reset({
        image: artwork.artworkImage,
        artist: artwork.artist,
        artworkTitle: artwork.artworkTitle,
        category: artwork.category,
        buyNowPrice: artwork.price,
        startingAuctionPrice: artwork.price * 0.7,
      });
      setUploadedImage(artwork.artworkImage);
      setIsAnonymous(artwork.artist === "Anonymous");
    } else {
      form.reset({
        image: "",
        artist: "",
        artworkTitle: "",
        category: "Religious",
        buyNowPrice: 0,
        startingAuctionPrice: 0,
      });
      setUploadedImage(null);
      setIsAnonymous(false);
    }
    setCurrentStep(1);
  }, [artwork, mode, form, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
          form.setValue("image", event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("File size must be less than 10MB");
    }
  };

  const onSubmit = (values: z.infer<typeof artworkSchema>) => {
    console.log(mode === "add" ? "Creating artwork:" : "Updating artwork:", values);
    onClose();
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else form.handleSubmit(onSubmit)();
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, label: "Image" },
    { number: 2, label: "Artist" },
    { number: 3, label: "Details" },
    { number: 4, label: "Pricing" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
                id="artwork-upload"
              />
              <label
                htmlFor="artwork-upload"
                className={`w-full ${
                  uploadedImage ? "aspect-square" : "h-64"
                } border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors ${
                  uploadedImage ? "p-0" : "p-8"
                }`}
              >
                {uploadedImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={uploadedImage}
                      alt="Preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                      <Upload size={32} className="text-blue-600" />
                    </div>
                    <p className="text-gray-900 font-medium mb-1">
                      Drop image here or click to upload
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports JPG, PNG, WEBP up to 10MB
                    </p>
                  </>
                )}
              </label>
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
                  checked={isAnonymous}
                  onCheckedChange={(checked) => {
                    setIsAnonymous(checked);
                    if (checked) {
                      form.setValue("artist", "Anonymous");
                    }
                  }}
                />
              </div>

              {!isAnonymous && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign Artist
                  </label>
                  <Select
                    value={form.watch("artist")}
                    onValueChange={(value) => form.setValue("artist", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an artist" />
                    </SelectTrigger>
                    <SelectContent>
                      {allArtists.map((artist) => (
                        <SelectItem key={artist} value={artist}>
                          {artist}
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
              {uploadedImage && (
                <div className="w-1/4">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={uploadedImage}
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
                    Artwork Title
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
                    Category
                  </label>
                  <Select
                    value={form.watch("category")}
                    onValueChange={(value: "Religious" | "Non Religious") =>
                      form.setValue("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Religious">Religious</SelectItem>
                      <SelectItem value="Non Religious">Non Religious</SelectItem>
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
                  placeholder="0"
                  value={form.watch("buyNowPrice") || ""}
                  onChange={(e) =>
                    form.setValue("buyNowPrice", parseFloat(e.target.value))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Starting Auction Price ($)
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.watch("startingAuctionPrice") || ""}
                  onChange={(e) =>
                    form.setValue(
                      "startingAuctionPrice",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button type="button" className="bg-primary text-white" onClick={handleNext}>
            {currentStep === 4
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