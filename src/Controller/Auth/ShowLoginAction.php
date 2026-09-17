<?php

declare(strict_types=1);

namespace App\Controller\Auth;

use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final readonly class ShowLoginAction
{
    public function __construct(
        private Inertia $inertia,
    ) {}

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        return $this->inertia->render($request, 'Auth/Login');
    }
}
