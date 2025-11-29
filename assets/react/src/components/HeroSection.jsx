import React from 'react';
import { Play, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HeroSection({ hero = {} }) {
  const {
    techStack = 'Using PHP 8.2+, Yii3, Inertia.js 2.0 and Tailwind CSS 4+',
    title = 'Modern Yii3',
    titleHighlight = 'Starter Kit',
    subtitle = 'Ship faster production-ready applications 10x faster with starter kit powered by Yii3, Inertia.js, and React.',
    ctaPrimary = 'View Demo',
    ctaSecondary = 'Github',
    trustedBy = 'Trusted by developers worldwide',
    logos = []
  } = hero;

  return (
    <section className="container mx-auto space-y-8 py-20 md:py-32 lg:py-40 px-4 max-w-7xl">
      <div className="flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary" className="mb-4">
          {techStack}
        </Badge>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          {title}{' '}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl md:text-xl">
          {subtitle}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-2">
          <Button size="lg" className="gap-2">
            <Play className="h-4 w-4" />
            {ctaPrimary}
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Github className="h-4 w-4" />
            {ctaSecondary}
          </Button>
        </div>
      </div>
      {trustedBy && (
        <div className="flex flex-col items-center gap-4 pt-8">
          <p className="text-sm text-muted-foreground">{trustedBy}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {logos.length > 0 ? (
              logos.map((logo, index) => (
                <div key={index} className="text-xl font-semibold text-muted-foreground">
                  {logo}
                </div>
              ))
            ) : (
              <>
                <div className="text-xl font-semibold">Yii</div>
                <div className="text-xl font-semibold">Inertia</div>
                <div className="text-xl font-semibold">React</div>
                <div className="text-xl font-semibold">Vite</div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

