<?php

declare(strict_types=1);

/**
 * Inertia.js asset configuration
 * 
 * Configure your Vite asset paths here. These values should match
 * your vite.config.js settings.
 */
return [
    'inertia' => [
        'assetConfig' => [
            // Vite dev server host (default: 'localhost')
            'viteHost' => 'localhost',
            
            // Vite dev server port (default: 5173)
            'vitePort' => 5173,
            
            // Entry point path for Vite dev server
            // This should match the path in your index.html and vite.config.js
            // Example: 'assets/react/src/main.jsx' or 'src/main.jsx'
            'viteEntryPath' => 'assets/react/src/main.jsx',
            
            // Manifest entry key for production builds
            // This should match the input path in your vite.config.js rollupOptions.input
            // Example: 'assets/react/src/main.jsx' or 'src/main.jsx'
            'manifestEntryKey' => 'assets/react/src/main.jsx',
            
            // Public directory path relative to project root (default: 'public')
            'publicPath' => 'public',
            
            // Build output directory relative to public path (default: 'dist')
            'buildOutputDir' => 'dist',
            
            // Manifest file name (default: 'manifest.json')
            'manifestFileName' => 'manifest.json',
        ],
    ],
];

