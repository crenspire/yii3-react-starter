<?php

declare(strict_types=1);

use Crenspire\Inertia\ConfigProvider;
use Crenspire\Inertia\ResponseFactory;
use Crenspire\Inertia\ViewRenderer;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\StreamFactoryInterface;
use Yiisoft\Definitions\DynamicReference;
use Yiisoft\View\ViewInterface;
use Yiisoft\View\WebView;

// Call ConfigProvider to get its definitions and merge them
$configProvider = new ConfigProvider();
$inertiaConfig = $configProvider();

// Extract definitions from ContainerConfig
$definitions = $inertiaConfig[\Yiisoft\Di\ContainerConfig::class]['definitions'] ?? [];

// Override AssetConfig to use params from config
    $definitions[\Crenspire\Inertia\AssetConfig::class] = DynamicReference::to(
        static function (ContainerInterface $container): \Crenspire\Inertia\AssetConfig {
            // Try to get params from common/params.php
            $paramsFile = getcwd() . '/config/common/params-inertia.php';
            if (file_exists($paramsFile)) {
                $inertiaParams = require $paramsFile;
                $inertiaConfig = $inertiaParams['inertia'] ?? null;
                $config = $inertiaConfig['assetConfig'] ?? [];
                if (!empty($config)) {
                    return new \Crenspire\Inertia\AssetConfig(
                        $config['viteHost'] ?? null,
                        $config['vitePort'] ?? null,
                        $config['viteEntryPath'] ?? null,
                        $config['manifestEntryKey'] ?? null,
                        $config['publicPath'] ?? null,
                        $config['buildOutputDir'] ?? null,
                        $config['manifestFileName'] ?? null
                    );
                }
            }
            // Return default config
            return new \Crenspire\Inertia\AssetConfig();
        }
    );

// Override ResponseFactory to ensure view renderer is properly set up
    $definitions[ResponseFactory::class] = DynamicReference::to(
        static function (ContainerInterface $container): ResponseFactory {
            $responseFactory = $container->get(ResponseFactoryInterface::class);
            $streamFactory = $container->get(StreamFactoryInterface::class);
            
            // Get Yii3 View renderer - use WebView (for web) or View (for console)
            $viewRenderer = null;
            try {
                // Try WebView first (for web applications)
                if ($container->has(WebView::class)) {
                    $view = $container->get(WebView::class);
                    $viewRenderer = static function (string $viewName, array $payload) use ($view): string {
                        return ViewRenderer::render($view, $viewName, $payload);
                    };
                } elseif ($container->has(\Yiisoft\View\View::class)) {
                    // Fallback to View for console applications
                    $view = $container->get(\Yiisoft\View\View::class);
                    $viewRenderer = static function (string $viewName, array $payload) use ($view): string {
                        return ViewRenderer::render($view, $viewName, $payload);
                    };
                }
            } catch (\Throwable $e) {
                // Log but don't throw - we'll use fallback
                error_log('Inertia view renderer setup failed: ' . $e->getMessage());
            }
            
            // View renderer is required
            if ($viewRenderer === null) {
                throw new \RuntimeException(
                    'View renderer is not configured. Please ensure yiisoft/view is installed and WebView is configured in your DI container.'
                );
            }
            
            return new ResponseFactory($responseFactory, $streamFactory, $viewRenderer);
        }
    );

return $definitions;

