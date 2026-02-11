"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  MapPin,
  Phone,
  CreditCard,
  Calendar,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useGetOrderById } from "@/api/payment";
import { useGetArtworkById } from "@/api/gallary";

export const OrderDetail=({ params }: { params: string }) =>{
  const { push } = useRouter();
  const {
    data: order,
    isLoading: orderLoading,
    isError: orderError,
  } = useGetOrderById(params);

  // Fetch artwork details if order exists
  const { data: artwork, isLoading: artworkLoading } = useGetArtworkById(
    order?.artworkId || "",
  );

  const isLoading = orderLoading || artworkLoading;

  // Helper Functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "#008236";
      case "SHIPPED":
        return "#2563EB";
      case "PENDING":
        return "#F59E0B";
      case "CANCELLED":
        return "#DC2626";
      default:
        return "#6B7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle size={20} />;
      case "SHIPPED":
        return <Truck size={20} />;
      case "PENDING":
        return <Clock size={20} />;
      case "CANCELLED":
        return <XCircle size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (orderError || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <XCircle size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find the order you&apos;re looking for. It may have
            been removed or the link is incorrect.
          </p>
          <Button
            onClick={() => push("/artists")}
            className="bg-primary text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const shippingCost = 15.0; // Fixed shipping cost
  const artworkPrice = order.totalAmount / 100 - shippingCost;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => push("/artists")}
          className="text-gray-400 hover:text-gray-600 flex items-center gap-2.5 p-2.5 transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to Artworks
        </button>

        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <CheckCircle size={40} className="text-green-600" />
            </div>

            {/* Header Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-600 mb-4">
                Thank you for your purchase. Your order has been received and is
                being processed.
              </p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div>
                  <span className="text-sm text-gray-600">Order ID</span>
                  <p className="font-mono text-sm font-semibold text-gray-900">
                    {order.id.slice(0, 20)}...
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Order Date</span>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div
              className="px-4 py-2 rounded-full flex items-center gap-2 text-white font-semibold shrink-0"
              style={{ backgroundColor: getStatusColor(order.status) }}
            >
              {getStatusIcon(order.status)}
              <span>{order.status}</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Artwork Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={24} className="text-primary" />
                Artwork Details
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Artwork Image */}
                <div className="relative w-full sm:w-32 h-48 sm:h-32 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  {artwork?.imageUrl ? (
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Package size={40} />
                    </div>
                  )}
                </div>

                {/* Artwork Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {artwork?.title || "Artwork"}
                    </h3>
                    {artwork?.artist && !artwork.isAnonymous && (
                      <p className="text-sm text-gray-600">
                        by {artwork.artist.name}
                      </p>
                    )}
                  </div>

                  {artwork?.category && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {artwork.category}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Artwork ID:</span>
                    <span className="font-mono text-xs text-gray-900">
                      {order.artworkId.slice(0, 16)}...
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => push(`/product/${order.artworkId}`)}
                    className="mt-2"
                  >
                    View Artwork Details
                  </Button>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck size={24} className="text-primary" />
                Shipping Information
              </h2>

              <div className="space-y-4">
                {/* Recipient */}
                <div className="flex items-start gap-3">
                  <User size={20} className="text-gray-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-sm text-gray-600">Recipient</span>
                    <p className="font-semibold text-gray-900">
                      {order.shippingFullName}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-gray-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-sm text-gray-600">
                      Delivery Address
                    </span>
                    <p className="text-gray-900">{order.shippingAddress}</p>
                    <p className="text-gray-900">
                      {order.shippingCity}, {order.shippingState}{" "}
                      {order.shippingZip}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-gray-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-sm text-gray-600">
                      Contact Number
                    </span>
                    <p className="text-gray-900">{order.shippingPhone}</p>
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              {order.status === "SHIPPED" && (
                <div
                  className="mt-4 p-4 rounded-lg border"
                  style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}
                >
                  <p className="text-sm font-semibold text-blue-900 mb-1 flex items-center gap-2">
                    <Truck size={16} />
                    Order Shipped!
                  </p>
                  <p className="text-sm text-blue-700">
                    Your order has been shipped! You will receive tracking
                    details via email shortly.
                  </p>
                </div>
              )}

              {order.status === "PENDING" && (
                <div
                  className="mt-4 p-4 rounded-lg border"
                  style={{ backgroundColor: "#FFFBEB", borderColor: "#FDE68A" }}
                >
                  <p className="text-sm font-semibold text-amber-900 mb-1 flex items-center gap-2">
                    <Clock size={16} />
                    Processing Order
                  </p>
                  <p className="text-sm text-amber-800">
                    Your order is being prepared for shipment. Expected shipping
                    within 2-3 business days.
                  </p>
                </div>
              )}

              {order.status === "COMPLETED" && (
                <div
                  className="mt-4 p-4 rounded-lg border"
                  style={{ backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }}
                >
                  <p className="text-sm font-semibold text-green-900 mb-1 flex items-center gap-2">
                    <CheckCircle size={16} />
                    Order Completed
                  </p>
                  <p className="text-sm text-green-800">
                    Your order has been completed and delivered successfully!
                  </p>
                </div>
              )}

              {order.status === "CANCELLED" && (
                <div
                  className="mt-4 p-4 rounded-lg border"
                  style={{ backgroundColor: "#FEE2E2", borderColor: "#FECACA" }}
                >
                  <p className="text-sm font-semibold text-red-900 mb-1 flex items-center gap-2">
                    <XCircle size={16} />
                    Order Cancelled
                  </p>
                  <p className="text-sm text-red-800">
                    This order has been cancelled. If you were charged, a refund
                    has been processed.
                  </p>
                </div>
              )}
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={24} className="text-primary" />
                Payment Information
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-semibold text-gray-900 flex items-center gap-2">
                    <CreditCard size={16} />
                    Credit Card
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-mono text-xs text-gray-900">
                    {order.squarePaymentId.slice(0, 20)}...
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Status</span>
                  <span
                    className="font-semibold px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor:
                        order.status === "CANCELLED" ? "#FEE2E2" : "#F0FDF4",
                      color:
                        order.status === "CANCELLED" ? "#991B1B" : "#166534",
                    }}
                  >
                    {order.status === "CANCELLED" ? "Refunded" : "Paid"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Date</span>
                  <span className="text-sm text-gray-900 flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Artwork Price</span>
                  <span className="font-semibold text-gray-900">
                    ${artworkPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping & Handling</span>
                  <span className="font-semibold text-gray-900">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total Paid
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "#008236" }}
                    >
                      ${(order.totalAmount / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="mt-6 p-4 rounded-lg"
                style={{ backgroundColor: "#FAFAFA" }}
              >
                <p className="text-xs text-gray-700 leading-relaxed">
                  <strong>Important:</strong> All artwork sales are final.
                  Certificate of authenticity included with purchase. Shipping
                  typically takes 7-14 business days.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  className="w-full bg-primary text-white font-semibold"
                  onClick={() => push("/artists")}
                >
                  Continue Shopping
                </Button>

                <Button
                  variant="outline"
                  className="w-full font-semibold"
                  onClick={() => window.print()}
                >
                  Print Receipt
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, please don&apos;t
            hesitate to contact us. Our support team is here to help.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => push("/contact")}
              className="font-semibold"
            >
              Contact Support
            </Button>
            <Button
              variant="outline"
              onClick={() => push("/faq")}
              className="font-semibold"
            >
              View FAQ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
