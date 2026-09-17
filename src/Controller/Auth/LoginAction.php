<?php

declare(strict_types=1);

namespace App\Controller\Auth;

use App\Admin\User\UserRepository;
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

use function explode;
use function str_replace;
use function ucwords;

/**
 * Demo sign-in: any valid email with a password of at least 8 characters is accepted. See {@see AuthSession}.
 */
final readonly class LoginAction
{
    public function __construct(
        private Inertia $inertia,
        private InertiaFlash $flash,
        private ValidatorInterface $validator,
        private AuthSession $auth,
        private UserRepository $users,
    ) {}

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $data = RequestData::from($request);
        $email = RequestData::string($data, 'email');
        $password = (string) ($data['password'] ?? '');

        $result = $this->validator->validate(
            ['email' => $email, 'password' => $password],
            [
                'email' => [new Required(), new Email()],
                'password' => [new Required(), new Length(min: 8)],
            ],
        );

        if (!$result->isValid()) {
            $this->flash->errors($result->getFirstErrorMessagesIndexedByProperty());

            return $this->inertia->back($request, '/login');
        }

        $name = $this->users->findByEmail($email)['name'] ?? ucwords(str_replace(['.', '_', '-'], ' ', explode('@', $email)[0]));
        $this->auth->login($name, $email);
        $this->flash->flash('success', "Welcome back, {$name}!");

        return $this->inertia->redirect('/admin');
    }
}
