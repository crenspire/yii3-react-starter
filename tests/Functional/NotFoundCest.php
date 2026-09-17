<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\Tests\Support\FunctionalTester;
use HttpSoft\Message\ServerRequest;

use function PHPUnit\Framework\assertSame;

final class NotFoundCest
{
    public function firstVisitRendersErrorPage(FunctionalTester $tester): void
    {
        $response = $tester->sendRequest(new ServerRequest(uri: '/non-existent-page'));

        assertSame(404, $response->getStatusCode());

        $page = $tester->extractPage((string) $response->getBody());
        assertSame('Error', $page['component']);
        assertSame(404, $page['props']['status']);
        assertSame('/non-existent-page', $page['props']['path']);
    }

    public function inertiaVisitReturnsJson(FunctionalTester $tester): void
    {
        $response = $tester->sendRequest(
            new ServerRequest(uri: '/non-existent-page', headers: [
                'X-Inertia' => 'true',
                'X-Inertia-Version' => $tester->currentVersion(),
            ]),
        );

        assertSame(404, $response->getStatusCode());
        assertSame('true', $response->getHeaderLine('X-Inertia'));

        /** @var array{component: string} $page */
        $page = json_decode((string) $response->getBody(), true, flags: JSON_THROW_ON_ERROR);
        assertSame('Error', $page['component']);
    }
}
