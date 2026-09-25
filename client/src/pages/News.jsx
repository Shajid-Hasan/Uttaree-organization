import { Link } from 'react-router-dom';
import { formatDate, useContent } from '../lib/content';
import { usePageMeta } from '../lib/page';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

export default function News() {
  const { site, projects, articles } = useContent();
  const news = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  usePageMeta({ title: 'News', description: site.sections.newsIntro });

  return (
    <section className="bg-white py-16 sm:py-20 xl:py-28">
      <Container>
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" />
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted">{site.sections.newsEyebrow}</p>
        </div>
        <h1 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl xl:text-5xl">
          {site.sections.newsTitle}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">{site.sections.newsIntro}</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {news.map((article) => {
            const project = projects.find((item) => item.slug === article.projectSlug);
            return (
              <article key={article.slug} className="flex flex-col bg-[#f7f6f3] px-6 py-8 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                  {project ? (
                    <Link to={`/companies/${project.slug}`} className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-primary">
                      {project.shortName || project.name}
                    </Link>
                  ) : <span />}
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">{formatDate(article.date)}</p>
                </div>
                <h2 className="mt-8 font-display text-2xl font-medium leading-snug tracking-tight">
                  <Link to={`/news/${article.slug}`} className="hover:text-primary">{article.title}</Link>
                </h2>
                <p className="mt-4 flex-1 text-sm leading-7 text-muted">{article.excerpt}</p>
                <Button to={`/news/${article.slug}`} className="mt-8 w-fit">Read</Button>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
