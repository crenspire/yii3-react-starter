<?php

declare(strict_types=1);

namespace App\Admin\User;

use DateTimeImmutable;
use Yiisoft\Session\SessionInterface;

use function array_filter;
use function array_map;
use function array_values;
use function in_array;
use function is_array;
use function max;
use function strcasecmp;
use function usort;

/**
 * Demo user storage for the admin area. Users live in the session, seeded with sample data on first use, so
 * each visitor gets their own copy that resets with the session. Replace it with a database repository.
 *
 * @psalm-type User = array{
 *     id: int,
 *     name: string,
 *     email: string,
 *     role: string,
 *     status: string,
 *     createdAt: string,
 * }
 */
final readonly class UserRepository
{
    public const ROLES = ['Admin', 'Editor', 'Viewer'];
    public const STATUSES = ['Active', 'Invited', 'Suspended'];

    private const KEY = 'demo.users';

    private const SEED = [
        ['Olivia Martin', 'Admin', 'Active', 2],
        ['Jackson Lee', 'Editor', 'Active', 5],
        ['Isabella Nguyen', 'Viewer', 'Invited', 1],
        ['William Kim', 'Editor', 'Active', 9],
        ['Sofia Davis', 'Viewer', 'Active', 12],
        ['Liam Johnson', 'Admin', 'Active', 15],
        ['Emma Brown', 'Viewer', 'Suspended', 18],
        ['Noah Williams', 'Editor', 'Active', 21],
        ['Ava Garcia', 'Viewer', 'Active', 24],
        ['Lucas Miller', 'Viewer', 'Invited', 3],
        ['Mia Wilson', 'Editor', 'Active', 30],
        ['Ethan Moore', 'Viewer', 'Active', 33],
        ['Charlotte Taylor', 'Viewer', 'Active', 37],
        ['James Anderson', 'Editor', 'Suspended', 41],
        ['Amelia Thomas', 'Viewer', 'Active', 44],
        ['Benjamin Jackson', 'Viewer', 'Active', 48],
        ['Harper White', 'Admin', 'Active', 52],
        ['Elijah Harris', 'Viewer', 'Invited', 7],
        ['Evelyn Martinez', 'Editor', 'Active', 57],
        ['Alexander Clark', 'Viewer', 'Active', 61],
        ['Abigail Lewis', 'Viewer', 'Active', 64],
        ['Henry Robinson', 'Editor', 'Active', 68],
        ['Emily Walker', 'Viewer', 'Suspended', 71],
        ['Sebastian Young', 'Viewer', 'Active', 75],
        ['Ella Allen', 'Viewer', 'Active', 79],
        ['Daniel King', 'Editor', 'Active', 83],
        ['Scarlett Wright', 'Viewer', 'Invited', 11],
        ['Matthew Scott', 'Viewer', 'Active', 88],
        ['Grace Torres', 'Editor', 'Active', 92],
        ['Jack Hill', 'Viewer', 'Active', 97],
        ['Chloe Green', 'Viewer', 'Active', 103],
        ['Owen Adams', 'Admin', 'Active', 110],
    ];

    public function __construct(
        private SessionInterface $session,
    ) {}

    /**
     * @return list<User> Newest first.
     */
    public function all(): array
    {
        $users = $this->load();
        usort($users, static fn(array $a, array $b): int => [$b['createdAt'], $b['id']] <=> [$a['createdAt'], $a['id']]);

        return $users;
    }

    public function emailExists(string $email, ?int $exceptId = null): bool
    {
        foreach ($this->load() as $user) {
            if ($user['id'] !== $exceptId && strcasecmp($user['email'], $email) === 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return User|null
     */
    public function findByEmail(string $email): ?array
    {
        foreach ($this->load() as $user) {
            if (strcasecmp($user['email'], $email) === 0) {
                return $user;
            }
        }

        return null;
    }

    /**
     * @return User|null
     */
    public function find(int $id): ?array
    {
        foreach ($this->load() as $user) {
            if ($user['id'] === $id) {
                return $user;
            }
        }

        return null;
    }

    /**
     * @return User
     */
    public function add(string $name, string $email, string $role, string $status): array
    {
        $users = $this->load();
        $user = [
            'id' => max([0, ...array_map(static fn(array $user): int => $user['id'], $users)]) + 1,
            'name' => $name,
            'email' => $email,
            'role' => $role,
            'status' => $status,
            'createdAt' => (new DateTimeImmutable())->format('Y-m-d'),
        ];
        $users[] = $user;
        $this->save($users);

        return $user;
    }

    public function update(int $id, string $name, string $email, string $role, string $status): void
    {
        $this->save(array_map(
            static fn(array $user): array => $user['id'] === $id
                ? ['name' => $name, 'email' => $email, 'role' => $role, 'status' => $status] + $user
                : $user,
            $this->load(),
        ));
    }

    /**
     * @param list<int> $ids
     *
     * @return int The number of deleted users.
     */
    public function delete(array $ids): int
    {
        $users = $this->load();
        $remaining = array_values(array_filter($users, static fn(array $user): bool => !in_array($user['id'], $ids, true)));
        $this->save($remaining);

        return count($users) - count($remaining);
    }

    /**
     * @return list<User>
     */
    private function load(): array
    {
        $users = $this->session->get(self::KEY);
        if (is_array($users)) {
            /** @var list<User> $users */
            return $users;
        }

        $users = $this->seed();
        $this->save($users);

        return $users;
    }

    /**
     * @param list<User> $users
     */
    private function save(array $users): void
    {
        $this->session->set(self::KEY, $users);
    }

    /**
     * @return list<User>
     */
    private function seed(): array
    {
        $today = new DateTimeImmutable('today');
        $users = [];
        foreach (self::SEED as $index => [$name, $role, $status, $daysAgo]) {
            $users[] = [
                'id' => $index + 1,
                'name' => $name,
                'email' => strtolower(str_replace(' ', '.', $name)) . '@example.com',
                'role' => $role,
                'status' => $status,
                'createdAt' => $today->modify("-{$daysAgo} days")->format('Y-m-d'),
            ];
        }

        return $users;
    }
}
