"use client";
import React, { useState, useEffect, Suspense } from "react";
import { API_URL } from "../../../utils/api";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import InfoTooltip from "../../components/InfoTooltip";

export const dynamic = 'force-dynamic';

interface Pickup {
  id: number;
  item: {
    id: number;
    name: string;
    images: string[];
    lotNumber: string;
  };
  scheduledDate: string | null;
  pickupDeadline: string;
  status: string;
  isLate: boolean;
  daysLate: number;
  lateFeeAmount: number;
  releaseDocument: string;
  transportationCompany: string | null;
}

const PickupContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");
  
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [selectedPickup, setSelectedPickup] = useState<Pickup | null>(null);
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [transportationCompany, setTransportationCompany] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
      fetchPendingPickups(id);
    }
  }, [router]);

  const fetchPendingPickups = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/pickup/pending/${id}`);
      setPickups(response.data.pickups || []);
      
      // If itemId is provided, find that specific pickup
      if (itemId) {
        const pickup = response.data.pickups?.find((p: Pickup) => p.item.id.toString() === itemId);
        if (pickup) {
          setSelectedPickup(pickup);
          if (pickup.scheduledDate) {
            setScheduledDate(new Date(pickup.scheduledDate).toISOString().split('T')[0]);
          }
          if (pickup.transportationCompany) {
            setTransportationCompany(pickup.transportationCompany);
          }
        }
      }
    } catch (err: any) {
      console.error("Error fetching pickups:", err);
      setError(err.response?.data?.message || "Failed to load pickup information");
    } finally {
      setLoading(false);
    }
  };

  const handleSchedulePickup = async () => {
    if (!selectedPickup || !clientId) return;

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(`${API_URL}/pickup/schedule`, {
        itemId: selectedPickup.item.id,
        clientId: parseInt(clientId),
        scheduledDate: scheduledDate || null,
        transportationCompany: transportationCompany || null,
      });

      setSuccess("Pickup scheduled successfully!");
      await fetchPendingPickups(clientId);
    } catch (err: any) {
      console.error("Error scheduling pickup:", err);
      setError(err.response?.data?.message || "Failed to schedule pickup");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmPickup = async (pickupId: number) => {
    try {
      await axios.post(`${API_URL}/pickup/confirm/${pickupId}`);
      setSuccess("Pickup confirmed successfully!");
      if (clientId) {
        await fetchPendingPickups(clientId);
      }
    } catch (err: any) {
      console.error("Error confirming pickup:", err);
      setError(err.response?.data?.message || "Failed to confirm pickup");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading pickup information...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Schedule Pickup</h1>

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

      {pickups.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">No pending pickups at this time.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pickups.map((pickup) => {
            const daysUntilDeadline = getDaysUntilDeadline(pickup.pickupDeadline);
            const isUrgent = daysUntilDeadline <= 2;

            return (
              <div
                key={pickup.id}
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  pickup.isLate
                    ? "border-red-500"
                    : isUrgent
                    ? "border-orange-500"
                    : "border-blue-500"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{pickup.item.name}</h2>
                    {pickup.item.lotNumber && (
                      <p className="text-sm text-gray-600 mb-4">Lot Number: {pickup.item.lotNumber}</p>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600">Pickup Deadline</p>
                          <InfoTooltip 
                            content="The pickup deadline is the last date you can schedule pickup without incurring late storage fees. Schedule your pickup before this date to avoid additional charges."
                            position="top"
                            iconSize="sm"
                          />
                        </div>
                        <p className={`font-semibold ${pickup.isLate ? "text-red-600" : isUrgent ? "text-orange-600" : ""}`}>
                          {formatDate(pickup.pickupDeadline)}
                        </p>
                        <p className={`text-xs ${pickup.isLate ? "text-red-600 font-bold" : isUrgent ? "text-orange-600" : "text-gray-500"}`}>
                          {pickup.isLate
                            ? `${pickup.daysLate} days late`
                            : daysUntilDeadline > 0
                            ? `${daysUntilDeadline} days remaining`
                            : "Deadline today"}
                        </p>
                      </div>
                      
                      {pickup.scheduledDate && (
                        <div>
                          <p className="text-sm text-gray-600">Scheduled Date</p>
                          <p className="font-semibold">{formatDate(pickup.scheduledDate)}</p>
                        </div>
                      )}
                      
                      {pickup.isLate && pickup.lateFeeAmount > 0 && (
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-600">Late Storage Fee</p>
                            <InfoTooltip 
                              content="Late storage fees are charged when pickup is scheduled after the deadline. The fee amount increases the longer you delay pickup. Schedule immediately to avoid additional charges."
                              position="top"
                              iconSize="sm"
                            />
                          </div>
                          <p className="font-semibold text-red-600">
                            ${pickup.lateFeeAmount.toFixed(2)}
                          </p>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            pickup.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : pickup.status === "late"
                              ? "bg-red-100 text-red-800"
                              : pickup.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {pickup.status}
                        </span>
                      </div>
                    </div>

                    {pickup.releaseDocument && (
                      <div className="mb-4">
                        <a
                          href={pickup.releaseDocument}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          📄 View Release Document
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {pickup.status !== "completed" && (
                  <div className="border-t pt-4 mt-4">
                    {pickup.status === "pending" || pickup.status === "scheduled" ? (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor={`scheduledDate-${pickup.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                            Scheduled Pickup Date
                          </label>
                          <input
                            type="date"
                            id={`scheduledDate-${pickup.id}`}
                            value={pickup.scheduledDate ? new Date(pickup.scheduledDate).toISOString().split('T')[0] : scheduledDate}
                            onChange={(e) => {
                              setScheduledDate(e.target.value);
                              setSelectedPickup(pickup);
                            }}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`transportation-${pickup.id}`} className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            Transportation Company (Optional)
                            <InfoTooltip 
                              content="If you're using a transportation company to pick up the vehicle, enter their name here. This is optional but helps with coordination."
                              position="top"
                              iconSize="sm"
                            />
                          </label>
                          <input
                            type="text"
                            id={`transportation-${pickup.id}`}
                            value={pickup.transportationCompany || transportationCompany}
                            onChange={(e) => {
                              setTransportationCompany(e.target.value);
                              setSelectedPickup(pickup);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter transportation company name"
                          />
                        </div>
                        
                        <button
                          onClick={() => {
                            setSelectedPickup(pickup);
                            handleSchedulePickup();
                          }}
                          disabled={submitting}
                          className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                        >
                          {submitting ? "Scheduling..." : "Schedule Pickup"}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleConfirmPickup(pickup.id)}
                        className="w-full bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                      >
                        Confirm Pickup Completed
                      </button>
                    )}
                  </div>
                )}

                {pickup.isLate && (
                  <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-sm text-red-800">
                      <strong>Warning:</strong> Your pickup is late. Storage fees of ${pickup.lateFeeAmount.toFixed(2)} 
                      have been added to your payment. Please schedule pickup immediately.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const PickupSchedulePage = () => {
  return (
    <Suspense fallback={<div className="container mx-auto p-6">Loading pickup information...</div>}>
      <PickupContent />
    </Suspense>
  );
};

export default PickupSchedulePage;

