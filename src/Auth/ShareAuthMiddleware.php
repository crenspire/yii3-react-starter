<?php

declare(strict_types=1);

namespace App\Auth;

use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * Shares the signed-in user with every Inertia page as the "auth" prop.
 */
final readonly class ShareAuthMiddleware implements MiddlewareInterface
{
    public function __construct(
        private AuthSession $auth,
    ) {}

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $request = Inertia::share($request, 'auth', fn(): array => ['user' => $this->auth->user()]);

        return $handler->handle($request);
    }
}
