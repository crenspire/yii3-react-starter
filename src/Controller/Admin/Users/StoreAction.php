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
use Yiisoft\Validator\ValidatorInterface;

final readonly class StoreAction
{
    public function __construct(
        private Inertia $inertia,
        private InertiaFlash $flash,
        private ValidatorInterface $validator,
        private UserRepository $users,
    ) {}

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $form = new UserForm(RequestData::from($request));
        $result = $form->validate($this->validator, $this->users);

        if (!$result->isValid()) {
            $this->flash->errors($result->getFirstErrorMessagesIndexedByProperty());

            return $this->inertia->back($request, '/admin/users');
        }

        $this->users->add($form->name, $form->email, $form->role, $form->status);
        $this->flash->flash('success', "{$form->name} was added.");

        return $this->inertia->redirect('/admin/users');
    }
}
