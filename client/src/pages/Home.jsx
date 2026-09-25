import { Link } from 'react-router-dom';
import { formatDate, useContent } from '../lib/content';
import { usePageMeta } from '../lib/page';
import Container from '../components/ui/Container';
import HeroSlider from '../components/home/HeroSlider';
import CompanyGrid from '../components/home/CompanyGrid';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import electronicsPhoto from '../assets/Business Picture/modern-consumer-electronics-on-white-background.jpg';
import ricePhoto from '../assets/Business Picture/farmer-holds-rice-hand_1150-6063.avif';
import artPhoto from '../assets/Business Picture/images.jfif';
import producePhoto from '../assets/Business Picture/Plastic-Vagetable-Caret.jpeg';

const whoPictures = [
  { src: electronicsPhoto, alt: 'Home appliances' },
  { src: ricePhoto, alt: 'Rice harvest' },
  { src: artPhoto, alt: 'Art class' },
  { src: producePhoto, alt: 'Produce crate' },
];

export default function Home() {
  const { site, projects, articles } = useContent();
  const news = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  usePageMeta({ title: site.seo.title, description: site.seo.description });

  const stats = [
    { value: site.ownership.foundingMembers, label: 'Founding members' },
    { value: site.ownership.shareholders, label: 'Shareholders' },
    { value: projects.length, label: 'Ventures' },
    { value: site.founded, label: 'Established' },
  ];

  return (
    <>
      <HeroSlider slides={site.hero} stats={stats} />

      <section className="bg-white py-16 sm:py-20 xl:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2 xl:gap-16">
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-8 bg-ink/30" />
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted">{site.sections.whoEyebrow}</p>
            </div>
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl xl:text-5xl">
              {site.sections.whoTitle}
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">
              {site.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Button to="/about" className="mt-8">Discover more</Button>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {whoPictures.map((picture) => (
                <div key={picture.alt} className="overflow-hidden bg-[#f7f6f3]">
                  <img src={picture.src} alt={picture.alt} className="h-36 w-full object-cover transition duration-500 ease-out hover:scale-105 sm:h-44 md:h-52 xl:h-56" />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <CompanyGrid site={site} projects={projects} />

      {site.clients?.length > 0 && (
        <section className="border-y border-sand bg-paper py-14">
          <Container>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Clients</p>
            <ul className="mt-6 flex flex-wrap items-center gap-8">
              {site.clients.map((client) => (
                <li key={client.name} className="text-sm font-semibold text-ink/80">
                  {client.logo ? <img src={client.logo} alt={client.name} className="h-10 w-auto" /> : client.name}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-white py-10 sm:py-12 xl:py-14">
        <Container>
          <Reveal>
            <div className="mb-3 flex items-center gap-4">
              <span className="h-px w-8 bg-ink/30" />
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted">{site.sections.newsEyebrow}</p>
            </div>
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl xl:text-5xl">
              {site.sections.newsTitle}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted sm:text-base">{site.sections.newsIntro}</p>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {news.map((article) => {
              const project = projects.find((item) => item.slug === article.projectSlug);
              return (
                <article key={article.slug} className="flex flex-col bg-[#f7f6f3] px-6 py-6 sm:px-7">
                  <div className="flex items-center justify-between gap-4">
                    {project ? (
                      <Link to={`/companies/${project.slug}`} className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-primary">
                        {project.shortName || project.name}
                      </Link>
                    ) : <span />}
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">{formatDate(article.date)}</p>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl">
                    <Link to={`/news/${article.slug}`} className="hover:text-primary">{article.title}</Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{article.excerpt}</p>
                  <Button to={`/news/${article.slug}`} className="mt-6 w-fit">Read</Button>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
