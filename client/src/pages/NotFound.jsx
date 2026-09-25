import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { usePageMeta } from '../lib/page';

export default function NotFound() {
  usePageMeta({ title: 'Page not found', robots: 'noindex,nofollow' });

  return (
    <Container className="py-10 sm:py-12 md:py-14 xl:py-16 2xl:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">404</p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl xl:text-5xl">This page is not on the site.</h1>
      <Button to="/" className="mt-6 w-fit">Back</Button>
    </Container>
  );
}
