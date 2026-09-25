import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import logoMark from '../../assets/image.png';

export default function Footer({ site, projects }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sand bg-[#f7f6f3] text-ink">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 sm:py-16 xl:grid-cols-4 xl:py-20">
        <div>
          <Logo src={site.logo || logoMark} alt={site.name} className="h-12 w-auto sm:h-14" />
          <p className="mt-5 max-w-xs text-sm leading-7 text-muted">{site.summary}</p>
          {site.social?.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    aria-label={item.label}
                    title={item.label}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center border border-ink text-ink transition-colors hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <SocialIcon name={item.label} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted">Companies</p>
          <span className="mt-3 block h-px w-8 bg-primary" />
          <ul className="mt-4 space-y-2 text-sm">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link to={`/companies/${project.slug}`} className="text-ink hover:text-primary">{project.shortName || project.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted">Quick links</p>
          <span className="mt-3 block h-px w-8 bg-primary" />
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="text-ink hover:text-primary">About Us</Link></li>
            <li><Link to="/companies" className="text-ink hover:text-primary">Our Companies</Link></li>
            <li><Link to="/news" className="text-ink hover:text-primary">News</Link></li>
            <li><Link to="/contact" className="text-ink hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted">Contact us</p>
          <span className="mt-3 block h-px w-8 bg-primary" />
          <ul className="mt-4 space-y-3 break-words text-sm">
            <li>
              <a href={`tel:${site.contact.phoneHref}`} className="text-ink hover:text-primary">{site.contact.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="text-ink hover:text-primary">{site.contact.email}</a>
            </li>
            <li>
              <a href={site.contact.mapUrl} className="text-ink hover:text-primary" target="_blank" rel="noreferrer">{site.contact.address}</a>
            </li>
            {site.contact.hours && <li className="text-muted">{site.contact.hours}</li>}
          </ul>
        </div>
      </Container>
      <div className="border-t border-sand">
        <Container className="py-5 text-center text-[0.68rem] uppercase tracking-[0.16em] text-muted">
          © {year} {site.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}

function SocialIcon({ name }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };
  if (name === 'Facebook') {
    return <svg {...common}><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" /></svg>;
  }
  if (name === 'Instagram') {
    return <svg {...common}><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.2 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" /></svg>;
  }
  if (name === 'LinkedIn') {
    return <svg {...common}><path d="M6.5 9H3.7v11h2.8zm.2-3.5A1.7 1.7 0 1 1 5 3.8a1.7 1.7 0 0 1 1.7 1.7zM20.3 13.4c0-3-1.6-4.4-3.7-4.4a3.2 3.2 0 0 0-2.9 1.6h-.1V9H11v11h2.8v-5.5c0-1.5.3-2.9 2.1-2.9s1.8 1.6 1.8 3V20h2.6z" /></svg>;
  }
  if (name === 'YouTube') {
    return <svg {...common}><path d="M23 12.2s0-3.2-.4-4.6a3 3 0 0 0-2.1-2.1C18.9 5 12 5 12 5s-6.9 0-8.5.5a3 3 0 0 0-2.1 2.1C1 9 1 12.2 1 12.2s0 3.2.4 4.6a3 3 0 0 0 2.1 2.1C5.1 19.4 12 19.4 12 19.4s6.9 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3z" /></svg>;
  }
  if (name === 'X') {
    return <svg {...common}><path d="M17.6 3H20.4l-6.1 7 7.2 11h-5.5l-4.3-6.2L6.7 21H3.9l6.6-7.6L3.6 3h5.6l3.9 5.6zm-1 16.2h1.5L7.5 4.7H5.9z" /></svg>;
  }
  if (name === 'TikTok') {
    return <svg {...common}><path d="M14 3h2.2a5.2 5.2 0 0 0 3.6 3.4v2.3a7.4 7.4 0 0 1-3.6-1v6.6a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.5a3.2 3.2 0 1 0 2.3 3.1V3z" /></svg>;
  }
  if (name === 'WhatsApp') {
    return <svg {...common}><path d="M12 3a8.7 8.7 0 0 0-7.5 13.1L3.5 21l5-1.3A8.7 8.7 0 1 0 12 3zm5 12.3c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.2-3-.6-2.5-1-4.1-3.6-4.2-3.8-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6.5-.4.8-.4h.6c.2 0 .4 0 .6.5.2.6.8 2 .8 2.1.1.2 0 .4-.1.6l-.4.5c-.1.2-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l2 .9c.2.1.4.2.5.3.1.3 0 .8-.2 1.1z" /></svg>;
  }
  return null;
}
