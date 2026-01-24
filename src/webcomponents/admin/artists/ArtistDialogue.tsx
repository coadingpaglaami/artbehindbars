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
import { ArtistInfo } from "@/interface/admin";
import { useEffect } from "react";

const artistSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  inmateId: z.string().min(3, "Inmate ID is required"),
  state: z.string().min(2, "State is required"),
  facilityName: z.string().min(3, "Facility name is required"),
  minReleaseDate: z.string().min(4, "Min release date is required"),
  maxReleaseDate: z.string().min(4, "Max release date is required"),
});

interface ArtistDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  artist?: ArtistInfo | null;
  mode: "add" | "edit";
}

export const ArtistDialogue = ({
  isOpen,
  onClose,
  artist,
  mode,
}: ArtistDialogueProps) => {
  const form = useForm<z.infer<typeof artistSchema>>({
    resolver: zodResolver(artistSchema),
    defaultValues: {
      fullName: "",
      inmateId: "",
      state: "",
      facilityName: "",
      minReleaseDate: "",
      maxReleaseDate: "",
    },
  });

  useEffect(() => {
    if (artist && mode === "edit") {
      form.reset({
        fullName: artist.artistName,
        inmateId: artist.artistIdNumber,
        state: artist.state,
        facilityName: artist.facility,
        minReleaseDate: artist.releaseStartYear.toString(),
        maxReleaseDate: artist.releaseEndYear.toString(),
      });
    } else {
      form.reset({
        fullName: "",
        inmateId: "",
        state: "",
        facilityName: "",
        minReleaseDate: "",
        maxReleaseDate: "",
      });
    }
  }, [artist, mode, form, isOpen]);

  const onSubmit = (values: z.infer<typeof artistSchema>) => {
    console.log(
      mode === "add" ? "Creating artist:" : "Updating artist:",
      values,
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-150">
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
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Full Name</FormLabel>
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
                    <FormLabel>Inmate ID</FormLabel>
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
                    <FormLabel>State</FormLabel>
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
                  <FormLabel>Facility Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter facility name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Min Release Date and Max Release Date */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minReleaseDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Min Release Date</FormLabel>
                    <FormControl>
                      <Input placeholder="YYYY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxReleaseDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Max Release Date</FormLabel>
                    <FormControl>
                      <Input placeholder="YYYY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                {mode === "add" ? "Create Profile" : "Update Profile"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
