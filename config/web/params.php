<?php

declare(strict_types=1);

use App\ApplicationParams;
use Psr\Container\ContainerInterface;

return [
    'crenspire/yii3-inertia' => [
        'rootView' => '@src/views/inertia.php',
        'viewParameters' => [
            'applicationParams' => static fn(ContainerInterface $container): ApplicationParams => $container->get(ApplicationParams::class),
        ],
        'sharedProps' => [
            'repositoryUrl' => 'https://github.com/crenspire/yii3-react-starter',
        ],
        'vite' => [
            'buildDirectory' => 'dist',
            'manifest' => 'manifest.json',
        ],
    ],
];
