"use client";
import React, { useState, useEffect, Suspense } from "react";
import { API_URL } from "../../../utils/api";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import InfoTooltip from "../../components/InfoTooltip";

export const dynamic = 'force-dynamic';

interface TitleTransfer {
  id: number;
  item: {
    id: number;
    name: string;
    vin: string;
    lotNumber: string;
    images: string[];
  };
  titleType: string;
  status: string;
  documentUrl: string | null;
  transferDate: string | null;
  exportDocument: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

const TitleTransferContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");
  
  const [titleTransfer, setTitleTransfer] = useState<TitleTransfer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
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
        fetchTitleTransferStatus(itemId);
      }
    }
  }, [itemId, router]);

  const fetchTitleTransferStatus = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/title/status/${id}`);
      
      if (response.data.hasTransfer) {
        setTitleTransfer(response.data.titleTransfer);
      } else {
        setError("No title transfer record found for this item.");
      }
    } catch (err: any) {
      console.error("Error fetching title transfer:", err);
      setError(err.response?.data?.message || "Failed to load title transfer information");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-transit":
        return "bg-blue-100 text-blue-800";
      case "delayed":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading title transfer information...</div>
      </div>
    );
  }

  if (error && !titleTransfer) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          {error}
        </div>
      </div>
    );
  }

  if (!titleTransfer) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">No title transfer record found.</p>
          <p className="text-sm text-gray-500 mt-2">
            Title transfer will be initiated after pickup is confirmed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Title Transfer Status</h1>

      {/* Vehicle Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{titleTransfer.item.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {titleTransfer.item.vin && (
            <div>
              <p className="text-sm text-gray-600">VIN Number</p>
              <p className="font-semibold">{titleTransfer.item.vin}</p>
            </div>
          )}
          {titleTransfer.item.lotNumber && (
            <div>
              <p className="text-sm text-gray-600">Lot Number</p>
              <p className="font-semibold">{titleTransfer.item.lotNumber}</p>
            </div>
          )}
        </div>
      </div>

      {/* Title Transfer Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Transfer Details</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600 flex items-center gap-2">
              Title Type
              <InfoTooltip 
                content={
                  <div>
                    <p className="font-semibold mb-1 text-yellow-300">Title Types:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li><strong>Standard:</strong> Regular vehicle title transfer</li>
                      <li><strong>Export-only:</strong> Title for vehicles being exported, includes export documentation</li>
                    </ul>
                  </div>
                }
                position="top"
                iconSize="sm"
              />
            </span>
            <span className="font-semibold">{titleTransfer.titleType}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600 flex items-center gap-2">
              Status
              <InfoTooltip 
                content={
                  <div>
                    <p className="font-semibold mb-1 text-yellow-300">Title Transfer Statuses:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li><strong>Pending:</strong> Title transfer initiated, document being prepared</li>
                      <li><strong>In-transit:</strong> Title document is being shipped to you</li>
                      <li><strong>Completed:</strong> Title transfer finished successfully</li>
                      <li><strong>Delayed:</strong> Transfer is delayed, contact support</li>
                    </ul>
                  </div>
                }
                position="top"
                iconSize="sm"
              />
            </span>
            <span className={`px-3 py-1 rounded text-sm font-semibold ${getStatusColor(titleTransfer.status)}`}>
              {titleTransfer.status}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Transfer Date</span>
            <span className="font-semibold">{formatDate(titleTransfer.transferDate)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Initiated</span>
            <span className="font-semibold">{formatDate(titleTransfer.createdAt)}</span>
          </div>
          
          {titleTransfer.notes && (
            <div className="py-2 border-b">
              <p className="text-gray-600 mb-2">Notes</p>
              <p className="text-gray-800">{titleTransfer.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        
        <div className="space-y-4">
          {titleTransfer.documentUrl ? (
            <div>
              <p className="text-sm text-gray-600 mb-2">Title Document</p>
              <a
                href={titleTransfer.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline flex items-center"
              >
                <span className="mr-2">📄</span>
                Download Title Document
              </a>
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-800">
                Title document is being prepared. You will be notified when it's ready.
              </p>
            </div>
          )}
          
          {titleTransfer.titleType === "Export-only" && titleTransfer.exportDocument && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm text-gray-600">Export Documentation</p>
                <InfoTooltip 
                  content="Export documentation is required for vehicles being exported. This includes all necessary paperwork for international shipping and registration."
                  position="top"
                  iconSize="sm"
                />
              </div>
              <a
                href={titleTransfer.exportDocument}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline flex items-center"
              >
                <span className="mr-2">📋</span>
                Download Export Documents
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Status Messages */}
      {titleTransfer.status === "pending" && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Status:</strong> Title transfer has been initiated. The title document is being prepared.
          </p>
        </div>
      )}
      
      {titleTransfer.status === "in-transit" && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Status:</strong> Title document is in transit. You will receive it soon.
          </p>
        </div>
      )}
      
      {titleTransfer.status === "completed" && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <p className="text-sm text-green-800">
            <strong>Status:</strong> Title transfer completed successfully on {formatDate(titleTransfer.transferDate)}.
          </p>
        </div>
      )}
      
      {titleTransfer.status === "delayed" && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Status:</strong> Title transfer is delayed. Please contact support for more information.
          </p>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

const TitleTransferStatusPage = () => {
  return (
    <Suspense fallback={<div className="container mx-auto p-6">Loading title transfer information...</div>}>
      <TitleTransferContent />
    </Suspense>
  );
};

export default TitleTransferStatusPage;

