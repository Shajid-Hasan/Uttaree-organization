import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import MediaFrame from '../ui/MediaFrame';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import electronicsPhoto from '../../assets/Business Picture/modern-consumer-electronics-on-white-background.jpg';
import ricePhoto from '../../assets/Business Picture/farmer-holds-rice-hand_1150-6063.avif';
import artPhoto from '../../assets/Business Picture/images.jfif';

const venturePhotos = {
  'uttaree-electronics': electronicsPhoto,
  'uttaree-agro': ricePhoto,
  'uttaree-art-school': artPhoto,
};

export default function CompanyGrid({ site, projects }) {
  return (
    <section className="bg-[#f7f6f3] py-8 sm:py-10 md:py-12 xl:py-14 2xl:py-16">
      <Container>
        <Reveal>
          <div className="mb-3 flex items-center gap-4">
            <span className="h-px w-8 bg-ink/30" />
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted">{site.sections.companiesEyebrow}</p>
          </div>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl xl:text-5xl">
            {site.sections.companiesTitle}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted sm:text-base">{site.sections.companiesIntro}</p>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const photo = project.image || venturePhotos[project.slug];
            return (
              <Reveal key={project.slug} delay={index * 0.06}>
                <article className="flex h-full flex-col bg-white">
                  <Link to={`/companies/${project.slug}`} className="block overflow-hidden">
                    {photo ? (
                      <img src={photo} alt="" className="h-52 w-full object-cover transition duration-500 hover:scale-105 sm:h-56" />
                    ) : (
                      <MediaFrame src="" alt={project.name} label={project.name} className="h-52 sm:h-56" />
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col px-5 py-5 sm:px-6">
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-primary">{project.category}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{project.shortName || project.name}</h3>
                    <span className="mt-3 block h-px w-8 bg-primary" />
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted">{project.summary}</p>
                    <Button to={`/companies/${project.slug}`} className="mt-5 w-fit">Explore</Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
