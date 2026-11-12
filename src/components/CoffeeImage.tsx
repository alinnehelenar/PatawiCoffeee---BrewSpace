import React, { useState } from 'react';

interface CoffeeImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  roastColor?: string;
  regionTag?: string;
}

export const CoffeeImage: React.FC<CoffeeImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative w-full h-full overflow-hidden bg-[#EFE9DF]',
  regionTag,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // High-fidelity artisan specialty coffee bag illustration
  const renderFallback = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#EAE2D5] to-[#DFD5C6] p-2 text-center select-none relative">
      {/* Degassing valve illustration */}
      <div className="w-3.5 h-3.5 rounded-full border border-[#B5A592] bg-[#C5B5A0] flex items-center justify-center mb-1 shadow-inner">
        <div className="w-1.5 h-1.5 rounded-full bg-[#7D6B58]" />
      </div>

      {/* Coffee bag pouch artwork */}
      <svg
        className="w-16 h-16 sm:w-20 sm:h-20 text-[#3D2C1F] drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pouch body */}
        <path
          d="M16 15H48L44 56C44 58 42 59.5 40 59.5H24C22 59.5 20 58 20 56L16 15Z"
          fill="#C4B097"
          stroke="#38281A"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Bag shading */}
        <path
          d="M20 16L23 57H26L23 16H20Z"
          fill="#B5A086"
          opacity="0.6"
        />
        {/* Top zip seal */}
        <path
          d="M14 15H50L48 8.5H16L14 15Z"
          fill="#A89278"
          stroke="#38281A"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <line x1="16" y1="12" x2="48" y2="12" stroke="#38281A" strokeWidth="1" strokeDasharray="2 2" />

        {/* White label */}
        <rect x="22" y="24" width="20" height="25" rx="2" fill="#FFFFFF" stroke="#38281A" strokeWidth="1.2" />
        <rect x="25" y="27" width="14" height="2" fill="#38281A" rx="0.5" />
        <rect x="25" y="31" width="10" height="1.5" fill="#8C6239" rx="0.5" />
        <rect x="25" y="34" width="14" height="1" fill="#D97706" rx="0.5" />

        {/* Roasted coffee bean stamp */}
        <ellipse cx="32" cy="41" rx="4" ry="2.6" transform="rotate(-30 32 41)" fill="#38281A" />
        <path d="M30 39.5 Q32 41 34 42.5" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
      </svg>

      {/* Origin / Region Stamp */}
      <span className="mt-1 text-[8px] uppercase tracking-wider font-extrabold text-[#5C4533] px-2 py-0.5 rounded-full bg-[#D5C6B3]/60 border border-[#B5A592]/50 line-clamp-1 max-w-[90%]">
        {regionTag || 'PATAWI ROAST'}
      </span>
    </div>
  );

  return (
    <div className={containerClassName}>
      {src && !hasError ? (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 z-0">
              {renderFallback()}
            </div>
          )}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`${className} transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      ) : (
        renderFallback()
      )}
    </div>
  );
};
