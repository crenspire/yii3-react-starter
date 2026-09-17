<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Admin\User\UserRepository;
use Crenspire\Inertia\Inertia;
use DateTimeImmutable;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_filter;
use function array_slice;
use function count;
use function cos;
use function round;
use function sin;

final readonly class DashboardAction
{
    public function __construct(
        private Inertia $inertia,
        private UserRepository $users,
    ) {}

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $users = $this->users->all();
        $today = new DateTimeImmutable('today');
        $monthAgo = $today->modify('-30 days')->format('Y-m-d');
        $twoMonthsAgo = $today->modify('-60 days')->format('Y-m-d');

        $newThisMonth = count(array_filter($users, static fn(array $user): bool => $user['createdAt'] > $monthAgo));
        $newLastMonth = count(array_filter(
            $users,
            static fn(array $user): bool => $user['createdAt'] > $twoMonthsAgo && $user['createdAt'] <= $monthAgo,
        ));
        $active = count(array_filter($users, static fn(array $user): bool => $user['status'] === 'Active'));
        $invited = count(array_filter($users, static fn(array $user): bool => $user['status'] === 'Invited'));

        return $this->inertia->render($request, 'Admin/Dashboard', [
            'stats' => [
                'totalUsers' => count($users),
                'activeUsers' => $active,
                'activeRate' => $users === [] ? 0 : round($active / count($users) * 100, 1),
                'newThisMonth' => $newThisMonth,
                'newLastMonth' => $newLastMonth,
                'pendingInvites' => $invited,
            ],
            'traffic' => fn(): array => $this->traffic($today),
            'recentUsers' => array_slice($users, 0, 6),
        ]);
    }

    /**
     * Sample page views for the last 90 days. Replace with your analytics data.
     *
     * @return list<array{date: string, desktop: int, mobile: int}>
     */
    private function traffic(DateTimeImmutable $today): array
    {
        $points = [];
        for ($day = 89; $day >= 0; $day--) {
            $i = 89 - $day;
            $points[] = [
                'date' => $today->modify("-{$day} days")->format('Y-m-d'),
                'desktop' => (int) round(220 + 110 * sin($i / 6) + ($i * 37) % 90 + $i),
                'mobile' => (int) round(170 + 80 * cos($i / 5) + ($i * 53) % 70 + $i * 0.8),
            ];
        }

        return $points;
    }
}
