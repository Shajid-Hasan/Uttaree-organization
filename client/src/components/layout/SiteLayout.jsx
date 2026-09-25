import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useContent } from '../../lib/content';
import Header from './Header';
import Footer from './Footer';

export default function SiteLayout() {
  const { site, projects } = useContent();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header site={site} projects={projects} />
      <main>
        <Outlet />
      </main>
      <Footer site={site} projects={projects} />
    </div>
  );
}
