export default function Container({ children, className = '', padding = 'px-4 sm:px-6 md:px-8 xl:px-16 2xl:px-20' }) {
  return <div className={`mx-auto w-full min-w-0 ${padding} ${className}`}>{children}</div>;
}
