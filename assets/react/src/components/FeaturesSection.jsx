import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, Box, Key, CreditCard, Globe, Palette, Brain, BarChart3, Sparkles, FileText, Compass } from 'lucide-react';

const iconMap = {
  rocket: Rocket,
  docker: Box, // Using Box as Docker icon alternative
  key: Key,
  creditCard: CreditCard,
  globe: Globe,
  palette: Palette,
  brain: Brain,
  barChart: BarChart3,
  sparkles: Sparkles,
};

export default function FeaturesSection({ features = [] }) {
  return (
    <section id="features" className="container mx-auto space-y-12 py-20 md:py-32 px-4 max-w-7xl">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Features <span className="text-2xl">✨</span>
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Everything you need to ship fast to production without any hassle.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(features) && features.map((feature, index) => {
          const IconComponent = iconMap[feature.icon] || Rocket;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow border-border">
              <CardHeader>
                <div className="mb-4">
                  <IconComponent className="h-8 w-8 text-primary" />
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
        <Button variant="outline" size="lg" className="gap-2">
          <FileText className="h-4 w-4" />
          Documentation
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <Compass className="h-4 w-4" />
          Roadmap
        </Button>
      </div>
    </section>
  );
}

