import { Link, useParams } from 'react-router-dom';
import { useContent } from '../lib/content';
import { usePageMeta } from '../lib/page';
import Container from '../components/ui/Container';
import MediaFrame from '../components/ui/MediaFrame';
import InquiryForm from '../components/forms/InquiryForm';
import NotFound from './NotFound';
import logoMark from '../assets/image.png';
import Logo from '../components/ui/Logo';

export default function Landing() {
  const { slug } = useParams();
  const { site, landings } = useContent();
  const landing = landings.find((item) => item.slug === slug);

  usePageMeta({
    title: landing?.title || 'Uttaree',
    description: landing?.text || site.seo.description,
    robots: 'noindex,nofollow',
  });

  if (!landing) return <NotFound />;

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-gray-200 bg-white">
        <Container padding="px-4 sm:px-6 md:px-8 xl:px-16 2xl:px-20" className="flex h-12 items-center justify-between sm:h-14 xl:h-16">
          <Link to="/" className="inline-flex items-center">
            <Logo src={site.logo || logoMark} alt={site.name} className="h-8 w-auto sm:h-9 md:h-10 xl:h-11 2xl:h-12" />
          </Link>
          <a href={`tel:${site.contact.phoneHref}`} className="text-xs font-semibold text-gray-900 sm:text-sm xl:text-base">{site.contact.phone}</a>
        </Container>
      </header>
      <main>
        <section className="grid lg:grid-cols-2">
          <MediaFrame src={landing.image} alt="" label={landing.eyebrow} className="min-h-64 lg:min-h-screen" />
          <Container className="flex flex-col justify-center py-8 sm:py-10 md:py-12 xl:py-14 2xl:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{landing.eyebrow}</p>
            <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl xl:text-5xl">{landing.title}</h1>
            <p className="mt-4 text-sm text-muted sm:text-base xl:text-lg">{landing.text}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {landing.points.map((point) => (
                <li key={point} className="border-l-2 border-gold pl-3">{point}</li>
              ))}
            </ul>
            <div className="mt-8 border border-sand bg-white p-4 sm:p-6 xl:p-8">
              <InquiryForm
                kind="landing"
                source={landing.slug}
                projectSlug={landing.projectSlug}
                submitLabel={landing.ctaLabel}
              />
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
