export default function SectionHeading({ eyebrow, title, intro, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <div className="mb-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
          <div className="mt-3 h-1 w-16 bg-primary" />
        </div>
      )}
      {title && (
        <h2 className="font-display text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl 2xl:text-6xl">{title}</h2>
      )}
      {intro && <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base xl:text-lg">{intro}</p>}
    </div>
  );
}
