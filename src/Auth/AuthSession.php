<?php

declare(strict_types=1);

namespace App\Auth;

use Yiisoft\Session\SessionInterface;

use function is_array;
use function is_string;

/**
 * Keeps the signed-in user in the session.
 *
 * The starter kit has no user storage yet, so there are no passwords to check: this is a demo sign-in that
 * lets you explore the admin area. Replace it with a real identity and password check before going to production.
 */
final readonly class AuthSession
{
    private const KEY = 'auth.user';

    public function __construct(
        private SessionInterface $session,
    ) {}

    /**
     * @return array{name: string, email: string}|null
     */
    public function user(): ?array
    {
        $user = $this->session->get(self::KEY);
        if (!is_array($user)) {
            return null;
        }

        $name = $user['name'] ?? null;
        $email = $user['email'] ?? null;
        if (!is_string($name) || !is_string($email)) {
            return null;
        }

        return ['name' => $name, 'email' => $email];
    }

    public function login(string $name, string $email): void
    {
        // A new session ID on sign-in prevents session fixation.
        $this->session->regenerateId();
        $this->session->set(self::KEY, ['name' => $name, 'email' => $email]);
    }

    public function update(string $name, string $email): void
    {
        $this->session->set(self::KEY, ['name' => $name, 'email' => $email]);
    }

    public function logout(): void
    {
        $this->session->remove(self::KEY);
        $this->session->regenerateId();
    }
}
