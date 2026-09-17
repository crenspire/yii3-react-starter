<?php

declare(strict_types=1);

namespace App\Controller\Admin\Users;

use App\Admin\User\UserRepository;
use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final readonly class IndexAction
{
    public function __construct(
        private Inertia $inertia,
        private UserRepository $users,
    ) {}

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        return $this->inertia->render($request, 'Admin/Users', [
            'users' => $this->users->all(),
            'roles' => UserRepository::ROLES,
            'statuses' => UserRepository::STATUSES,
        ]);
    }
}
