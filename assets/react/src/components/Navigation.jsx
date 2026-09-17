import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Github, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

const links = [
  { href: '/#features', label: 'Features' },
  { href: '/#roadmap', label: 'Roadmap' },
  { href: '/#get-started', label: 'Get Started' },
];

export default function Navigation() {
  const { repositoryUrl, auth } = usePage().props;
  const { resolvedTheme, setTheme } = useTheme();
  const darkMode = resolvedTheme === 'dark';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => setTheme(darkMode ? 'light' : 'dark');

  const accountButton = (className) => (
    <Button size="sm" className={className} asChild>
      <Link href={auth?.user ? '/admin' : '/login'}>{auth?.user ? 'Dashboard' : 'Log in'}</Link>
    </Button>
  );

  const themeButton = (className) => (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className={className}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );

  const githubButton = (className) => (
    <Button variant="ghost" size="icon" className={className} asChild>
      <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
        <Github className="h-5 w-5" />
      </a>
    </Button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Yii3</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`${repositoryUrl}#readme`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {themeButton('hidden md:flex')}
          {githubButton('hidden md:flex')}
          {accountButton('hidden md:inline-flex ml-2')}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-2 max-w-7xl">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href={`${repositoryUrl}#readme`} target="_blank" rel="noopener noreferrer" className="block py-2 text-sm font-medium">
              Docs
            </a>
            <div className="flex items-center gap-2 pt-2">
              {themeButton()}
              {githubButton()}
            </div>
            {accountButton('w-full')}
          </div>
        </div>
      )}
    </header>
  );
}
