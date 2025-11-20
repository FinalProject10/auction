"use client";
import "../(itemComponents)/style/page.css";
import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { API_URL } from "../../../utils/api";

// Lazy load components with loading states
const Loading = dynamic(() => import("./loading"), {
  loading: () => <div className="flex items-center justify-center min-h-screen">Loading...</div>
});
const Gallery = dynamic(() => import("../(itemComponents)/itemGallery"), {
  loading: () => <div className="h-[500px] bg-gray-200 animate-pulse rounded" />
});
const ItemHeader = dynamic(() => import("../(itemComponents)/itemHader"), {
  loading: () => <div className="h-20 bg-gray-200 animate-pulse" />
});
const ItemBid = dynamic(() => import("../(itemComponents)/itemBid"), {
  loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded" />
});
const ItemInfo = dynamic(() => import("../(itemComponents)/itemInfo"), {
  loading: () => <div className="h-32 bg-gray-200 animate-pulse rounded" />
});
const ItemDescrption = dynamic(
  () => import("../(itemComponents)/itemDescrption"),
  {
    loading: () => <div className="h-48 bg-gray-200 animate-pulse rounded" />
  }
);
const ItemSidebar = dynamic(() => import("../(itemComponents)/itemSidebar"), {
  loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded" />
});

const Item = ({ params }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize itemId to prevent unnecessary re-renders
  const itemId = useMemo(() => params?.id, [params?.id]);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      if (!itemId) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${API_URL}/items/fetch-items/${itemId}`,
          { signal: abortController.signal }
        );
        
        if (isMounted) {
          setItems(response.data as Item[]);
          setLoading(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          // Request was cancelled, ignore
          return;
        }
        if (isMounted) {
          console.error("Error fetching data:", error);
          setError("Failed to load item. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [itemId]);

  // Memoize items to prevent unnecessary re-renders
  const memoizedItems = useMemo(() => items, [items]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ItemHeader items={memoizedItems} />
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="galoryBid">
          <div className="flex flex-col">
            <Gallery items={memoizedItems} />
            <div className="iteminfo">
              <ItemInfo items={memoizedItems} />
              <ItemDescrption items={memoizedItems} />
            </div>
          </div>

          <div className="flex flex-col gap-6 sticky top-6 h-fit">
            <ItemBid items={memoizedItems} />
            <ItemSidebar items={memoizedItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Item);
