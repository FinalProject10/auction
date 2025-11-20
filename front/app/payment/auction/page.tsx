"use client";
import React, { useState, useEffect, Suspense } from "react";
import { API_URL } from "../../../utils/api";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import InfoTooltip from "../../components/InfoTooltip";

export const dynamic = 'force-dynamic';

interface PaymentBreakdown {
  vehiclePrice: number;
  auctionFee: number;
  auctionFeePercentage: number;
  storageFee: number;
  totalAmount: number;
}

interface PaymentData {
  id: number;
  vehiclePrice: number;
  auctionFee: number;
  storageFee: number;
  totalAmount: number;
  invoiceNumber: string;
  status: string;
}

const PaymentContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");
  
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [breakdown, setBreakdown] = useState<PaymentBreakdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      const role = localStorage.getItem("role");
      
      if (!id || role !== "client") {
        router.push("/login/client");
        return;
      }
      
      setClientId(id);
      
      if (itemId) {
        fetchPaymentBreakdown(itemId);
      } else {
        setError("Item ID is required");
        setLoading(false);
      }
    }
  }, [itemId, router]);

  const fetchPaymentBreakdown = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/payment/calculate/${id}`);
      
      if (response.data.payment) {
        setPaymentData(response.data.payment);
      }
      if (response.data.breakdown) {
        setBreakdown(response.data.breakdown);
      }
      
      // If payment already processed
      if (response.data.payment?.status === "paid") {
        setSuccess("Payment already processed!");
      }
    } catch (err: any) {
      console.error("Error fetching payment breakdown:", err);
      setError(err.response?.data?.message || "Failed to load payment information");
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayment = async () => {
    if (!paymentData || !clientId) return;

    setProcessing(true);
    setError("");
    setSuccess("");

    try {
      // In a real implementation, this would integrate with Stripe/Flouci
      // For now, we'll simulate the payment
      const response = await axios.post(`${API_URL}/payment/process`, {
        paymentId: paymentData.id,
        paymentMethod: "stripe",
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      });

      setSuccess("Payment processed successfully! Redirecting to pickup scheduling...");
      
      // Redirect to pickup scheduling after 2 seconds
      setTimeout(() => {
        router.push(`/pickup/schedule?itemId=${itemId}`);
      }, 2000);
    } catch (err: any) {
      console.error("Error processing payment:", err);
      setError(err.response?.data?.message || "Failed to process payment");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading payment information...</div>
      </div>
    );
  }

  if (!paymentData || !breakdown) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          {error || "Unable to calculate payment. Please ensure seller has approved the sale."}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Payment for Won Auction</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          {success}
        </div>
      )}

      {paymentData.status === "paid" ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Payment Already Processed</h2>
          <p className="text-green-700">Invoice Number: {paymentData.invoiceNumber}</p>
          <button
            onClick={() => router.push(`/pickup/schedule?itemId=${itemId}`)}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Schedule Pickup
          </button>
        </div>
      ) : (
        <>
          {/* Payment Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Payment Breakdown</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Vehicle Price (Winning Bid)</span>
                <span className="font-semibold">${breakdown.vehiclePrice.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b items-center">
                <span className="text-gray-600 flex items-center gap-2">
                  Auction Fee ({breakdown.auctionFeePercentage}%)
                  <InfoTooltip 
                    content="The auction fee is a percentage of the winning bid amount. This fee covers platform services and auction processing."
                    position="top"
                    iconSize="sm"
                  />
                </span>
                <span className="font-semibold">${breakdown.auctionFee.toLocaleString()}</span>
              </div>
              
              {breakdown.storageFee > 0 && (
                <div className="flex justify-between py-2 border-b items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    Storage Fee
                    <InfoTooltip 
                      content="Storage fees are charged when pickup is delayed beyond the deadline. Schedule your pickup promptly to avoid additional fees."
                      position="top"
                      iconSize="sm"
                    />
                  </span>
                  <span className="font-semibold text-orange-600">
                    ${breakdown.storageFee.toLocaleString()}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between py-3 border-t-2 border-gray-300 mt-4">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-lg font-bold text-green-600">
                  ${breakdown.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {breakdown.storageFee > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Storage fees have been added due to late pickup. 
                  Please schedule your pickup as soon as possible to avoid additional fees.
                </p>
              </div>
            )}

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Invoice Number:</strong> {paymentData.invoiceNumber}
              </p>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center p-4 border-2 border-blue-500 rounded cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  defaultChecked
                  className="mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Credit/Debit Card (Stripe)</span>
                    <InfoTooltip 
                      content="Stripe is a secure payment processor that accepts major credit and debit cards. Your payment information is encrypted and secure."
                      position="top"
                      iconSize="sm"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Secure payment via Stripe</p>
                </div>
              </label>
              
              <label className="flex items-center p-4 border-2 border-gray-300 rounded cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="flouci"
                  className="mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Flouci Payment</span>
                    <InfoTooltip 
                      content="Flouci is an alternative payment gateway that supports various payment methods. Choose this option if you prefer Flouci over Stripe."
                      position="top"
                      iconSize="sm"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Alternative payment method</p>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Button */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <button
              onClick={handleProcessPayment}
              disabled={processing || paymentData.status === "paid"}
              className="w-full bg-green-600 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {processing ? "Processing Payment..." : `Pay $${breakdown.totalAmount.toLocaleString()}`}
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By clicking "Pay", you agree to complete the purchase of this vehicle.
            </p>
          </div>
        </>
      )}

      {/* Payment History Link */}
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push(`/payment/history?clientId=${clientId}`)}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          View Payment History
        </button>
      </div>
    </div>
  );
};

const AuctionPaymentPage = () => {
  return (
    <Suspense fallback={<div className="container mx-auto p-6">Loading payment information...</div>}>
      <PaymentContent />
    </Suspense>
  );
};

export default AuctionPaymentPage;

