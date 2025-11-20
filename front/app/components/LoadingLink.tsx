"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLoading } from './LoadingContext';
import { useEffect } from 'react';

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

const LoadingLink: React.FC<LoadingLinkProps> = ({ 
  href, 
  children, 
  className, 
  onClick,
  ...props 
}) => {
  const { setLoading } = useLoading();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }

    // Only show loading if navigating to a different page
    if (href !== pathname && href.startsWith('/')) {
      setLoading(true, "Loading item...");
    }
  };

  // Hide loading when pathname changes (page has loaded)
  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LoadingLink;

