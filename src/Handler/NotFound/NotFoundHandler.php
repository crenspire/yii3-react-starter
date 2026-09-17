<?php

declare(strict_types=1);

namespace App\Handler\NotFound;

use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Yiisoft\Http\Status;

/**
 * Renders the Inertia "Error" page, so 404s keep the app layout and also work for Inertia visits.
 */
final readonly class NotFoundHandler implements RequestHandlerInterface
{
    public function __construct(
        private Inertia $inertia,
    ) {}

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        return $this->inertia
            ->render($request, 'Error', [
                'status' => Status::NOT_FOUND,
                'path' => $request->getUri()->getPath(),
            ])
            ->withStatus(Status::NOT_FOUND);
    }
}
