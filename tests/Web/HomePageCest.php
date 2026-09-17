<?php

declare(strict_types=1);

namespace App\Tests\Web;

use App\Tests\Support\WebTester;

final class HomePageCest
{
    public function base(WebTester $I): void
    {
        $I->wantTo('see the home page rendered by Inertia.');
        $I->amOnPage('/');
        $I->seeResponseCodeIs(200);
        $I->seeElement('#app');
        $I->seeInSource('"component":"Home"');
        $I->seeElement('script[type="module"]');
    }
}
