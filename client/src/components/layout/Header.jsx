import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import logoMark from '../../assets/image.png';

export default function Header({ site, projects }) {
  const [open, setOpen] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setCompaniesOpen(false);
  }, [location.pathname]);

  function close() {
    setOpen(false);
    setCompaniesOpen(false);
  }

  const linkTone = 'group relative whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted hover:text-ink xl:text-xs';
  const barPad = 'px-4 sm:px-6 md:px-8 xl:px-16 2xl:px-20';

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-white/95 backdrop-blur-sm">
      <Container padding={barPad} className="flex h-12 items-center justify-between gap-3 sm:h-14 sm:gap-4 xl:h-16">
        <Link to="/" onClick={close} className="flex shrink-0 items-center">
          <Logo src={site.logo || logoMark} alt={site.name} className="h-8 w-auto sm:h-9 md:h-10 xl:h-11 2xl:h-12" />
        </Link>

        <nav className="hidden min-w-0 items-center gap-3 md:flex lg:gap-5 xl:gap-8 2xl:gap-10" aria-label="Primary">
          {site.nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setCompaniesOpen(true)}
                onMouseLeave={() => setCompaniesOpen(false)}
              >
                <button type="button" className={linkTone} aria-expanded={companiesOpen} onClick={() => setCompaniesOpen((value) => !value)}>
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
                </button>
                {companiesOpen && (
                  <div className="absolute left-0 top-full z-20 w-56 pt-4">
                    <div className="border border-sand bg-white py-2">
                      {projects.map((project) => (
                        <Link key={project.slug} to={`/companies/${project.slug}`} className="block px-5 py-2.5 text-sm text-muted transition-colors hover:bg-[#f7f6f3] hover:text-ink" onClick={() => setCompaniesOpen(false)}>
                          {project.shortName || project.name}
                        </Link>
                      ))}
                      <Link to="/companies" className="mt-1 block border-t border-sand px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-[#f7f6f3]" onClick={() => setCompaniesOpen(false)}>
                        All companies
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `group relative whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.18em] xl:text-xs ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden border border-ink px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-primary hover:bg-primary hover:text-white lg:inline-flex"
          >
            Get in touch →
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="block h-0.5 w-6 bg-gray-900" />
            <span className="block h-0.5 w-6 bg-gray-900" />
            <span className="block h-0.5 w-6 bg-gray-900" />
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-sand bg-white md:hidden">
          <Container padding={barPad} className="flex flex-col py-2">
            {site.nav.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-sand py-2">
                  <p className="px-1 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">{item.label}</p>
                  {projects.map((project) => (
                    <Link key={project.slug} to={`/companies/${project.slug}`} onClick={close} className="block px-1 py-2 text-sm text-ink">
                      {project.shortName || project.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={close} className="border-b border-sand px-1 py-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink">
                  {item.label}
                </NavLink>
              )
            )}
            <Link to="/contact" onClick={close} className="mt-4 inline-flex w-fit border border-ink px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink">
              Get in touch →
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
