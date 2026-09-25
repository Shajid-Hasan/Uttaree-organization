import { Link, useParams } from 'react-router-dom';
import { formatDate, useContent } from '../lib/content';
import { usePageMeta } from '../lib/page';
import Container from '../components/ui/Container';
import CommitteeList from '../components/company/CommitteeList';
import Button from '../components/ui/Button';
import NotFound from './NotFound';
import electronicsPhoto from '../assets/Business Picture/modern-consumer-electronics-on-white-background.jpg';
import ricePhoto from '../assets/Business Picture/farmer-holds-rice-hand_1150-6063.avif';
import artPhoto from '../assets/Business Picture/images.jfif';

const venturePhotos = {
  'uttaree-electronics': electronicsPhoto,
  'uttaree-agro': ricePhoto,
  'uttaree-art-school': artPhoto,
};

export default function Company() {
  const { slug } = useParams();
  const { site, projects, articles } = useContent();
  const project = projects.find((item) => item.slug === slug);
  const related = articles.filter((item) => item.projectSlug === slug);

  usePageMeta({
    title: project?.name || 'Company',
    description: project?.summary || site.seo.description,
  });

  if (!project) return <NotFound />;

  const photo = project.image || venturePhotos[project.slug];
  const facts = [
    { label: 'Status', value: project.status },
    { label: 'Started', value: project.established },
    { label: 'Location', value: project.location },
    ...(project.facts || []),
  ];

  return (
    <article className="bg-white text-ink">
      <section className="bg-[#f7f6f3]">
        <Container className="grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] xl:py-14">
          <div>
            <Button to="/companies" className="w-fit">Back</Button>
            <div className="mb-3 mt-6 flex items-center gap-4">
              <span className="h-px w-8 bg-ink/30" />
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted">{project.category}</p>
            </div>
            <h1 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl xl:text-5xl">{project.name}</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">{project.summary}</p>
          </div>
          {photo && <img src={photo} alt="" className="h-56 w-full object-cover sm:h-72 xl:h-80" />}
        </Container>
      </section>

      <Container className="grid items-start gap-10 py-10 sm:py-12 lg:grid-cols-[1.45fr_0.55fr] xl:gap-16 xl:py-14">
        <div>
          <div className="max-w-2xl space-y-4 text-sm leading-7 text-muted sm:text-base">
            {project.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight sm:text-3xl">What it offers</h2>
          <span className="mt-3 block h-px w-8 bg-primary" />
          <ul className="mt-4 grid border-t border-sand sm:grid-cols-2">
            {project.services.map((service) => (
              <li key={service} className="border-b border-sand py-3 text-sm text-ink">{service}</li>
            ))}
          </ul>

          {project.quote && (
            <blockquote className="mt-10 max-w-xl">
              <span className="block h-px w-8 bg-primary" />
              <p className="mt-4 font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl">{project.quote}</p>
            </blockquote>
          )}

          <div className="mt-12">
            <CommitteeList project={project} note={site.committeeNote} />
          </div>
        </div>

        <aside className="bg-[#f7f6f3] px-6 py-6">
          <dl className="border-t border-sand">
            {facts.map((fact) => (
              <div key={fact.label} className="border-b border-sand py-3">
                <dt className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">{fact.label}</dt>
                <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <Button to={`/contact?project=${project.slug}`} className="mt-6 w-fit">Contact the office</Button>
        </aside>
      </Container>

      {related.length > 0 && (
        <section className="border-t border-sand bg-white">
          <Container className="py-10 sm:py-12 xl:py-14">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-8 bg-ink/30" />
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted">News</p>
            </div>
            <ul className="border-t border-sand">
              {related.map((article) => (
                <li key={article.slug} className="grid gap-2 border-b border-sand py-5 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-8">
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">{formatDate(article.date)}</p>
                  <Link to={`/news/${article.slug}`} className="font-display text-xl font-medium leading-snug tracking-tight hover:text-primary">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </article>
  );
}
