import { usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bug, Check, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function OpenSourceSection({ openSource = {} }) {
  const { repositoryUrl } = usePage().props;
  const {
    title = '',
    description = '',
    includedTitle = '',
    includedSubtitle = '',
    includedItems = [],
    price = '',
    priceSubtitle = '',
    supportTitle = '',
  } = openSource;

  return (
    <section id="open-source" className="container mx-auto space-y-12 py-20 md:py-32 px-4 max-w-7xl">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-2">{includedTitle}</h3>
            <p className="text-muted-foreground mb-6">{includedSubtitle}</p>
            <ul className="space-y-3">
              {includedItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground mb-4">{supportTitle}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="gap-2" asChild>
                <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                  <Star className="h-4 w-4" />
                  Star on GitHub
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href={`${repositoryUrl}/issues`} target="_blank" rel="noopener noreferrer">
                  <Bug className="h-4 w-4" />
                  Report an issue
                </a>
              </Button>
            </div>
          </div>
        </div>
        <Card className="flex flex-col items-center justify-center text-center p-8 border-border">
          <div className="text-6xl font-bold mb-2">{price}</div>
          <p className="text-lg text-muted-foreground mb-6">{priceSubtitle}</p>
          <Button size="lg" className="w-full" asChild>
            <a href="#get-started">Get Started</a>
          </Button>
        </Card>
      </div>
    </section>
  );
}
