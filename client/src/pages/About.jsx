import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useContent } from '../lib/content';
import { usePageMeta } from '../lib/page';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import CountUp from '../components/ui/CountUp';
import electronicsPhoto from '../assets/Business Picture/modern-consumer-electronics-on-white-background.jpg';
import ricePhoto from '../assets/Business Picture/farmer-holds-rice-hand_1150-6063.avif';
import artPhoto from '../assets/Business Picture/images.jfif';

const venturePhotos = {
  'uttaree-electronics': electronicsPhoto,
  'uttaree-agro': ricePhoto,
  'uttaree-art-school': artPhoto,
};

export default function About() {
  const reduce = useReducedMotion();
  const { site, projects } = useContent();
  const page = site.aboutPage || {};
  const notes = page.statNotes || {};

  usePageMeta({
    title: 'About Us',
    description: site.summary,
  });

  const stats = [
    { value: site.ownership.foundingMembers, label: 'Founding members', text: notes.foundingMembers },
    { value: site.ownership.shareholders, label: 'Shareholders', text: notes.shareholders },
    { value: String(projects.length).padStart(2, '0'), label: 'Ventures', text: notes.ventures },
    { value: site.founded, label: 'Established', text: notes.established },
  ];

  return (
    <article className="bg-white text-ink">
      <section className="relative overflow-hidden pt-8 pb-6 sm:pt-10 sm:pb-8 md:pt-12 xl:pt-14 xl:pb-8 2xl:pt-16">
        <motion.p
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 right-4 font-display text-[7rem] font-bold leading-none text-primary/10 sm:right-10 sm:text-[10rem] xl:text-[14rem]"
          animate={reduce ? undefined : { y: [0, -18, 0] }}
          transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CountUp value={site.founded} />
        </motion.p>
        <Container className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{site.location.split(',')[0]} · {site.founded}</span>
          </div>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl 2xl:text-7xl">
            {page.headlineLead}
            <span className="mt-1 block text-primary">{page.headlineAccent}</span>
          </h1>
          <p className="mt-5 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-relaxed text-muted sm:text-base xl:text-lg">{page.lead}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[0.14em] sm:mt-12">
            <a href="#mission" className="hover:text-primary">Mission →</a>
            <a href="#vision" className="hover:text-primary">Vision →</a>
            <a href="#ownership" className="hover:text-primary">Ownership →</a>
            <a href="#ventures" className="hover:text-primary">Ventures →</a>
            <a href="#committees" className="hover:text-primary">Committees →</a>
          </div>
        </Container>
      </section>

      <section id="mission" className="scroll-mt-20 bg-[#f7f6f3]">
        <Container className="pt-8 pb-8 sm:pb-10 md:pt-10 md:pb-12 xl:pb-14 2xl:pb-16">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-8 bg-ink/30" />
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted">Purpose</p>
          </div>
          <div className="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-5">
            <article className="flex flex-col bg-white px-6 py-6 sm:px-8 sm:py-8">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{site.mission.title}</h2>
              <span className="mt-3 block h-px w-8 bg-primary" />
              <p className="mt-4 max-w-prose text-sm leading-7 text-muted sm:text-base">{site.mission.text}</p>
            </article>
            <article id="vision" className="scroll-mt-20 flex flex-col bg-white px-6 py-6 sm:px-8 sm:py-8">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{site.vision.title}</h2>
              <span className="mt-3 block h-px w-8 bg-primary" />
              <p className="mt-4 max-w-prose text-sm leading-7 text-muted sm:text-base">{site.vision.text}</p>
            </article>
          </div>
        </Container>
      </section>

      <section id="ownership" className="scroll-mt-20 bg-white">
        <Container className="grid grid-cols-2 gap-x-6 gap-y-8 py-8 sm:gap-x-8 sm:py-10 md:py-12 lg:grid-cols-4 lg:gap-0 lg:py-12 xl:py-14 2xl:py-16">
          {stats.map((item, index) => (
            <div key={item.label} className={index > 0 ? 'lg:border-l lg:border-sand lg:pl-8' : 'lg:pr-8'}>
              <p className="font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl"><CountUp value={item.value} /></p>
              <span className="mt-3 block h-px w-8 bg-primary" />
              <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted">{item.label}</p>
              {item.text && <p className="mt-2 max-w-[16rem] text-sm leading-6 text-muted">{item.text}</p>}
            </div>
          ))}
        </Container>
      </section>

      <section className="py-8 sm:py-10 md:py-12 xl:py-14 2xl:py-16">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{page.cycleEyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl">{page.cycleTitle}</h2>
            </div>
            <Button to="/companies" className="shrink-0">{page.cycleLink}</Button>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{page.cycleIntro || site.committeeNote}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {(page.steps || []).map((step) => (
              <article key={step.number} className="border border-sand p-4 sm:p-5">
                <p className="text-xs font-semibold text-primary">{step.number}</p>
                <h3 className="mt-2 font-display text-xl leading-snug">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f7f6f3] text-ink">
        <Container className="flex flex-col gap-6 py-8 sm:py-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{page.mandateTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{site.ownership.statement}</p>
          </div>
          <Button to="/contact" className="shrink-0">{page.mandateLink}</Button>
        </Container>
      </section>

      <section id="ventures" className="scroll-mt-20 py-8 sm:py-10 md:py-12 xl:py-14 2xl:py-16">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{page.venturesEyebrow}</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl">{page.venturesTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.slug} to={`/companies/${project.slug}`} className="group block overflow-hidden border border-sand bg-white">
                <div className="overflow-hidden">
                  <img
                    src={venturePhotos[project.slug]}
                    alt=""
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{project.category}</p>
                  <h3 className="mt-2 font-display text-2xl">{project.shortName || project.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {project.location} · {project.established}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="committees" className="scroll-mt-20 border-t border-sand bg-paper py-8 sm:py-10 md:py-12 xl:py-14 2xl:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{page.committeeEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl">{page.committeeTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{site.committeeNote}</p>
          </div>
          <div className="border border-sand bg-white p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{page.committeeCard}</p>
            <ul className="mt-5 divide-y divide-sand">
              {projects.map((project) => {
                const current = (project.committees || []).find((item) => item.current);
                return (
                  <li key={project.slug} className="py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-semibold">{project.shortName || project.name}</p>
                      <p className="text-sm text-muted">{current?.year}</p>
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-muted">
                      {current?.director && <p>Project director · {current.director}</p>}
                      {current?.assistantDirector && <p>Assistant director · {current.assistantDirector}</p>}
                      {!current?.director && !current?.assistantDirector && <p>Names are added when they are confirmed.</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-sand bg-white">
        <Container className="grid items-end gap-6 py-8 sm:gap-8 sm:py-10 md:py-12 lg:grid-cols-[1.4fr_auto] xl:py-14 2xl:py-16">
          <div>
            <div className="mb-3 flex items-center gap-4">
              <span className="h-px w-8 bg-ink/30" />
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted">{page.closeEyebrow}</p>
            </div>
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">{page.closeTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">{page.closeText}</p>
          </div>
          <div>
            <Button to="/contact">{page.contactLink}</Button>
            <p className="mt-3 text-[0.68rem] uppercase tracking-[0.16em] text-muted">{site.contact.address}</p>
          </div>
        </Container>
      </section>
    </article>
  );
}
