import { usePage } from '@inertiajs/react';
import { ArrowDown, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HeroSection({ hero = {} }) {
  const { repositoryUrl } = usePage().props;
  const {
    techStack = '',
    title = '',
    titleHighlight = '',
    subtitle = '',
    ctaPrimary = 'Get Started',
    ctaSecondary = 'GitHub',
    builtWith = '',
    logos = [],
  } = hero;

  return (
    <section className="container mx-auto space-y-8 py-20 md:py-32 lg:py-40 px-4 max-w-7xl">
      <div className="flex flex-col items-center gap-6 text-center">
        {techStack && (
          <Badge variant="secondary" className="mb-4">
            {techStack}
          </Badge>
        )}
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          {title}{' '}
          <span className="bg-linear-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl md:text-xl">
          {subtitle}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-2">
          <Button size="lg" className="gap-2" asChild>
            <a href="#get-started">
              <ArrowDown className="h-4 w-4" />
              {ctaPrimary}
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              {ctaSecondary}
            </a>
          </Button>
        </div>
      </div>
      {logos.length > 0 && (
        <div className="flex flex-col items-center gap-4 pt-8">
          {builtWith && <p className="text-sm text-muted-foreground">{builtWith}</p>}
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {logos.map((logo) => (
              <div key={logo} className="text-xl font-semibold text-muted-foreground">
                {logo}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
