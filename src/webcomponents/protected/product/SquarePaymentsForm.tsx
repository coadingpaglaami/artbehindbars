// components/SquarePaymentsForm.tsx (or adjust path as needed)
"use client";

import {
  PaymentForm,
  CreditCard,
} from "react-square-web-payments-sdk";
import { Lock } from "lucide-react";

interface SquarePaymentsFormProps {
  totalAmount: number;
  onPaymentSuccess: (token: string, verificationToken?: string) => void;
  isProcessing: boolean;
}

export const SquarePaymentsForm = ({
  totalAmount,
  onPaymentSuccess,
  isProcessing,
}: SquarePaymentsFormProps) => {
  const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID!;
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;

  if (!appId || !locationId) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 text-sm">
          Payment configuration error. Please contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className="p-4 rounded-lg border"
        style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Lock size={16} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-900">
            Secure Payment - ${totalAmount.toFixed(2)}
          </span>
        </div>

        <PaymentForm
          applicationId={appId}
          locationId={locationId}
          cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
            if (token.status === "OK" && token.token) {
              onPaymentSuccess(
                token.token,
                verifiedBuyer?.token
              );
            } else {
              console.error("Tokenization failed:", token.status);
            }
          }}
          createVerificationDetails={() => ({
            amount: totalAmount.toFixed(2),
            currencyCode: "USD",
            intent: "CHARGE",
            billingContact: {
              givenName: "",
              familyName: "",
            },
          })}
        >
          <CreditCard
            buttonProps={{
              isLoading: isProcessing,
              css: {
                backgroundColor: "#008236",
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#006b2d",
                },
              },
            }}
          >
            {isProcessing ? "Processing Payment..." : `Pay $${totalAmount.toFixed(2)}`}
          </CreditCard>
        </PaymentForm>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Lock size={12} />
          <span>SSL encrypted and PCI compliant</span>
        </div>
      </div>
    </div>
  );
};