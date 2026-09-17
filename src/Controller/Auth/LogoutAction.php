<?php

declare(strict_types=1);

namespace App\Controller\Auth;

use App\Auth\AuthSession;
use Crenspire\Inertia\Flash\InertiaFlash;
use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;

final readonly class LogoutAction
{
    public function __construct(
        private Inertia $inertia,
        private InertiaFlash $flash,
        private AuthSession $auth,
    ) {}

    public function __invoke(): ResponseInterface
    {
        $this->auth->logout();
        $this->flash->clearHistory();

        return $this->inertia->redirect('/login');
    }
}
