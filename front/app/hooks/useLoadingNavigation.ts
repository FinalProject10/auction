"use client";
import { useRouter } from 'next/navigation';
import { useLoading } from '../components/LoadingContext';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const useLoadingNavigation = () => {
  const router = useRouter();
  const { setLoading } = useLoading();
  const pathname = usePathname();

  // Hide loading when pathname changes (page has loaded)
  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);

  const navigateWithLoading = (path: string, message: string = "Loading...") => {
    if (path !== pathname && path.startsWith('/')) {
      setLoading(true, message);
      router.push(path);
    } else {
      router.push(path);
    }
  };

  return { navigateWithLoading };
};

