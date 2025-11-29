import React from 'react';
import { Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background w-full">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 md:flex-row md:py-8 px-4 max-w-7xl">
        <p className="text-sm text-muted-foreground">
          Crafted with ❤️ for the Yii3 community
        </p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

