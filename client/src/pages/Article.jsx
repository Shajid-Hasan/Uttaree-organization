import { Link, useParams } from 'react-router-dom';
import { formatDate, useContent } from '../lib/content';
import { usePageMeta } from '../lib/page';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import NotFound from './NotFound';

export default function Article() {
  const { slug } = useParams();
  const { articles, projects } = useContent();
  const article = articles.find((item) => item.slug === slug);
  const project = projects.find((item) => item.slug === article?.projectSlug);

  usePageMeta({
    title: article?.title || 'News',
    description: article?.excerpt || '',
  });

  if (!article) return <NotFound />;

  return (
    <article className="bg-white">
      <Container className="max-w-3xl py-16 sm:py-20 xl:max-w-4xl xl:py-28">
        <Button to="/news" className="w-fit">Back</Button>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">{formatDate(article.date)}</p>
          {project && (
            <Link to={`/companies/${project.slug}`} className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-primary">
              {project.shortName || project.name}
            </Link>
          )}
        </div>
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl xl:text-5xl">{article.title}</h1>
        <span className="mt-6 block h-px w-10 bg-primary" />
        <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">
          {article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        {project && (
          <Button to={`/companies/${project.slug}`} className="mt-10">
            {project.shortName || project.name}
          </Button>
        )}
      </Container>
    </article>
  );
}
