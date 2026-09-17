<?php

declare(strict_types=1);

namespace App\Tests\Web;

use App\Tests\Support\WebTester;

final class NotFoundHandlerCest
{
    public function nonExistentPage(WebTester $I): void
    {
        $I->wantTo('see the 404 page.');
        $I->amOnPage('/non-existent-page');
        $I->seeResponseCodeIs(404);
        $I->seeInSource('"component":"Error"');
        $I->seeInSource('"path":"\/non-existent-page"');
    }
}
