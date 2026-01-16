'use client';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductProps } from "@/interface/product";
import { products } from "@/lib/data";
import { Product } from "@/webcomponents/reusable";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

export const FeaturedArtwork = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] =
    useState<string>("all");
  const categories = Array.from(
    new Set(products.map((item) => item.productCategory))
  );
  const filteredProducts = useMemo<ProductProps[]>(() => {
    return products.filter((product) => {
      // 1️⃣ Category filter
      const categoryMatch =
        selectedCategory === "all" ||
        product.productCategory === selectedCategory;

      // 2️⃣ Availability filter
      const availabilityMatch =
        selectedAvailability === "all" ||
        (selectedAvailability === "Available" && !product.isSoldOut) ||
        (selectedAvailability === "Sold" && product.isSoldOut);

      return categoryMatch && availabilityMatch;
    });
  }, [selectedCategory, selectedAvailability]);
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
            <Select defaultValue="all" onValueChange={setSelectedCategory}>
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
            key={product.productId}
            product={product}
            buttonText={["Make a Bid"]}
          />
        ))}
      </div>
    </div>
  );
};
