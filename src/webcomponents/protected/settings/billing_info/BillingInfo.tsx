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
import { Save } from "lucide-react";

const billingSchema = z.object({
  cardNumber: z.string().min(16, "Card number is required"),
  cardholderName: z.string().min(2, "Cardholder name is required"),
  billingAddress: z.string().min(5, "Billing address is required"),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Format: MM/YY"),
  cvv: z.string().min(3, "CVV must be 3-4 digits").max(4),
});

export const BillingInfo = () => {
  const form = useForm<z.infer<typeof billingSchema>>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      cardNumber: "**** **** **** 1234",
      cardholderName: "",
      billingAddress: "",
      expiry: "",
      cvv: "",
    },
  });

  const onSubmit = (values: z.infer<typeof billingSchema>) => {
    console.log(values);
  };

  return (
    <div className=" p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Billing Information
      </h2>

      {/* Current Card Info - Breadcrumb Style */}
      <div className="bg-black text-white rounded-lg p-6 mb-6">
        <div className="space-y-3">
          {/* Card Number */}
          <div>
            <p className="text-xs text-gray-400 mb-1">Card Number</p>
            <p className="text-lg font-mono tracking-wider">
              **** **** **** 1234
            </p>
          </div>

          {/* Cardholder and Expiry */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Cardholder Name</p>
              <p className="font-medium">John Doe</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Expires</p>
              <p className="font-medium">12/25</p>
            </div>
          </div>
        </div>
      </div>

      {/* Update Billing Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          {/* Cardholder Name */}
          <FormField
            control={form.control}
            name="cardholderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cardholder Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                    placeholder="123 Main St, City, State, ZIP"
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expiry and CVV */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123"
                      type="password"
                      maxLength={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <Button type="submit" className="bg-primary text-white">
              <Save size={18} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
