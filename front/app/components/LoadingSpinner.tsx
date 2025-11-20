"use client";
import React from 'react';

interface LoadingSpinnerProps {
  isLoading: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading, message = "Loading..." }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-8 shadow-2xl">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div 
              className="w-8 h-8 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" 
              style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
            ></div>
          </div>
        </div>
        <p className="text-gray-700 font-medium text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

