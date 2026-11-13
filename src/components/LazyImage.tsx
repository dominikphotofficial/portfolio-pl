import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  eager?: boolean;
  onClick?: () => void;
}

export function LazyImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  eager = false,
  onClick,
}: LazyImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(eager);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setFailed(false);
    setLoaded(eager);
  }, [src, eager]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [currentSrc]);

  if (failed) {
    return (
      <div className="dp-img-fallback" role="img" aria-label={alt}>
        <span>DP.PORTFOLIO</span>
        <span className="mt-1 opacity-75">{alt}</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onClick={onClick}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        } else {
          setFailed(true);
        }
      }}
      className={`${eager ? '' : 'dp-lazy'} ${loaded ? 'loaded' : ''} ${className}`.trim()}
    />
  );
}
