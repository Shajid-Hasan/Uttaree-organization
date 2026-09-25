import { useContent } from '../lib/content';
import { usePageMeta } from '../lib/page';
import CompanyGrid from '../components/home/CompanyGrid';

export default function Companies() {
  const { site, projects } = useContent();
  usePageMeta({
    title: 'Our Companies',
    description: site.sections.companiesIntro,
  });

  return (
    <CompanyGrid site={site} projects={projects} />
  );
}
