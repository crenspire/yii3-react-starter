import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Github, Copy, Check } from 'lucide-react';

export default function ReadyToShipSection({ cta = {} }) {
  const { repositoryUrl } = usePage().props;
  const {
    title = '',
    subtitle = '',
    buttonText = 'View on GitHub',
    commands = [],
  } = cta;

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(commands.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // The Clipboard API needs a secure context and permission; leave the button unchanged if it is denied.
    }
  };

  return (
    <section id="get-started" className="container mx-auto space-y-12 py-20 md:py-32 px-4 max-w-7xl">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {subtitle}
        </p>
        <Button size="lg" className="gap-2" asChild>
          <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
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
                aria-label="Copy commands"
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
                {commands.map((cmd) => (
                  <div key={cmd} className="mb-1">
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
