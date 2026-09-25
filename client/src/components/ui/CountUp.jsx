import { useEffect, useRef, useState } from 'react';

function formatCount(current, original) {
  const text = String(original);
  if (/^0\d+$/.test(text)) return String(current).padStart(text.length, '0');
  return String(current);
}

export default function CountUp({ value }) {
  const target = Number(value);
  const numeric = Number.isFinite(target);
  const [display, setDisplay] = useState(numeric ? formatCount(0, value) : value);
  const ref = useRef(null);

  useEffect(() => {
    if (!numeric) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(formatCount(target, value));
      return undefined;
    }

    let frame = 0;
    let start = 0;
    const duration = 1400;

    function tick(now) {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(formatCount(Math.round(target * eased), value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.5 });

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [numeric, target, value]);

  return <span ref={ref}>{display}</span>;
}
