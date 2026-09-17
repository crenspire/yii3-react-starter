<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\Tests\Support\FunctionalTester;
use HttpSoft\Message\ServerRequest;

use function PHPUnit\Framework\assertArrayHasKey;
use function PHPUnit\Framework\assertSame;
use function PHPUnit\Framework\assertStringContainsString;
use function PHPUnit\Framework\assertStringStartsWith;

final class HomePageCest
{
    public function firstVisitRendersRootView(FunctionalTester $tester): void
    {
        $response = $tester->sendRequest(new ServerRequest(uri: '/'));

        assertSame(200, $response->getStatusCode());
        assertStringStartsWith('text/html', $response->getHeaderLine('Content-Type'));
        assertStringContainsString('X-Inertia', $response->getHeaderLine('Vary'));
        assertStringContainsString('XSRF-TOKEN=', $response->getHeaderLine('Set-Cookie'));

        $page = $tester->extractPage((string) $response->getBody());
        assertSame('Home', $page['component']);
        assertSame('/', $page['url']);
        assertArrayHasKey('repositoryUrl', $page['props']);
        assertArrayHasKey('features', $page['props']);
        assertArrayHasKey('roadmap', $page['props']);
    }

    public function inertiaVisitReturnsJson(FunctionalTester $tester): void
    {
        $response = $tester->sendRequest(
            new ServerRequest(uri: '/', headers: [
                'X-Inertia' => 'true',
                'X-Inertia-Version' => $tester->currentVersion(),
            ]),
        );

        assertSame(200, $response->getStatusCode());
        assertSame('true', $response->getHeaderLine('X-Inertia'));

        /** @var array{component: string} $page */
        $page = json_decode((string) $response->getBody(), true, flags: JSON_THROW_ON_ERROR);
        assertSame('Home', $page['component']);
    }

    public function staleVersionForcesFullReload(FunctionalTester $tester): void
    {
        $response = $tester->sendRequest(
            new ServerRequest(uri: 'http://localhost/', headers: [
                'X-Inertia' => 'true',
                'X-Inertia-Version' => 'stale',
            ]),
        );

        assertSame(409, $response->getStatusCode());
        assertSame('http://localhost/', $response->getHeaderLine('X-Inertia-Location'));
    }
}
