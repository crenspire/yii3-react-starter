# Yii3 React Starter Kit

A modern, production-ready starter kit for building fast applications with Yii3, Inertia.js, React, and Tailwind CSS.

## 🚀 Features

- **10x Dev Experience** - Ship faster with opinionated PHP CS Fixer, maximum Psalm level, and Rector for enhanced code quality and developer productivity
- **Production Docker Ready** - Optimized Docker images with Yii3 and optimized setup for lightning-fast development and deployment
- **Advanced Authentication** - Complete authentication system with social login and role-based access control ready to implement
- **Payment Ready** - Payment integration ready for subscription billing and payment processing so you can focus on building your product
- **API Ready** - RESTful API endpoints with authentication and comprehensive documentation structure ready to implement
- **Customizable UI** - Built with shadcn/ui components, making UI customization a breeze. Easily modify themes, styles, and components to match your brand
- **AI Integration Ready** - Pre-configured structure for LLM integrations. Build AI-powered features into your app with minimal setup
- **Admin Panel Ready** - Structure ready for beautiful admin panel with CRUD operations, charts, and detailed analytics integration
- **Evolving Features** - Regular updates bring new features, integrations, and improvements to supercharge your development

## 🛠 Tech Stack

### Backend
- **PHP 8.2+** - Modern PHP with latest features
- **Yii3** - High-performance PHP framework
- **Inertia.js 2.0** - Modern monolith approach
- **Composer** - PHP dependency management

### Frontend
- **React 18** - Modern UI library
- **Inertia.js React** - Seamless SPA experience
- **Vite 5** - Lightning-fast build tool
- **Tailwind CSS 4+** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components
- **Lucide React** - Beautiful icon library

### Development Tools
- **PHP CS Fixer** - Code style enforcement
- **Psalm** - Static analysis (maximum level)
- **Rector** - Automated refactoring
- **Docker** - Containerized development environment

## 📋 Requirements

- PHP 8.2 or higher
- Composer 2.x
- Node.js 18+ and npm/yarn
- Docker (optional, for containerized setup)

## 🏗 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-org/yii3-react-starter-kit.git
cd yii3-react-starter-kit
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install Node.js dependencies

```bash
npm install
# or
yarn install
```

### 4. Build frontend assets

```bash
npm run build
# or
yarn build
```

### 5. Start the development server

```bash
# Start PHP server
composer serve

# In another terminal, start Vite dev server
npm run dev
# or
yarn dev
```

Visit `http://localhost:8080` to see your application.

## 🎨 Development Workflow

### Frontend Development

The starter kit uses Vite for fast development with Hot Module Replacement (HMR):

```bash
# Start Vite dev server (enables HMR)
npm run dev

# Build for production
npm run build
```

**Note:** The Vite dev server runs on port 5173, while the PHP server runs on port 8080. The application automatically detects and uses the dev server when available.

### Backend Development

```bash
# Start PHP development server
composer serve

# Run tests
composer test

# Code style check
composer cs-check

# Code style fix
composer cs-fix

# Static analysis
composer psalm
```

## 📁 Project Structure

```
yii3-react-starter-kit/
├── assets/
│   └── react/
│       └── src/
│           ├── components/      # React components
│           │   ├── ui/         # shadcn/ui components
│           │   ├── Layout.jsx
│           │   ├── Navigation.jsx
│           │   ├── Footer.jsx
│           │   └── ...
│           ├── pages/          # Inertia page components
│           ├── lib/            # Utility functions
│           ├── main.jsx        # React entry point
│           └── app.css        # Global styles
├── config/                     # Yii3 configuration
│   ├── common/                # Shared configuration
│   └── web/                   # Web-specific configuration
├── src/
│   ├── Controller/            # PHP controllers
│   ├── views/                 # Inertia root template
│   └── ...
├── public/                    # Public web root
│   └── dist/                  # Built frontend assets
├── docker/                    # Docker configuration
├── tests/                     # Test suites
├── composer.json              # PHP dependencies
├── package.json               # Node.js dependencies
├── vite.config.js             # Vite configuration
└── tailwind.config.js         # Tailwind CSS configuration
```

## 🎯 Usage

### Creating a New Page

1. **Create a React component** in `assets/react/src/pages/`:

```jsx
// assets/react/src/pages/About.jsx
import React from 'react';
import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p>Your content here...</p>
      </div>
    </Layout>
  );
}
```

2. **Register the component** in `assets/react/src/main.jsx`:

```jsx
import About from './pages/About';

createInertiaApp({
  resolve: (name) => {
    const pages = {
      Home,
      About,  // Add your new page
    };
    return pages[name];
  },
  // ...
});
```

3. **Create a PHP controller** in `src/Controller/`:

```php
<?php
namespace App\Controller\About;

use Crenspire\Inertia\Action\InertiaAction;
use Psr\Http\Message\ResponseInterface;

final class Action extends InertiaAction
{
    public function __invoke(): ResponseInterface
    {
        return $this->render('About', [
            // Your page data
        ]);
    }
}
```

4. **Add a route** in `config/common/routes.php`:

```php
Route::get('/about', [\App\Controller\About\Action::class, '__invoke'])->name('about');
```

### Using shadcn/ui Components

The starter kit includes shadcn/ui components. To add more:

```bash
# Example: Add a new component (if you have shadcn CLI)
npx shadcn-ui@latest add button
```

Components are located in `assets/react/src/components/ui/`.

### Dark Mode

Dark mode is automatically handled with localStorage persistence. The theme toggle is available in the navigation header.

## 🧪 Testing

```bash
# Run all tests
composer test

# Run specific test suite
vendor/bin/codecept run unit
vendor/bin/codecept run functional
```

## 🐳 Docker Setup

### Development

```bash
cd docker/dev
docker-compose up -d
```

### Production

```bash
cd docker/prod
docker-compose up -d
```

## 📝 Code Quality

The starter kit includes several tools for maintaining code quality:

- **PHP CS Fixer** - Enforces PSR-12 coding standards
- **Psalm** - Static analysis at maximum level
- **Rector** - Automated refactoring and upgrades

```bash
# Check code style
composer cs-check

# Fix code style
composer cs-fix

# Run static analysis
composer psalm

# Run Rector
vendor/bin/rector process src/
```

## 🔧 Configuration

### Inertia.js Configuration

Inertia.js settings can be configured in `config/common/params-inertia.php`:

```php
'inertia' => [
    'assetConfig' => [
        'viteHost' => 'localhost',
        'vitePort' => 5173,
        'viteEntryPath' => 'assets/react/src/main.jsx',
        // ...
    ],
],
```

### Tailwind CSS

Tailwind configuration is in `tailwind.config.js`. The starter kit includes shadcn/ui theme configuration.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## 🙏 Acknowledgments

- [Yii Framework](https://www.yiiframework.com/) - The PHP framework
- [Inertia.js](https://inertiajs.com/) - The modern monolith approach
- [React](https://react.dev/) - The UI library
- [shadcn/ui](https://ui.shadcn.com/) - The component library
- [Vite](https://vitejs.dev/) - The build tool

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/yii3-react-starter-kit/issues)
- **Documentation**: [Wiki](https://github.com/your-org/yii3-react-starter-kit/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/yii3-react-starter-kit/discussions)

---

**Built with ❤️ for the Yii3 community**

