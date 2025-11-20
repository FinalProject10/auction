/**
 * Image helper component for external images that may fail
 * Automatically adds unoptimized prop and error handling
 */
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export const SafeImage = ({ src, fallbackSrc = '/placeholder-car.png', ...props }: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Check if it's an external autobid.modeltheme.com image
  const isExternalAutobid = src.includes('autobid.modeltheme.com');

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : imgSrc}
      unoptimized={isExternalAutobid || props.unoptimized}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
};

