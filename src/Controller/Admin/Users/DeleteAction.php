<?php

declare(strict_types=1);

namespace App\Controller\Admin\Users;

use App\Admin\User\UserRepository;
use App\Http\RequestData;
use Crenspire\Inertia\Flash\InertiaFlash;
use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_map;
use function array_values;
use function is_array;
use function is_numeric;

/**
 * Deletes one or more users, given as an "ids" list.
 */
final readonly class DeleteAction
{
    public function __construct(
        private Inertia $inertia,
        private InertiaFlash $flash,
        private UserRepository $users,
    ) {}

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $ids = RequestData::from($request)['ids'] ?? [];
        $ids = is_array($ids)
            ? array_values(array_map(static fn(mixed $id): int => is_numeric($id) ? (int) $id : 0, $ids))
            : [];

        $deleted = $this->users->delete($ids);
        $this->flash->flash('success', $deleted === 1 ? '1 user was deleted.' : "{$deleted} users were deleted.");

        return $this->inertia->back($request, '/admin/users');
    }
}
