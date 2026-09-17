<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\Tests\Support\FunctionalTester;

use function PHPUnit\Framework\assertArrayHasKey;
use function PHPUnit\Framework\assertNull;
use function PHPUnit\Framework\assertSame;
use function PHPUnit\Framework\assertStringEndsWith;

final class AuthCest
{
    public function guestsAreRedirectedToLogin(FunctionalTester $I): void
    {
        $response = $I->visit('GET', '/admin', inertia: false);

        assertSame(302, $response->getStatusCode());
        assertStringEndsWith('/login', $response->getHeaderLine('Location'));
    }

    public function loginPageRenders(FunctionalTester $I): void
    {
        $page = $I->page($I->visit('GET', '/login', inertia: false));

        assertSame('Auth/Login', $page['component']);
        assertSame(['user' => null], $page['props']['auth']);
    }

    public function loginWithoutXsrfTokenIsRejected(FunctionalTester $I): void
    {
        // No GET first, so there is no XSRF-TOKEN cookie to send back.
        $response = $I->visit('POST', '/login', ['email' => 'olivia.martin@example.com', 'password' => 'password123']);

        assertSame(422, $response->getStatusCode());
    }

    public function invalidLoginShowsErrors(FunctionalTester $I): void
    {
        $I->visit('GET', '/login', inertia: false);
        $response = $I->visit('POST', '/login', ['email' => 'not-an-email', 'password' => 'short']);

        assertSame(302, $response->getStatusCode());
        assertStringEndsWith('/login', $response->getHeaderLine('Location'));

        $errors = $I->page($I->visit('GET', '/login'))['props']['errors'];
        assertSame('Email is not a valid email address.', $errors['email']);
        assertSame('Password must contain at least 8 characters.', $errors['password']);
    }

    public function loginOpensDashboard(FunctionalTester $I): void
    {
        $I->login();

        $page = $I->page($I->visit('GET', '/admin'));
        assertSame('Admin/Dashboard', $page['component']);
        assertSame(['name' => 'Olivia Martin', 'email' => 'olivia.martin@example.com'], $page['props']['auth']['user']);
        assertArrayHasKey('stats', $page['props']);
        assertSame(32, $page['props']['stats']['totalUsers']);
    }

    public function signedInUsersSkipLoginPage(FunctionalTester $I): void
    {
        $I->login();

        $response = $I->visit('GET', '/login');
        assertSame(302, $response->getStatusCode());
        assertStringEndsWith('/admin', $response->getHeaderLine('Location'));
    }

    public function logout(FunctionalTester $I): void
    {
        $I->login();
        $I->visit('POST', '/logout');

        $response = $I->visit('GET', '/admin');
        assertSame(302, $response->getStatusCode());
        assertNull($I->page($I->visit('GET', '/'))['props']['auth']['user']);
    }
}
