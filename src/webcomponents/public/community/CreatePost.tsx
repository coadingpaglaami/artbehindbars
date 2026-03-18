"use client";

import { useMemo, useState } from "react";
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
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import {
  CategoryResponse,
  PaginatedResponseDto,
  StateResponse,
  CreatePostDto,
} from "@/types/post.type";
import { toast } from "sonner";
import { useCreatePost } from "@/api/post";
import { usePosts } from "@/context/PostContext";
import { getErrorMessage } from "@/lib/utils";

interface CreatePostProps {
  categories: UseInfiniteQueryResult<
    InfiniteData<PaginatedResponseDto<CategoryResponse>, unknown>,
    Error
  >;
  states: UseInfiniteQueryResult<
    InfiniteData<PaginatedResponseDto<StateResponse>, unknown>,
    Error
  >;
  onSuccess?: () => void; // Optional callback for when post is created successfully
}

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

export const CreatePost = (props: CreatePostProps) => {
  const { categories, states: stateQuery } = props;
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null); // If you have toast
  const { refetchPosts } = usePosts();

  // Destructure the query results
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isFetchingNextPage: isCategoriesFetchingNextPage,
    hasNextPage: hasCategoriesNextPage,
    fetchNextPage: fetchCategoriesNextPage,
  } = categories;
  const {
    data: statesData,
    isLoading: isStatesLoading,
    isFetchingNextPage: isStatesFetchingNextPage,
    hasNextPage: hasStatesNextPage,
    fetchNextPage: fetchStatesNextPage,
  } = stateQuery;

  // Create post mutation
  const { mutate: createPost, isPending, isError, error } = useCreatePost();

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
      const newFiles: File[] = [];
      const newPreviews: string[] = [];

      for (let i = 0; i < Math.min(files.length, 4 - images.length); i++) {
        const file = files[i];
        newFiles.push(file);

        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newPreviews.push(event.target.result as string);
            if (
              newPreviews.length === Math.min(files.length, 4 - images.length)
            ) {
              setImages([...images, ...newFiles]);
              setImagePreviews([...imagePreviews, ...newPreviews]);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const states = useMemo(() => {
    return statesData?.pages.flatMap((page) => page.data) || [];
  }, [statesData]);

  const topics = useMemo(() => {
    return categoriesData?.pages.flatMap((page) => page.data) || [];
  }, [categoriesData]);

  // Handle infinite scroll for states dropdown
  const handleStatesScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      if (hasStatesNextPage && !isStatesFetchingNextPage) {
        fetchStatesNextPage();
      }
    }
  };

  // Handle infinite scroll for topics dropdown
  const handleTopicsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      if (hasCategoriesNextPage && !isCategoriesFetchingNextPage) {
        fetchCategoriesNextPage();
      }
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setVideoPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setVideo(null);
    setVideoPreview(null);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Prepare the payload
    const payload: CreatePostDto = {
      title: values.postTitle,
      content: values.content,
      stateId: values.state,
      topicId: values.topic,
    };

    // Call the mutation
    createPost(
      {
        payload,
        images: images.length > 0 ? images : undefined,
        video: video || undefined,
      },
      {
        onSuccess: () => {
          refetchPosts();
          toast.success("Post created successfully!");
          form.reset();
          setImages([]);
          setImagePreviews([]);
          setVideo(null);
          setVideoPreview(null);
        },
        onError: (err) => {
          const message = getErrorMessage(err);
          toast.error(message || "Failed to create post. Please try again.");
        }
      },
    );
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
                    disabled={isPending}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      onScroll={handleStatesScroll}
                      className="max-h-60 overflow-y-auto"
                    >
                      {/* Loading state */}
                      {isStatesLoading ? (
                        <div className="flex justify-center items-center py-4">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
                        </div>
                      ) : (
                        <>
                          {/* Map through states from API */}
                          {states.map((state) => (
                            <SelectItem key={state.id} value={state.id}>
                              {state.name}
                            </SelectItem>
                          ))}

                          {/* Loading more indicator */}
                          {isStatesFetchingNextPage && (
                            <div className="flex justify-center items-center py-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
                            </div>
                          )}

                          {/* No more states message */}
                          {!hasStatesNextPage && states.length > 0 && (
                            <div className="text-xs text-gray-400 text-center py-2">
                              No more states
                            </div>
                          )}
                        </>
                      )}
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
                    disabled={isPending}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      onScroll={handleTopicsScroll}
                      className="max-h-60 overflow-y-auto"
                    >
                      {/* Loading state */}
                      {isCategoriesLoading ? (
                        <div className="flex justify-center items-center py-4">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
                        </div>
                      ) : (
                        <>
                          {/* Map through topics from API */}
                          {topics.map((topic) => (
                            <SelectItem key={topic.id} value={topic.id}>
                              {topic.name}
                            </SelectItem>
                          ))}

                          {/* Loading more indicator */}
                          {isCategoriesFetchingNextPage && (
                            <div className="flex justify-center items-center py-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
                            </div>
                          )}

                          {/* No more topics message */}
                          {!hasCategoriesNextPage && topics.length > 0 && (
                            <div className="text-xs text-gray-400 text-center py-2">
                              No more topics
                            </div>
                          )}
                        </>
                      )}
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
                  <Input
                    placeholder="Post Title"
                    {...field}
                    disabled={isPending}
                  />
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
                    disabled={isPending}
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
                disabled={images.length >= 4 || isPending}
              />
              <label htmlFor="image-upload">
                <div
                  className={`flex items-center justify-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${
                    images.length >= 4 || isPending
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
                disabled={!!video || isPending}
              />
              <label htmlFor="video-upload">
                <div
                  className={`flex items-center justify-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${
                    video || isPending
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
          {(imagePreviews.length > 0 || videoPreview) && (
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-medium text-gray-700">Preview</h4>

              {/* Images Preview */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {imagePreviews.map((img, idx) => (
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
                        disabled={isPending}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Video Preview */}
              {videoPreview && (
                <div className="relative group">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full max-h-64 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeVideo}
                    disabled={isPending}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Error message if mutation fails */}
          {isError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                {error?.message || "Failed to create post. Please try again."}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-white"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Creating Post...
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Post To Community
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
