<?php

declare(strict_types=1);

use App\Controller\HomePage\Action;
use Crenspire\Inertia\ResponseFactory;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ServerRequestInterface;
use Yiisoft\Definitions\DynamicReference;
use Yiisoft\RequestProvider\RequestProviderInterface;

return [
    Action::class => DynamicReference::to(
        static function (ContainerInterface $container): Action {
            // Get request from request provider (throws RequestNotSetException if not set)
            $requestProvider = $container->get(RequestProviderInterface::class);
            $request = $requestProvider->get();
            
            // Get ResponseFactory from container
            $responseFactory = $container->get(ResponseFactory::class);
            
            // Get PSR ResponseFactory for redirects
            $psrResponseFactory = $container->get(ResponseFactoryInterface::class);
            
            return new Action($request, $responseFactory, $container, $psrResponseFactory);
        }
    ),
];

