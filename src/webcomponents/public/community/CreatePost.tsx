"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Video, Send, X } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  state: z.string().min(1, { message: "Please select a state" }),
  topic: z.string().min(1, { message: "Please select a topic" }),
  postTitle: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" }),
});

const states = ["California", "Texas", "New York", "Florida", "Illinois"];
const topics = ["Education", "Prison", "Healthcare", "Visitation", "Reentry"];

export const CreatePost = () => {
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: "",
      topic: "",
      postTitle: "",
      content: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      for (let i = 0; i < Math.min(files.length, 4 - images.length); i++) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            if (
              newImages.length === Math.min(files.length, 4 - images.length)
            ) {
              setImages([...images, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setVideo(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setVideo(null);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values, { images, video });
    // Handle form submission
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Create a Post
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* State and Topic Selects */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Post Title */}
          <FormField
            control={form.control}
            name="postTitle"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Post Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts..."
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image and Video Upload */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={images.length >= 4}
              />
              <label htmlFor="image-upload">
                <div
                  className={`flex items-center justify-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${
                    images.length >= 4
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-[#F5F5F5] hover:bg-gray-200"
                  }`}
                >
                  <ImagePlus size={20} />
                  <span className="text-sm font-medium">Add Images</span>
                </div>
              </label>
            </div>

            <div>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
                id="video-upload"
                disabled={!!video}
              />
              <label htmlFor="video-upload">
                <div
                  className={`flex items-center justify-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${
                    video
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-[#F5F5F5] hover:bg-gray-200"
                  }`}
                >
                  <Video size={20} />
                  <span className="text-sm font-medium">Add Video</span>
                </div>
              </label>
            </div>
          </div>

          {/* Preview Section */}
          {(images.length > 0 || video) && (
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-medium text-gray-700">Preview</h4>

              {/* Images Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <Image
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Video Preview */}
              {video && (
                <div className="relative group">
                  <video
                    src={video}
                    controls
                    className="w-full max-h-64 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-primary text-white">
            <Send size={18} className="mr-2" />
            Post To Community
          </Button>
        </form>
      </Form>
    </div>
  );
};
