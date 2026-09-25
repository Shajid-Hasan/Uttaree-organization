import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';
import CountUp from '../ui/CountUp';
import heroVideo from '../../assets/Business Professionals and Corporate Stock Video Footage by FILMPAC.mp4';

export default function HeroSlider({ slides = [], stats = [] }) {
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();
  const count = slides.length;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const silence = () => {
      if (!video.muted) video.muted = true;
      video.defaultMuted = true;
      if (video.volume !== 0) video.volume = 0;
    };

    const clipSeconds = 30;

    silence();
    const play = () => {
      silence();
      video.play().catch(() => {});
    };
    const loopClip = () => {
      if (video.currentTime >= clipSeconds || video.ended) {
        video.currentTime = 0;
        play();
      }
    };

    play();
    video.addEventListener('loadeddata', play);
    video.addEventListener('timeupdate', loopClip);
    video.addEventListener('ended', loopClip);
    video.addEventListener('volumechange', silence);
    return () => {
      video.removeEventListener('loadeddata', play);
      video.removeEventListener('timeupdate', loopClip);
      video.removeEventListener('ended', loopClip);
      video.removeEventListener('volumechange', silence);
    };
  }, []);

  useEffect(() => {
    if (reduce || count < 2) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), 5000);
    return () => clearInterval(timer);
  }, [reduce, count]);

  if (!count) return null;
  const slide = slides[index];

  return (
    <>
      <section id="home" className="relative h-[calc(100svh-3rem)] min-h-[32rem] overflow-hidden text-white sm:h-[calc(100svh-3.5rem)] sm:min-h-[34rem] md:min-h-[36rem] xl:h-[calc(100svh-4rem)] xl:min-h-[40rem] 2xl:min-h-[44rem]">
        <div className="absolute inset-0 bg-[#101820]">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            defaultMuted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <Container padding="px-4 sm:px-6 md:px-8 xl:px-16 2xl:px-20" className="relative z-10 flex h-full items-center py-10 sm:py-12 md:py-16">
          <div className="max-w-xl sm:max-w-2xl xl:max-w-3xl">
            {slide.eyebrow && (
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-white/70" />
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white/80">{slide.eyebrow}</p>
              </div>
            )}
            <h1 className="font-display text-3xl font-medium leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl xl:text-6xl">{slide.title}</h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base">{slide.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={slide.ctaTo} variant="light">{slide.ctaLabel}</Button>
              <Button to="/about" variant="light">Learn more</Button>
            </div>
          </div>
        </Container>

      </section>

      {stats.length > 0 && (
        <div className="bg-white">
          <Container className="grid grid-cols-2 gap-x-4 gap-y-6 py-6 sm:gap-x-6 sm:py-8 md:grid-cols-4 md:gap-0 md:py-10 xl:py-12 2xl:py-14">
            {stats.map((item, index) => (
              <div key={item.label} className={index > 0 ? 'md:border-l md:border-sand md:pl-8' : 'md:pr-8'}>
                <p className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl"><CountUp value={item.value} /></p>
                <span className="mt-3 block h-px w-8 bg-primary" />
                <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted">{item.label}</p>
              </div>
            ))}
          </Container>
        </div>
      )}
    </>
  );
}
