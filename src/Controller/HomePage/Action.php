<?php

declare(strict_types=1);

namespace App\Controller\HomePage;

use Crenspire\Inertia\Action\InertiaAction;
use Psr\Http\Message\ResponseInterface;

final class Action extends InertiaAction
{
    public function __invoke(): ResponseInterface
    {
        return $this->render('Home', [
            'hero' => [
                'techStack' => 'Using PHP 8.2+, Yii3, Inertia.js 2.0 and Tailwind CSS 4+',
                'title' => 'Yii3 - Modern',
                'titleHighlight' => 'Starter Kit',
                'subtitle' => 'Ship faster production-ready applications 10x faster with starter kit powered by Yii3, Inertia.js, and React.',
                'ctaPrimary' => 'View Demo',
                'ctaSecondary' => 'Github',
                'trustedBy' => 'Trusted by developers worldwide',
                'logos' => ['Yii', 'Inertia', 'React', 'Vite'],
            ],
            'features' => [
                [
                    'title' => '10x Dev Experience',
                    'description' => 'Ship faster with opinionated PHP CS Fixer, maximum Psalm level, and Rector for enhanced code quality and developer productivity.',
                    'icon' => 'rocket',
                ],
                [
                    'title' => 'Production Docker Ready',
                    'description' => 'Optimized Docker images with Yii3 and optimized setup for lightning-fast development and deployment.',
                    'icon' => 'docker',
                ],
                [
                    'title' => 'Advanced Authentication',
                    'description' => 'Complete authentication system with social login and role-based access control ready to implement.',
                    'icon' => 'key',
                ],
                [
                    'title' => 'Payment Ready',
                    'description' => 'Payment integration ready for subscription billing and payment processing so you can focus on building your product.',
                    'icon' => 'creditCard',
                ],
                [
                    'title' => 'API Ready',
                    'description' => 'RESTful API endpoints with authentication and comprehensive documentation structure ready to implement.',
                    'icon' => 'globe',
                ],
                [
                    'title' => 'Customizable UI',
                    'description' => 'Built with shadcn/ui components, making UI customization a breeze. Easily modify themes, styles, and components to match your brand.',
                    'icon' => 'palette',
                ],
                [
                    'title' => 'AI Integration Ready',
                    'description' => 'Pre-configured structure for LLM integrations. Build AI-powered features into your app with minimal setup.',
                    'icon' => 'brain',
                ],
                [
                    'title' => 'Admin Panel Ready',
                    'description' => 'Structure ready for beautiful admin panel with CRUD operations, charts, and detailed analytics integration.',
                    'icon' => 'barChart',
                ],
                [
                    'title' => 'Evolving Features',
                    'description' => 'This is just the beginning. Regular updates bring new features, integrations, and improvements to supercharge your development.',
                    'icon' => 'sparkles',
                ],
            ],
            'openSource' => [
                'title' => 'Proudly Open Source 😊',
                'description' => 'Yii3 Starter Kit is and will always be open source.',
                'includedTitle' => "What's included?",
                'includedSubtitle' => 'Perfect for growing businesses.',
                'includedItems' => [
                    'Production-ready Docker setup',
                    'AI Integrations structure',
                    'API endpoints structure',
                    'Advanced authentication system',
                    'Payment integration ready',
                    'Comprehensive documentation',
                ],
                'price' => '$0',
                'priceSubtitle' => 'Free Forever',
                'supportTitle' => 'Want to support the development?',
                'githubUrl' => 'https://github.com',
            ],
            'faqs' => [
                [
                    'question' => 'Is Yii3 Starter Kit really free?',
                    'answer' => 'Yes! Yii3 Starter Kit is completely free and open source under the MIT license. You can use it for personal or commercial projects without any restrictions. Feel free to star the repo for showing your interest.',
                ],
                [
                    'question' => 'How can I contribute?',
                    'answer' => 'Contributions are welcome! You can contribute by reporting bugs, suggesting features, submitting pull requests, or improving documentation. Check out our GitHub repository for more information.',
                ],
                [
                    'question' => 'Why should I sponsor?',
                    'answer' => 'Sponsoring helps maintain and improve the project. Your support enables us to dedicate more time to development, add new features, fix bugs faster, and provide better documentation.',
                ],
            ],
            'cta' => [
                'title' => 'Ready to ship faster?',
                'subtitle' => "You're already blazing fast with Yii3. Yii3 Starter Kit is about to make your shipping speed supersonic. 🚀",
                'buttonText' => 'View on GitHub',
                'githubUrl' => 'https://github.com',
                'commands' => [
                    'git clone https://github.com/your-org/yii3-starter-kit',
                    'cd yii3-starter-kit && composer install',
                    'npm install',
                    'npm run dev',
                    'composer serve',
                ],
            ],
        ]);
    }
}
