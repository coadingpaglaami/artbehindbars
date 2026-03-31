"use client";

import { ProductProps } from "@/interface/product";
import { ShoppingCart, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCheckoutPayment } from "@/api/payment";
import { ShippingInfoDto } from "@/types/payment.type";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { CheckoutForm, ShippingFormValues } from "@/webcomponents/reusable";

interface BuyOptionProps {
  product: ProductProps;
  artworkId: string;
}

export const BuyOption = ({ product, artworkId }: BuyOptionProps) => {
  const router = useRouter();
  const shippingCost = 15;
  const totalPrice = product.productPrice + shippingCost;

  const { mutate: checkoutPayment, isPending, isSuccess, error } = useCheckoutPayment();

  // const handlePaymentToken = (token: string) => {
  //   // Note: shippingValues are passed up from CheckoutForm via a callback.
  //   // Since CheckoutForm owns the form state, we accept them as a second arg.
  // };

  // CheckoutForm calls this once the Square token is ready AND we have
  // the latest shipping values from the form.
  const handlePayment = (token: string, shippingData: ShippingFormValues) => {
    const shippingInfo: ShippingInfoDto = {
      fullName: shippingData.fullName,
      streetAddress: shippingData.streetAddress,
      city: shippingData.city,
      state: shippingData.state,
      zipCode: shippingData.zipCode,
      phoneNumber: shippingData.phoneNumber,
    };

    checkoutPayment(
      {
        sourceId: token,
        amount: Math.round(totalPrice),
        artworkId,
        shippingInfo,
      },
      {
        onSuccess: (data) => {
          router.push(`/order/${data.id}`);
        },
        onError: (err) => {
          const message = getErrorMessage(err);
          toast.error(message || "Payment processing failed. Please try again.");
        },
      },
    );
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Purchase Successful!</h3>
          <p className="text-gray-600">
            Your order has been confirmed and will be processed shortly.
          </p>
          <Button onClick={() => router.push("/orders")} className="bg-primary text-white">
            View My Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Purchase summary card */}
      <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
        <div className="flex items-center gap-2 mb-2" style={{ color: "#008236" }}>
          <ShoppingCart size={20} />
          <h3 className="font-semibold text-lg">Direct Purchase</h3>
        </div>
        <p className="text-sm text-gray-600">Buy this artwork now at a fixed price</p>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Artwork Price</span>
            <span className="font-semibold text-gray-900">
              ${product.productPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Shipping &amp; Handling</span>
            <span className="font-semibold text-gray-900">${shippingCost.toFixed(2)}</span>
          </div>
          <div className="border-b border-gray-300 my-2" />
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
            <div>• All artwork sales are final</div>
            <div>• Shipping typically takes 7–14 business days</div>
            <div>• You will receive a tracking number once shipped</div>
          </div>
        </div>
      </div>

      {/* Shipping + payment form */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Shipping Information</h3>
        <CheckoutForm
          totalAmount={totalPrice}
          onPaymentToken={(token, _verif, shippingData) => handlePayment(token, shippingData)}
          isPending={isPending}
          errorMessage={error ? getErrorMessage(error) : null}
        />
      </div>
    </div>
  );
};