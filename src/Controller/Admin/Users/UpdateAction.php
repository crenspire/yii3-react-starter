<?php

declare(strict_types=1);

namespace App\Controller\Admin\Users;

use App\Admin\User\UserForm;
use App\Admin\User\UserRepository;
use App\Http\RequestData;
use Crenspire\Inertia\Flash\InertiaFlash;
use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Yiisoft\Http\Status;
use Yiisoft\Router\CurrentRoute;
use Yiisoft\Validator\ValidatorInterface;

final readonly class UpdateAction
{
    public function __construct(
        private Inertia $inertia,
        private InertiaFlash $flash,
        private ValidatorInterface $validator,
        private UserRepository $users,
        private CurrentRoute $route,
    ) {}

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $id = (int) $this->route->getArgument('id');
        if ($this->users->find($id) === null) {
            return $this->inertia
                ->render($request, 'Error', ['status' => Status::NOT_FOUND, 'path' => $request->getUri()->getPath()])
                ->withStatus(Status::NOT_FOUND);
        }

        $form = new UserForm(RequestData::from($request));
        $result = $form->validate($this->validator, $this->users, $id);

        if (!$result->isValid()) {
            $this->flash->errors($result->getFirstErrorMessagesIndexedByProperty());

            return $this->inertia->back($request, '/admin/users');
        }

        $this->users->update($id, $form->name, $form->email, $form->role, $form->status);
        $this->flash->flash('success', "{$form->name} was updated.");

        return $this->inertia->back($request, '/admin/users');
    }
}
