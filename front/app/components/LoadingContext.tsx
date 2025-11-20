"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingContextType {
  setLoading: (loading: boolean, message?: string) => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Loading...");

  const setLoading = (loading: boolean, msg?: string) => {
    setIsLoading(loading);
    if (msg) setMessage(msg);
  };

  return (
    <LoadingContext.Provider value={{ setLoading, isLoading }}>
      {children}
      <LoadingSpinner isLoading={isLoading} message={message} />
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

