"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductProps } from "@/interface/product";
import { getClientAuthStatus } from "@/lib/auth";
import { products } from "@/lib/data";
import { Product, SearchBar } from "@/webcomponents/reusable";
import { useMemo, useState } from "react";

/* eslint-disable react/no-unescaped-entities */
export const ShopArt = () => {
  const [search, setSearch] = useState("");
  const isAuthenticated = getClientAuthStatus();

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
      const searchMatch =
        product.productTitle.toLowerCase().includes(search.toLowerCase()) ||
        product.productArtist.toLowerCase().includes(search.toLowerCase());

      // 2️⃣ Availability filter
      const availabilityMatch =
        selectedAvailability === "all" ||
        (selectedAvailability === "Available" && !product.isSoldOut) ||
        (selectedAvailability === "Sold" && product.isSoldOut);

      return categoryMatch && availabilityMatch && searchMatch;
    });
  }, [selectedCategory, selectedAvailability, search]);
  console.log(categories);
  return (
    <div className="py-16 flex flex-col gap-6 lg:px-8 px-4">
      <div className="flex flex-col gap-2">
        <h2 className="md:text-4xl text-2xl font-semibold mb-6">Shop Art</h2>
        <span className="text-[#525252]">
          Browse our collection of original prison artwork. All pieces are
          auction-based with "Buy It Now" options.
        </span>
      </div>

      <SearchBar
        placeholder="Search by title or artist name..."
        value={search}
        onChange={setSearch}
      />
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
      <div className="flex flex-col gap-1.5">
        <span className="text-sm ">
          {" "}
          Showing {filteredProducts.length} results
        </span>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <Product
              key={product.productId}
              product={product}
              buttonText={[isAuthenticated ? "Make a Bid" : "Login to Purchase"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
