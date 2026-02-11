'use client';
import { useGetArtworks } from "@/api/gallary";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArtworkResponseDto, Category } from "@/types/gallery.types";
import { Product } from "@/webcomponents/reusable";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

export const FeaturedArtwork = () => {
 const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const {
      data: artworksData,
      isLoading,
      isError,
      error,
    } = useGetArtworks({
      page: 1,
      limit: 8,
      category: selectedCategory === "all" ? undefined : selectedCategory,
    });
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const categories = useMemo<Category[]>(() => {
    if (!artworksData?.data) return [];
    
    const uniqueCategories = new Set<Category>();
    artworksData.data.forEach((artwork) => {
      uniqueCategories.add(artwork.category);
    });
    
    return Array.from(uniqueCategories);
  }, [artworksData?.data]);
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const filteredProducts = useMemo<ArtworkResponseDto[]>(() => {
    if (!artworksData?.data) return [];
    return artworksData.data.filter((product) => {
      // 1️⃣ Category filter
      const categoryMatch =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      // 2️⃣ Availability filter
      const availabilityMatch =
        selectedAvailability === "all" ||
        (selectedAvailability === "Available" && !product.isSold) ||
        (selectedAvailability === "Sold" && product.isSold);

      return categoryMatch && availabilityMatch;
    });
  }, [artworksData?.data, selectedCategory, selectedAvailability]);
  console.log(categories);

  return (
    <div className="py-16 flex flex-col gap-6 lg:px-6 px-4">
      <div className="flex flex-col gap-2.5">
        <h2 className="md:text-4xl text-2xl font-semibold ">
          Featured Artworks
        </h2>
        <span className="text-lg ">
          Explore exceptional pieces from our talented artists
        </span>
      </div>
      <div className="w-full flex flex-col gap-3 shadow-lg p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center gap-1.5 text-xl">
          <Filter /> <span>Filter Artwork</span>
        </div>
        <div className="flex flex-col md:flex-row gap-2.5">
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="email">Categories</Label>
            <Select defaultValue="all" onValueChange={setSelectedCategory as unknown as (value: string) => void}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {/* 1. Manually add the "All" option */}
                <SelectItem value="all">All Categories</SelectItem>

                {/* 2. Map through unique categories from your data */}
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="email">Availability</Label>
            <Select defaultValue="all" onValueChange={setSelectedAvailability}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {/* 1. Manually add the "All" option */}
                <SelectItem value="all">All Availability</SelectItem>

                {/* 2. Map through unique categories from your data */}
                {["Sold", "Available"].map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
            buttonText={["Make a Bid"]}
          />
        ))}
      </div>
    </div>
  );
};
