"use client";

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
import { Loader2, CreditCard, MapPin, User, ShoppingBag } from "lucide-react";
import { useGetMyBillingHistory } from "@/api/account";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Updated schema without CVV
const billingSchema = z.object({
  cardNumber: z.string().min(16, "Card number is required"),
  name: z.string().min(2, "Name is required"),
  billingAddress: z.string().min(5, "Billing address is required"),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Format: MM/YY"),
});

interface BillingData {
  data: {
    id: string;
    status: string;
    card: {
      cardBrand: string;
      last4: string;
      expMonth: string;
      expYear: string;
      fingerprint: string;
      cardType: string;
      prepaidType: string;
      bin: string;
    };
  };
  orders: {
    id: string;
    shipping: string;
    name: string;
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
      statusCode?: number;
    };
  };
  message?: string;
}

export const BillingInfo = () => {
  const router = useRouter();
  const { data: billingData, isLoading, error } = useGetMyBillingHistory();
  const apiError = error as ApiError;

  const form = useForm<z.infer<typeof billingSchema>>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      cardNumber: "",
      name: "",
      billingAddress: "",
      expiry: "",
    },
  });

  // Set form values when data is loaded
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    if (billingData && !isNoOrdersError(apiError)) {
      const data = billingData as BillingData;
      form.reset({
        cardNumber: `**** **** **** ${data.data.card.last4}`,
        name: data.orders.name,
        billingAddress: data.orders.shipping,
        expiry: `${data.data.card.expMonth}/${data.data.card.expYear.slice(2)}`,
      });
    }
  }, [billingData, form, apiError]);

  // Check if error is "No orders found"
  const isNoOrdersError = (error: ApiError | null): boolean => {
    return error?.response?.data?.message === "No orders found" || 
           error?.response?.data?.statusCode === 404;
  };

  const getErrorMessage = (error: ApiError | null): string => {
    return error?.response?.data?.message || error?.message || "Failed to load billing information. Please try again.";
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-100">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-500">Loading billing information...</p>
        </div>
      </div>
    );
  }

  // Handle "No orders found" case
  if (error && isNoOrdersError(apiError)) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Billing Information
        </h2>
        <div className="bg-white rounded-xl border p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              No Billing Information Yet
            </h3>
            <p className="text-gray-500 max-w-md">
              You haven&apos;t made any purchases yet. Once you buy something, your billing information will appear here.
            </p>
            <Button 
              onClick={() => router.push('/shop_art')}
              className="bg-primary text-white mt-4"
            >
              Browse Shop Art
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle other errors
  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Billing Information
        </h2>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-center">
            {getErrorMessage(apiError)}
          </p>
        </div>
      </div>
    );
  }

  // If no data, show empty state
  if (!billingData) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Billing Information
        </h2>
        <div className="bg-white rounded-xl border p-12 text-center">
          <p className="text-gray-500">No billing information available.</p>
        </div>
      </div>
    );
  }

  const data = billingData as BillingData;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Billing Information
      </h2>

      {/* Current Card Info - Breadcrumb Style */}
      <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 mb-6 shadow-lg">
        <div className="space-y-4">
          {/* Card Brand and Type */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CreditCard size={20} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-300">
                {data.data.card.cardBrand} • {data.data.card.cardType}
              </span>
            </div>
          </div>

          {/* Card Number */}
          <div>
            <p className="text-xs text-gray-400 mb-1">Card Number</p>
            <p className="text-lg font-mono tracking-wider">
              •••• •••• •••• {data.data.card.last4}
            </p>
          </div>

          {/* Name and Expiry */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                <User size={12} /> Name
              </p>
              <p className="font-medium truncate">{data.orders.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Expires</p>
              <p className="font-medium">
                {data.data.card.expMonth}/{data.data.card.expYear.slice(2)}
              </p>
            </div>
          </div>

          {/* Billing Address */}
          <div className="pt-2 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
              <MapPin size={12} /> Billing Address
            </p>
            <p className="text-sm">{data.orders.shipping}</p>
          </div>
        </div>
      </div>

      {/* Billing Form - Read Only */}
      <Form {...form}>
        <div className="space-y-4">
          {/* Card Number - Disabled */}
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-gray-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-gray-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Billing Address */}
          <FormField
            control={form.control}
            name="billingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing Address</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-20 bg-gray-100"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expiry - Read Only */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="bg-gray-100" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* No CVV field */}
        </div>
      </Form>
    </div>
  );
};