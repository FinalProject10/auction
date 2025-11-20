"use client";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../../utils/api";
import axios from "axios";
import Link from "next/link";
import Navbar from "../../home/navbar";
import Footer from "../../footer/Footer";
import InfoTooltip from "../../components/InfoTooltip";

export const dynamic = 'force-dynamic';

interface Deposit {
  id: number;
  amount: number;
  maxBiddingPower: number;
  status: string;
  createdAt: string;
}

const DepositPage = () => {
  const [balance, setBalance] = useState<any>(null);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [clientId, setClientId] = useState<string | null>(null);
  const isTestingMode = typeof window !== 'undefined' 
    ? (process.env.NEXT_PUBLIC_TESTING_MODE === 'true' || localStorage.getItem('testing_mode') === 'true')
    : false;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setClientId(id);
      if (id) {
        fetchBalance(id);
      }
    }
  }, []);

  const fetchBalance = async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/deposit/balance/${id}`);
      setBalance(response.data);
    } catch (err: any) {
      console.error("Error fetching balance:", err);
      setError("Failed to load deposit balance");
    }
  };

  const handleAddDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!clientId) {
      setError("Please log in to add a deposit");
      return;
    }

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid deposit amount");
      return;
    }

    setLoading(true);
    try {
      if (isTestingMode) {
        // In testing mode, skip payment and directly add deposit
        const response = await axios.post(`${API_URL}/deposit/add`, {
          clientId: parseInt(clientId),
          amount: amount,
          paymentMethod: "test_mode",
          transactionId: `test_txn_${Date.now()}`,
          skipPayment: true,
        });

        setSuccess(`Deposit of $${amount} added successfully! (Testing Mode)`);
        setDepositAmount("");
        await fetchBalance(clientId);
      } else {
        // In production, integrate with payment gateway
        // For now, we'll just call the API endpoint
        const response = await axios.post(`${API_URL}/deposit/add`, {
          clientId: parseInt(clientId),
          amount: amount,
          paymentMethod: "stripe", // This would come from payment gateway
          transactionId: `txn_${Date.now()}`, // This would come from payment gateway
        });

        setSuccess(`Deposit of $${amount} added successfully!`);
        setDepositAmount("");
        await fetchBalance(clientId);
      }
    } catch (err: any) {
      console.error("Error adding deposit:", err);
      setError(err.response?.data?.message || "Failed to add deposit");
    } finally {
      setLoading(false);
    }
  };

  if (!clientId) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p>Please log in to view your deposit balance.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href={"/home"} className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={"/clientDash"} className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Deposit Account</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900">Deposit Account</h1>
        </div>
      </div>
      <div className="container mx-auto p-6 max-w-4xl">

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 relative">
          <div className="flex items-start gap-2">
            <span className="flex-1">{error}</span>
            <InfoTooltip 
              content={
                <div>
                  <p className="font-semibold mb-2 text-yellow-300">What does this error mean?</p>
                  <p className="mb-2">{error.includes("bidding power") ? 
                    "You don't have enough bidding power to place this bid. Your bidding power is calculated as: Total Deposits × 10." :
                    "An error occurred. Please check the information and try again."}</p>
                  <p className="font-semibold mb-2 text-yellow-300">What should you do?</p>
                  <ul className="list-disc list-inside space-y-1 mb-2">
                    {error.includes("bidding power") ? (
                      <>
                        <li>Add more deposits to increase your bidding power</li>
                        <li>Each $1 deposit = $10 in bidding power</li>
                        <li>Use the form below to add a deposit</li>
                      </>
                    ) : (
                      <>
                        <li>Check if you're logged in</li>
                        <li>Verify the deposit amount is valid</li>
                        <li>Try again or contact support</li>
                      </>
                    )}
                  </ul>
                </div>
              }
              position="left"
              iconSize="sm"
            />
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          {success}
        </div>
      )}

      {/* Balance Summary */}
      {balance && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 relative">
          <h2 className="text-2xl font-semibold mb-4">Current Balance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-gray-600">Total Deposit</p>
              <p className="text-2xl font-bold text-blue-600">
                ${balance.totalBalance ? Number(balance.totalBalance).toFixed(2) : "0.00"}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded relative">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Max Bidding Power</p>
                <InfoTooltip 
                  content={
                    <div>
                      <p className="font-semibold mb-1 text-yellow-300">What is Bidding Power?</p>
                      <p className="mb-2">Your maximum bidding power is 10x your total deposits. This is the maximum amount you can bid across all auctions.</p>
                      <p className="font-semibold mb-1">Example:</p>
                      <p>$100 deposit = $1,000 bidding power</p>
                      <p className="mt-2 text-yellow-300">💡 If you get an "Insufficient bidding power" error, add more deposits to increase your bidding power.</p>
                    </div>
                  }
                  position="top"
                  iconSize="sm"
                />
              </div>
              <p className="text-2xl font-bold text-green-600">
                ${balance.totalMaxBiddingPower ? Number(balance.totalMaxBiddingPower).toFixed(2) : "0.00"}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <p className="text-sm text-gray-600">Active Deposits</p>
              <p className="text-2xl font-bold text-purple-600">
                {balance.activeDeposits || 0}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * Your maximum bidding power is 10x your deposit amount. For example, a $400 deposit gives you $4,000 in bidding power.
          </p>
        </div>
      )}

      {/* Testing Mode Indicator */}
      {isTestingMode && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-semibold">🧪 Testing Mode Active</p>
          <p className="text-sm">Payments are disabled. Deposits will be added without payment processing.</p>
        </div>
      )}

      {/* Add Deposit Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-semibold">Add Deposit</h2>
          <InfoTooltip 
            content={
              <div>
                <p className="font-semibold mb-1 text-yellow-300">Why add a deposit?</p>
                <p className="mb-2">Deposits are required to participate in auctions. They determine your maximum bidding power.</p>
                <p className="font-semibold mb-1">How it works:</p>
                <p className="mb-1">• Deposit × 10 = Your bidding power</p>
                <p className="mb-1">• Example: $100 deposit = $1,000 bidding power</p>
                <p className="mt-2 text-yellow-300">💡 You can bid up to your total bidding power across all auctions.</p>
              </div>
            }
            position="top"
            iconSize="sm"
          />
        </div>
        <form onSubmit={handleAddDeposit}>
          <div className="mb-4">
            <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Deposit Amount ($)
            </label>
            <input
              type="number"
              id="depositAmount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter deposit amount"
              min="1"
              step="0.01"
              required
            />
            {depositAmount && !isNaN(parseFloat(depositAmount)) && (
              <p className="text-sm text-gray-500 mt-2">
                This will give you ${(parseFloat(depositAmount) * 10).toFixed(2)} in bidding power
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Add Deposit"}
          </button>
        </form>
      </div>

      {/* Deposit History */}
      {balance && balance.deposits && balance.deposits.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Deposit History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bidding Power
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    Status
                    <InfoTooltip 
                      content={
                        <div>
                          <p className="font-semibold mb-1 text-yellow-300">Deposit Statuses:</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li><strong>Active:</strong> Deposit is available for bidding</li>
                            <li><strong>Refunded:</strong> Deposit has been returned</li>
                            <li><strong>Pending:</strong> Deposit is being processed</li>
                          </ul>
                        </div>
                      }
                      position="top"
                      iconSize="sm"
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {balance.deposits.map((deposit: Deposit) => (
                  <tr key={deposit.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(deposit.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${Number(deposit.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${deposit.maxBiddingPower ? Number(deposit.maxBiddingPower).toFixed(2) : "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          deposit.status === "active"
                            ? "bg-green-100 text-green-800"
                            : deposit.status === "refunded"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {deposit.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default DepositPage;

