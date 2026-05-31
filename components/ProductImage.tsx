import Image, { ImageProps } from 'next/image';

interface ProductImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  src: string;
  alt: string;
  // A tiny 10px base64 placeholder for luxury porcelain aesthetics (e.g. warm off-white/beige)
  blurDataURL?: string; 
  containerClassName?: string;
}

// A sleek, neutral beige/off-white placeholder mapping to Siphora luxury aesthetic
const defaultBlur = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";

export default function ProductImage({
  src,
  alt,
  blurDataURL = defaultBlur,
  className = '',
  containerClassName = '',
  ...props
}: ProductImageProps) {
  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL={blurDataURL}
        className={`object-cover transition-opacity duration-300 ease-in-out ${className}`}
        {...props}
      />
    </div>
  );
}
