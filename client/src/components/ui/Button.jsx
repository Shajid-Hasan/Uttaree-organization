import { Link } from 'react-router-dom';

const variants = {
  primary: 'border border-ink bg-transparent text-ink hover:border-primary hover:bg-primary hover:text-white',
  light: 'border border-white bg-transparent text-white hover:bg-white hover:text-ink',
  ghost: 'border border-white bg-transparent text-white hover:bg-white hover:text-ink',
  line: 'border border-ink bg-transparent text-ink hover:border-primary hover:bg-primary hover:text-white',
};

export default function Button({ to, href, children, variant = 'primary', className = '', ...props }) {
  const classes = `inline-flex items-center justify-center px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors duration-200 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
