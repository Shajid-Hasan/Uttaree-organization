import { useSearchParams } from 'react-router-dom';
import { useContent } from '../lib/content';
import { usePageMeta } from '../lib/page';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import InquiryForm from '../components/forms/InquiryForm';

export default function Contact() {
  const { site, projects } = useContent();
  const [params] = useSearchParams();
  const projectSlug = params.get('project') || '';
  const project = projects.find((item) => item.slug === projectSlug);

  usePageMeta({
    title: 'Contact',
    description: `Call ${site.contact.phone} or write to the Uttaree office in ${site.location}.`,
  });

  const details = [
    { label: 'Phone', value: site.contact.phone, href: `tel:${site.contact.phoneHref}` },
    { label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
    { label: 'Office', value: site.contact.address, href: site.contact.mapUrl, external: true },
  ];

  return (
    <section className="bg-[#f7f6f3] py-8 sm:py-10 md:py-12 xl:py-14 2xl:py-16">
      <Container className="grid items-start gap-8 md:gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-14 2xl:gap-16">
        <div>
          {project && <Button to={`/companies/${project.slug}`} className="mb-6 w-fit">Back</Button>}
          <div className="mb-3 flex items-center gap-4">
            <span className="h-px w-8 bg-ink/30" />
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted">{site.sections.contactEyebrow}</p>
          </div>
          <h1 className="max-w-md font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl xl:text-5xl">
            {site.sections.contactTitle}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
            Messages reach the office. Personal numbers of members are not listed on this site.
          </p>
          {project && (
            <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-primary">
              About {project.shortName || project.name}
            </p>
          )}
          <dl className="mt-8 max-w-md border-t border-sand">
            {details.map((item) => (
              <div key={item.label} className="grid gap-1 border-b border-sand py-4 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-6">
                <dt className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">{item.label}</dt>
                <dd className="text-sm text-ink sm:text-base">
                  <a
                    href={item.href}
                    className="transition-colors hover:text-primary"
                    {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {item.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="bg-white px-5 py-6 sm:px-8 sm:py-8">
          <InquiryForm kind="contact" source="contact" projectSlug={projectSlug} />
        </div>
      </Container>
    </section>
  );
}
