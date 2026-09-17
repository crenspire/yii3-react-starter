<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\Tests\Support\FunctionalTester;

use function array_column;
use function PHPUnit\Framework\assertContains;
use function PHPUnit\Framework\assertCount;
use function PHPUnit\Framework\assertNotContains;
use function PHPUnit\Framework\assertSame;

final class AdminUsersCest
{
    public function _before(FunctionalTester $I): void
    {
        $I->login();
    }

    public function listsUsers(FunctionalTester $I): void
    {
        $page = $I->page($I->visit('GET', '/admin/users'));

        assertSame('Admin/Users', $page['component']);
        assertCount(32, $page['props']['users']);
        assertSame(['Admin', 'Editor', 'Viewer'], $page['props']['roles']);
    }

    public function addingUserValidatesInput(FunctionalTester $I): void
    {
        $I->visit('POST', '/admin/users', [
            'name' => '',
            'email' => 'olivia.martin@example.com',
            'role' => 'Owner',
            'status' => 'Active',
        ]);

        $errors = $I->page($I->visit('GET', '/admin/users'))['props']['errors'];
        assertSame('Name cannot be blank.', $errors['name']);
        assertSame('A user with this email already exists.', $errors['email']);
        assertSame('Role is not in the list of acceptable values.', $errors['role']);
    }

    public function addsUpdatesAndDeletesUser(FunctionalTester $I): void
    {
        $I->visit('POST', '/admin/users', [
            'name' => 'Jane Cooper',
            'email' => 'jane.cooper@example.com',
            'role' => 'Viewer',
            'status' => 'Invited',
        ]);
        $page = $I->page($I->visit('GET', '/admin/users'));
        $jane = $page['props']['users'][0];
        assertSame('Jane Cooper', $jane['name']);
        assertSame('Jane Cooper was added.', $page['flash']['success'] ?? null);

        $response = $I->visit('PUT', '/admin/users/' . $jane['id'], [
            'name' => 'Jane Cooper',
            'email' => 'jane.cooper@example.com',
            'role' => 'Editor',
            'status' => 'Active',
        ]);
        assertSame(303, $response->getStatusCode());
        $users = $I->page($I->visit('GET', '/admin/users'))['props']['users'];
        assertSame('Editor', $users[0]['role']);

        $I->visit('DELETE', '/admin/users', ['ids' => [$jane['id'], 2]]);
        $emails = array_column($I->page($I->visit('GET', '/admin/users'))['props']['users'], 'email');
        assertNotContains('jane.cooper@example.com', $emails);
        assertNotContains('jackson.lee@example.com', $emails);
        assertContains('olivia.martin@example.com', $emails);
    }

    public function updatesProfile(FunctionalTester $I): void
    {
        $I->visit('PUT', '/admin/settings', ['name' => 'Olivia M. Martin', 'email' => 'olivia@example.com']);

        $page = $I->page($I->visit('GET', '/admin/settings'));
        assertSame(['name' => 'Olivia M. Martin', 'email' => 'olivia@example.com'], $page['props']['auth']['user']);
    }
}
