import { useState } from 'react';

export default function MediaFrame({ src, alt, label, className = '' }) {
  const [failed, setFailed] = useState(!src);

  if (!src || failed) {
    return (
      <div className={`relative overflow-hidden bg-primary text-paper ${className}`} role="img" aria-label={alt || label || 'Image placeholder'}>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(244,241,235,0.28), transparent 42%), radial-gradient(circle at 80% 70%, rgba(154,123,79,0.45), transparent 40%)',
          }}
        />
        <div className="relative flex h-full min-h-full items-end p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Photo</p>
            <p className="mt-2 font-display text-xl sm:text-2xl">{label || 'Uttaree'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      className={`h-full w-full object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
