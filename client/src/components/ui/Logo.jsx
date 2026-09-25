import { useEffect, useState } from 'react';
import logoMark from '../../assets/image.png';

export default function Logo({ src = logoMark, alt = 'Uttaree', className = 'h-10 w-auto' }) {
  const [url, setUrl] = useState(src);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return;
      context.drawImage(image, 0, 0);
      const frame = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = frame.data;
      for (let index = 0; index < pixels.length; index += 4) {
        if (pixels[index] > 235 && pixels[index + 1] > 235 && pixels[index + 2] > 235) {
          pixels[index + 3] = 0;
        }
      }
      context.putImageData(frame, 0, 0);
      if (!cancelled) setUrl(canvas.toDataURL('image/png'));
    };
    return () => {
      cancelled = true;
    };
  }, [src]);

  return <img src={url} alt={alt} className={className} />;
}
