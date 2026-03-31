"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { ShippingFormFields } from "./ShippingFormFields";
import { SquarePaymentsForm } from "../protected/product/SquarePaymentsForm";

// ─── Schema ──────────────────────────────────────────────────────────────────

export const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  // Live validation: show error as soon as the value is too short
  zipCode: z
    .string()
    .min(1, "Zip code is required")
    .min(5, "Zip code must be at least 5 characters"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;

// ─── Purchase rules ───────────────────────────────────────────────────────────

const PURCHASE_RULES = [
  "All artwork sales are final – no returns or exchanges",
  "Shipping typically takes 7–14 business days",
  "Certificate of authenticity included with purchase",
  "Artwork will be carefully packaged for safe delivery",
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface CheckoutFormProps {
  /** Total amount in dollars (not cents) */
  totalAmount: number;
  /** Called with the Square payment token, optional verification token, and the filled shipping values */
  onPaymentToken: (token: string, verificationToken: string | undefined, shippingData: ShippingFormValues) => void;
  /** Whether the parent is waiting for the API to respond */
  isPending: boolean;
  /** Optional error message to display beneath the form */
  errorMessage?: string | null;
  /** Pre-fill shipping fields (e.g. when editing an existing pending order) */
  defaultValues?: Partial<ShippingFormValues>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CheckoutForm = ({
  totalAmount,
  onPaymentToken,
  isPending,
  errorMessage,
  defaultValues,
}: CheckoutFormProps) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    // "onChange" triggers validation on every keystroke → instant feedback
    mode: "onChange",
    defaultValues: {
      fullName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
      ...defaultValues,
    },
  });

  const isFormValid = form.formState.isValid && termsAccepted && !isPending;

  const onSubmit = () => {
    if (!isFormValid) return;
    setShowPaymentForm(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* ── Shipping fields ── */}
        <ShippingFormFields
          form={form}
          disabled={showPaymentForm || isPending}
        />

        {/* ── Purchase rules notice ── */}
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
              {PURCHASE_RULES.map((rule, idx) => (
                <div key={idx}>• {rule}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-300" />

        {/* ── Payment section ── */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-3 flex items-center gap-2">
            <CreditCard size={20} className="text-primary" />
            Payment Information
          </h3>

          {!showPaymentForm ? (
            // Locked placeholder shown before user proceeds
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
              totalAmount={totalAmount}
              onPaymentSuccess={(token: string, verificationToken?: string) =>
                onPaymentToken(token, verificationToken, form.getValues())
              }
              isProcessing={isPending}
            />
          )}
        </div>

        {/* ── Payment error ── */}
        {errorMessage && (
          <div
            className="p-3 rounded-lg border"
            style={{ backgroundColor: "#FEE2E2", borderColor: "#FCA5A5" }}
          >
            <p className="text-sm text-red-800">
              <strong>Payment Error:</strong> {errorMessage}
            </p>
          </div>
        )}

        <div className="border-b border-gray-300" />

        {/* ── Terms checkbox ── */}
        <div className="flex items-start gap-2">
          <Checkbox
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
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

        {/* ── CTA buttons ── */}
        {!showPaymentForm ? (
          <>
            <Button
              type="submit"
              className="w-full text-white font-semibold"
              style={{ backgroundColor: "#008236" }}
              disabled={!isFormValid || isPending}
            >
              {isPending ? "Processing…" : "Continue to Payment"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              By clicking &quot;Continue to Payment&quot;, you agree to purchase
              this artwork for{" "}
              <span className="font-semibold" style={{ color: "#008236" }}>
                ${totalAmount.toFixed(2)}
              </span>
            </p>
          </>
        ) : (
          !isPending && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setShowPaymentForm(false)}
            >
              ← Back to Shipping Info
            </Button>
          )
        )}
      </form>
    </Form>
  );
};