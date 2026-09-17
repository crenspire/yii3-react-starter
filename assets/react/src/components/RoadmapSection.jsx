import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { iconFor } from '@/components/icons';

export default function RoadmapSection({ roadmap = [] }) {
  if (roadmap.length === 0) {
    return null;
  }

  return (
    <section id="roadmap" className="container mx-auto space-y-12 py-20 md:py-32 px-4 max-w-7xl">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Roadmap</h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Planned additions. These are not part of the kit yet.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roadmap.map((item) => {
          const Icon = iconFor(item.icon);
          return (
            <Card key={item.title} className="border-dashed border-border">
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <Icon className="h-8 w-8 text-muted-foreground" />
                  <Badge variant="outline">Planned</Badge>
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
