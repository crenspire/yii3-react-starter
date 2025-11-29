import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Heart, Twitter } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function OpenSourceSection({ openSource = {} }) {
  const {
    title = "Proudly Open Source 😊",
    description = "Yii3 Starter Kit is and will always be open source.",
    includedTitle = "What's included?",
    includedSubtitle = "Perfect for growing businesses.",
    includedItems = [],
    price = "$0",
    priceSubtitle = "Free Forever",
    supportTitle = "Want to support the development?",
    githubUrl = "https://github.com"
  } = openSource;

  return (
    <section id="pricing" className="container mx-auto space-y-12 py-20 md:py-32 px-4 max-w-7xl">
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
              {Array.isArray(includedItems) && includedItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground mb-4">{supportTitle}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="gap-2">
                <Heart className="h-4 w-4" />
                Sponsor
              </Button>
              <Button variant="outline" className="gap-2">
                <Twitter className="h-4 w-4" />
                X Follow Me
              </Button>
            </div>
          </div>
        </div>
        <Card className="flex flex-col items-center justify-center text-center p-8 border-border">
          <div className="text-6xl font-bold mb-2">{price}</div>
          <p className="text-lg text-muted-foreground mb-6">{priceSubtitle}</p>
          <Button size="lg" className="w-full" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              Get Started
            </a>
          </Button>
        </Card>
      </div>
    </section>
  );
}

