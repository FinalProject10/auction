"use client";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../../utils/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import InfoTooltip from "../../components/InfoTooltip";

export const dynamic = 'force-dynamic';

interface Approval {
  id: number;
  item: {
    id: number;
    name: string;
    price: number;
    images: string[];
    auctionEndTime: string;
  };
  bid: {
    id: number;
    bidAmount: number;
    bidder: {
      id: number;
      name: string;
      email: string;
    };
    bidTime: string;
  };
  deadline: string;
  createdAt: string;
}

const SellerApprovalsPage = () => {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
  const [responseType, setResponseType] = useState<"approve" | "reject" | "counteroffer">("approve");
  const [counterofferAmount, setCounterofferAmount] = useState<string>("");
  const [sellerResponse, setSellerResponse] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      const role = localStorage.getItem("role");
      
      if (!id || role !== "seller") {
        router.push("/login/seller");
        return;
      }
      
      setSellerId(id);
      fetchPendingApprovals(id);
    }
  }, [router]);

  const fetchPendingApprovals = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/approval/pending/${id}`);
      setApprovals(response.data.approvals || []);
    } catch (err: any) {
      console.error("Error fetching approvals:", err);
      setError(err.response?.data?.message || "Failed to load pending approvals");
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async () => {
    if (!selectedApproval) return;

    if (responseType === "counteroffer" && (!counterofferAmount || parseFloat(counterofferAmount) <= selectedApproval.bid.bidAmount)) {
      setError("Counteroffer amount must be greater than the winning bid");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await axios.post(`${API_URL}/approval/respond/${selectedApproval.id}`, {
        status: responseType === "approve" ? "approved" : responseType === "reject" ? "rejected" : "counteroffer",
        sellerResponse: sellerResponse || null,
        counterofferAmount: responseType === "counteroffer" ? parseFloat(counterofferAmount) : null,
      });

      // Refresh approvals list
      if (sellerId) {
        await fetchPendingApprovals(sellerId);
      }
      setSelectedApproval(null);
      setCounterofferAmount("");
      setSellerResponse("");
      alert(`Approval ${responseType === "approve" ? "approved" : responseType === "reject" ? "rejected" : "counteroffer sent"} successfully!`);
    } catch (err: any) {
      console.error("Error responding to approval:", err);
      setError(err.response?.data?.message || "Failed to submit response");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
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
        <div className="text-center">Loading pending approvals...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Pending Approvals</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      {approvals.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">No pending approvals at this time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {approvals.map((approval) => {
            const daysLeft = getDaysUntilDeadline(approval.deadline);
            const isUrgent = daysLeft <= 1;

            return (
              <div
                key={approval.id}
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  isUrgent ? "border-red-500" : "border-blue-500"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{approval.item.name}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Winning Bid</p>
                        <p className="font-semibold text-green-600">
                          ${approval.bid.bidAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Bidder</p>
                        <p className="font-semibold">{approval.bid.bidder.name}</p>
                        <p className="text-xs text-gray-500">{approval.bid.bidder.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Auction Ended</p>
                        <p className="font-semibold">{formatDate(approval.item.auctionEndTime)}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-600">Response Deadline</p>
                          <InfoTooltip 
                            content="You must respond to the winning bid by this deadline. If you don't respond, the sale may be automatically approved or cancelled based on platform rules."
                            position="top"
                            iconSize="sm"
                          />
                        </div>
                        <p className={`font-semibold ${isUrgent ? "text-red-600" : ""}`}>
                          {formatDate(approval.deadline)}
                        </p>
                        <p className={`text-xs ${isUrgent ? "text-red-600 font-bold" : "text-gray-500"}`}>
                          {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedApproval(approval)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Respond
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Response Modal */}
      {selectedApproval && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Respond to Approval</h2>
            <p className="text-gray-600 mb-4">
              Item: <span className="font-semibold">{selectedApproval.item.name}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Winning Bid: <span className="font-semibold text-green-600">
                ${selectedApproval.bid.bidAmount.toLocaleString()}
              </span>
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                Response Type
                <InfoTooltip 
                  content={
                    <div>
                      <p className="font-semibold mb-1 text-yellow-300">Response Options:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li><strong>Approve:</strong> Accept the winning bid and proceed with sale</li>
                        <li><strong>Reject:</strong> Decline the winning bid, auction ends without sale</li>
                        <li><strong>Counteroffer:</strong> Propose a different price to the buyer</li>
                      </ul>
                    </div>
                  }
                  position="top"
                  iconSize="sm"
                />
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="approve"
                    checked={responseType === "approve"}
                    onChange={(e) => setResponseType(e.target.value as any)}
                    className="mr-2"
                  />
                  Approve
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="reject"
                    checked={responseType === "reject"}
                    onChange={(e) => setResponseType(e.target.value as any)}
                    className="mr-2"
                  />
                  Reject
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="counteroffer"
                    checked={responseType === "counteroffer"}
                    onChange={(e) => setResponseType(e.target.value as any)}
                    className="mr-2"
                  />
                  Counteroffer
                </label>
              </div>
            </div>

            {responseType === "counteroffer" && (
              <div className="mb-4">
                <label htmlFor="counterofferAmount" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  Counteroffer Amount ($)
                  <InfoTooltip 
                    content="Enter a price higher than the winning bid. The buyer can accept, reject, or make another counteroffer. This starts a negotiation process."
                    position="top"
                    iconSize="sm"
                  />
                </label>
                <input
                  type="number"
                  id="counterofferAmount"
                  value={counterofferAmount}
                  onChange={(e) => setCounterofferAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder={`Min: $${selectedApproval.bid.bidAmount + 1}`}
                  min={selectedApproval.bid.bidAmount + 1}
                  step="1"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="sellerResponse" className="block text-sm font-medium text-gray-700 mb-2">
                Response Message (Optional)
              </label>
              <textarea
                id="sellerResponse"
                value={sellerResponse}
                onChange={(e) => setSellerResponse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Add any notes or messages for the buyer..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setSelectedApproval(null);
                  setCounterofferAmount("");
                  setSellerResponse("");
                  setResponseType("approve");
                }}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRespond}
                disabled={submitting || (responseType === "counteroffer" && !counterofferAmount)}
                className={`px-4 py-2 rounded text-white ${
                  responseType === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : responseType === "reject"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-orange-600 hover:bg-orange-700"
                } disabled:bg-gray-400 disabled:cursor-not-allowed`}
              >
                {submitting ? "Submitting..." : `Submit ${responseType === "approve" ? "Approval" : responseType === "reject" ? "Rejection" : "Counteroffer"}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerApprovalsPage;

