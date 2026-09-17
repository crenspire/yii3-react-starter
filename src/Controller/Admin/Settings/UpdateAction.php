<?php

declare(strict_types=1);

namespace App\Controller\Admin\Settings;

use App\Auth\AuthSession;
use App\Http\RequestData;
use Crenspire\Inertia\Flash\InertiaFlash;
use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Yiisoft\Validator\Rule\Email;
use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\ValidatorInterface;

final readonly class UpdateAction
{
    public function __construct(
        private Inertia $inertia,
        private InertiaFlash $flash,
        private ValidatorInterface $validator,
        private AuthSession $auth,
    ) {}

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $data = RequestData::from($request);
        $name = RequestData::string($data, 'name');
        $email = RequestData::string($data, 'email');

        $result = $this->validator->validate(
            ['name' => $name, 'email' => $email],
            [
                'name' => [new Required(), new Length(max: 100)],
                'email' => [new Required(), new Email()],
            ],
        );

        if (!$result->isValid()) {
            $this->flash->errors($result->getFirstErrorMessagesIndexedByProperty());

            return $this->inertia->back($request, '/admin/settings');
        }

        $this->auth->update($name, $email);
        $this->flash->flash('success', 'Your profile was updated.');

        return $this->inertia->back($request, '/admin/settings');
    }
}
