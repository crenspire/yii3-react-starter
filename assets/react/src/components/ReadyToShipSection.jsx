import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ReadyToShipSection({ cta = {} }) {
  const {
    title = "Ready to ship faster?",
    subtitle = "You're already blazing fast with Yii3. Yii3 Starter Kit is about to make your shipping speed supersonic. 🚀",
    buttonText = "View on GitHub",
    githubUrl = "https://github.com",
    commands = []
  } = cta;

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const text = commands.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container mx-auto space-y-12 py-20 md:py-32 px-4 max-w-7xl">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {subtitle}
        </p>
        <Button size="lg" className="gap-2" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
            {buttonText}
          </a>
        </Button>
      </div>
      {commands.length > 0 && (
        <div className="mx-auto max-w-3xl">
          <div className="relative rounded-lg border bg-muted p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Terminal</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="overflow-x-auto text-sm">
              <code className="text-foreground">
                {commands.map((cmd, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-muted-foreground">$</span> {cmd}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}

