<?php

declare(strict_types=1);

namespace App\Controller\HomePage;

use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final readonly class Action
{
    public function __construct(
        private Inertia $inertia,
    ) {}

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        return $this->inertia->render($request, 'Home', [
            'hero' => [
                'techStack' => 'Using PHP 8.2+, Yii3, Inertia.js 3, React 19 and Tailwind CSS 4',
                'title' => 'Yii3 - Modern',
                'titleHighlight' => 'Starter Kit',
                'subtitle' => 'Build single-page apps with React while keeping routing, controllers and validation in Yii3.',
                'ctaPrimary' => 'Get Started',
                'ctaSecondary' => 'GitHub',
                'builtWith' => 'Built with',
                'logos' => ['Yii', 'Inertia', 'React', 'Vite', 'Tailwind'],
            ],
            'features' => [
                [
                    'title' => 'Code Quality Tooling',
                    'description' => 'Psalm at level 1, PHP CS Fixer with PER-CS 2.0, Rector and Composer Dependency Analyser, all preconfigured.',
                    'icon' => 'rocket',
                ],
                [
                    'title' => 'Docker Ready',
                    'description' => 'FrankenPHP images for development, testing and production, plus a Docker Swarm stack for zero-downtime deploys.',
                    'icon' => 'docker',
                ],
                [
                    'title' => 'Inertia.js 3 + React 19',
                    'description' => 'Server-side routing with client-side pages, partial reloads, deferred props, validation errors and flash data.',
                    'icon' => 'layers',
                ],
                [
                    'title' => 'Customizable UI',
                    'description' => 'shadcn/ui-style components on Tailwind CSS 4 with a dark mode toggle. Change the theme tokens in one CSS file.',
                    'icon' => 'palette',
                ],
                [
                    'title' => 'Vite 8',
                    'description' => 'Hot module replacement in development, hashed production builds, and automatic asset versioning from the manifest.',
                    'icon' => 'zap',
                ],
                [
                    'title' => 'CSRF Protection',
                    'description' => 'Yii CSRF middleware wired to the Inertia client through the XSRF-TOKEN cookie, so forms work out of the box.',
                    'icon' => 'shield',
                ],
                [
                    'title' => 'Admin Dashboard',
                    'description' => 'A shadcn/ui admin with a collapsible sidebar, charts, data tables, forms and toasts, wired to Yii3 actions.',
                    'icon' => 'barChart',
                ],
                [
                    'title' => 'Tested',
                    'description' => 'Codeception unit, functional, console and browser suites that run locally or in Docker.',
                    'icon' => 'flask',
                ],
            ],
            'roadmap' => [
                [
                    'title' => 'Authentication',
                    'description' => 'Real user accounts with password hashing, sign up, social login and roles. The login page uses a demo session for now.',
                    'icon' => 'key',
                ],
                [
                    'title' => 'Payments',
                    'description' => 'Subscription billing and payment processing.',
                    'icon' => 'creditCard',
                ],
                [
                    'title' => 'REST API',
                    'description' => 'Authenticated API endpoints with generated documentation.',
                    'icon' => 'globe',
                ],
                [
                    'title' => 'AI Integration',
                    'description' => 'A structure for building LLM-powered features.',
                    'icon' => 'brain',
                ],
                [
                    'title' => 'Database Integration',
                    'description' => 'Yii DB with migrations, so admin data is stored in a database instead of the session.',
                    'icon' => 'layers',
                ],
            ],
            'openSource' => [
                'title' => 'Proudly Open Source 😊',
                'description' => 'Yii3 Starter Kit is and will always be open source.',
                'includedTitle' => "What's included?",
                'includedSubtitle' => 'Everything you need to start building today.',
                'includedItems' => [
                    'Yii3 backend with Inertia.js 3 and React 19',
                    'Tailwind CSS 4 and shadcn/ui-style components',
                    'Docker setup for development, testing and production',
                    'Admin dashboard and login page built on shadcn/ui blocks',
                    'Psalm, PHP CS Fixer and Rector configuration',
                    'Codeception test suites',
                ],
                'price' => '$0',
                'priceSubtitle' => 'Free Forever',
                'supportTitle' => 'Want to support the development?',
            ],
            'faqs' => [
                [
                    'question' => 'Is Yii3 Starter Kit really free?',
                    'answer' => 'Yes. It is free and open source, and you can use it for personal or commercial projects. Star the repository to show your interest.',
                ],
                [
                    'question' => 'How can I contribute?',
                    'answer' => 'Report bugs, suggest features, open pull requests or improve the documentation on GitHub.',
                ],
                [
                    'question' => 'How do I add a page?',
                    'answer' => 'Create a React component in assets/react/src/pages, an action that calls $inertia->render() with the component name, and a route in config/common/routes.php.',
                ],
            ],
            'cta' => [
                'title' => 'Ready to ship faster?',
                'subtitle' => "You're already blazing fast with Yii3. Yii3 Starter Kit is about to make your shipping speed supersonic. 🚀",
                'buttonText' => 'View on GitHub',
                'commands' => [
                    'git clone https://github.com/crenspire/yii3-react-starter.git',
                    'cd yii3-react-starter && composer install && npm install',
                    'npm run dev',
                    'APP_ENV=dev composer serve',
                ],
            ],
        ]);
    }
}
