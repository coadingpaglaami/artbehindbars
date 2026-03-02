"use client";

import { ProductProps } from "@/interface/product";
import { ShoppingCart, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SquarePaymentsForm } from "./SquarePaymentsForm"; // Adjust path
import { useRouter } from "next/navigation";
import { useCheckoutPayment } from "@/api/payment";
import { ShippingInfoDto } from "@/types/payment.type";

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
});

interface BuyOptionProps {
  product: ProductProps;
  artworkId: string;
}

export const BuyOption = ({ product, artworkId }: BuyOptionProps) => {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const shippingCost = 15;
  const totalPrice = product.productPrice + shippingCost;

  const { mutate: checkoutPayment, isPending, isSuccess, error } = useCheckoutPayment();

  const form = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
    },
  });

  const purchaseRules = [
    "All artwork sales are final",
    "Shipping typically takes 7-14 business days",
    "You will receive a tracking number once shipped",
    "Certificate of authenticity included with purchase",
  ];

  const isFormValid = form.formState.isValid && termsAccepted;

  // Handle payment token from Square
  const handlePaymentToken = async (token: string, verificationToken?: string) => {
    const shippingData = form.getValues();

    const shippingInfo: ShippingInfoDto = {
      fullName: shippingData.fullName,
      streetAddress: shippingData.streetAddress,
      city: shippingData.city,
      state: shippingData.state,
      zipCode: shippingData.zipCode,
      phoneNumber: shippingData.phoneNumber,
    };

    const payload = {
      sourceId: token,
      amount: Math.round(totalPrice ), // Convert to cents
      artworkId: artworkId,
      shippingInfo: shippingInfo,
    };

    checkoutPayment(payload, {
      onSuccess: (data) => {
        // Redirect to success page or show success message
        console.log("Order created:", data);
        router.push(`/order/${data.id}`); // Adjust route as needed
      },
      onError: (error) => {
        console.error("Payment processing failed:", error);
      },
    });
  };

  const onSubmit = (values: z.infer<typeof shippingSchema>) => {
    if (!isFormValid) return;
    setShowPaymentForm(true);
  };

  // Success State
  if (isSuccess) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Purchase Successful!
            </h3>
            <p className="text-gray-600">
              Your order has been confirmed and will be processed shortly.
            </p>
            <Button
              onClick={() => router.push("/orders")}
              className="bg-primary text-white"
            >
              View My Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Purchase Summary */}
      <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
        <div
          className="flex items-center gap-2 mb-2"
          style={{ color: "#008236" }}
        >
          <ShoppingCart size={20} />
          <h3 className="font-semibold text-lg">Direct Purchase</h3>
        </div>
        <p className="text-sm text-gray-600">
          Buy this artwork now at a fixed price
        </p>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Artwork Price</span>
            <span className="font-semibold text-gray-900">
              ${product.productPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Shipping & Handling</span>
            <span className="font-semibold text-gray-900">
              ${shippingCost.toFixed(2)}
            </span>
          </div>

          <div className="border-b border-gray-300 my-2"></div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-xl" style={{ color: "#008236" }}>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-3">
          <AlertCircle size={18} className="text-gray-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm text-gray-700">
            {purchaseRules.slice(0, 3).map((rule, idx) => (
              <div key={idx}>• {rule}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          Shipping Information
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                      disabled={showPaymentForm || isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123 Main St" 
                      {...field} 
                      disabled={showPaymentForm || isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="New York" 
                        {...field} 
                        disabled={showPaymentForm || isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="NY" 
                        {...field} 
                        disabled={showPaymentForm || isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="10001" 
                        {...field} 
                        disabled={showPaymentForm || isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="(555) 123-4567" 
                        {...field} 
                        disabled={showPaymentForm || isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div
              className="p-3 rounded space-y-2"
              style={{ backgroundColor: "#F5F5F5", borderColor: "#D4D4D4" }}
            >
              <div className="flex items-start gap-2">
                <AlertCircle
                  size={18}
                  className="text-gray-600 shrink-0 mt-0.5"
                />
                <div className="space-y-1 text-sm text-gray-700">
                  {purchaseRules.map((rule, idx) => (
                    <div key={idx}>• {rule}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-b border-gray-300"></div>

            {/* Payment Information */}
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-3">
                Payment Information
              </h3>

              {!showPaymentForm ? (
                <div
                  className="p-6 rounded flex flex-col items-center justify-center text-center space-y-3"
                  style={{
                    backgroundColor: "#F5F5F5",
                    border: "1px solid #D4D4D4",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ border: "2px solid #D4D4D4" }}
                  >
                    <Lock size={24} style={{ color: "#D4D4D4" }} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    Secure Payment Processing
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Payment will be processed securely after confirmation</p>
                    <p className="text-xs">SSL encrypted and PCI compliant</p>
                  </div>
                </div>
              ) : (
                <SquarePaymentsForm
                  totalAmount={totalPrice}
                  onPaymentSuccess={handlePaymentToken}
                  isProcessing={isPending}
                />
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="p-3 rounded-lg border"
                style={{ backgroundColor: "#FEE2E2", borderColor: "#FCA5A5" }}
              >
                <p className="text-sm text-red-800">
                  <strong>Payment Error:</strong>{" "}
                  {error instanceof Error
                    ? error.message
                    : "Payment processing failed. Please try again."}
                </p>
              </div>
            )}

            <div className="border-b border-gray-300"></div>

            <div className="flex items-start gap-2">
              <Checkbox
                checked={termsAccepted}
                onCheckedChange={(checked) =>
                  setTermsAccepted(checked === true)
                }
                disabled={showPaymentForm || isPending}
              />
              <label className="text-sm text-gray-700">
                I agree to the{" "}
                <span className="text-primary font-medium">
                  terms and conditions
                </span>{" "}
                and understand that this purchase is final
              </label>
            </div>

            {!showPaymentForm && (
              <>
                <Button
                  type="submit"
                  className="w-full text-white font-semibold"
                  style={{ backgroundColor: "#008236" }}
                  disabled={ !isFormValid || isPending}
                >
                  {isPending ? "Processing..." : "Continue to Payment"}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  By clicking &quot;Continue to Payment&quot;, you agree to
                  purchase this artwork for{" "}
                  <span className="font-semibold" style={{ color: "#008236" }}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </p>
              </>
            )}

            {showPaymentForm && !isPending && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setShowPaymentForm(false)}
              >
                ← Back to Shipping Info
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};