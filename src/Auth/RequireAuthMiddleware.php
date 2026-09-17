<?php

declare(strict_types=1);

namespace App\Auth;

use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * Sends guests to the login page.
 */
final readonly class RequireAuthMiddleware implements MiddlewareInterface
{
    public function __construct(
        private AuthSession $auth,
        private Inertia $inertia,
    ) {}

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        if ($this->auth->user() === null) {
            return $this->inertia->redirect('/login');
        }

        return $handler->handle($request);
    }
}
