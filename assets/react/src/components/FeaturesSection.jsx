import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Map } from 'lucide-react';
import { iconFor } from '@/components/icons';

export default function FeaturesSection({ features = [] }) {
  const { repositoryUrl } = usePage().props;

  return (
    <section id="features" className="container mx-auto space-y-12 py-20 md:py-32 px-4 max-w-7xl">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Features <span className="text-2xl">✨</span>
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Everything included in the kit today.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = iconFor(feature.icon);
          return (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow border-border">
              <CardHeader>
                <div className="mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button variant="outline" size="lg" className="gap-2" asChild>
          <a href={`${repositoryUrl}#readme`} target="_blank" rel="noopener noreferrer">
            <BookOpen className="h-4 w-4" />
            Documentation
          </a>
        </Button>
        <Button variant="outline" size="lg" className="gap-2" asChild>
          <a href="#roadmap">
            <Map className="h-4 w-4" />
            Roadmap
          </a>
        </Button>
      </div>
    </section>
  );
}
