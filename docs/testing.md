# Testing and code quality

## Test suites

The kit uses [Codeception](https://codeception.com) with four suites:

| Suite | Directory | What it tests |
|---|---|---|
| Unit | `tests/Unit` | Classes in isolation |
| Functional | `tests/Functional` | Full HTTP requests through the application, without a web server |
| Console | `tests/Console` | Console commands |
| Web | `tests/Web` | Pages through a real PHP server with PhpBrowser |

The functional and web tests render the root view, which needs a frontend build:

```bash
npm run build
APP_ENV=test composer test
```

Run one suite or one test:

```bash
APP_ENV=test vendor/bin/codecept run Functional
APP_ENV=test vendor/bin/codecept run Functional AuthCest:loginOpensDashboard
```

In Docker, `make test` runs everything in the test environment, and `make test-coverage` writes an HTML coverage
report to `tests/_output`.

## Testing Inertia pages

`tests/Support/FunctionalTester.php` behaves like a browser running the Inertia client:

- `visit($method, $uri, $data)` keeps cookies between requests and sends the XSRF token and a JSON body for
  POST, PUT and DELETE. Pass `inertia: false` for a first visit that returns HTML.
- `page($response)` returns the page object from a JSON or HTML response.
- `login()` signs in through the login form.

```php
final class ReportsCest
{
    public function _before(FunctionalTester $I): void
    {
        $I->login();
    }

    public function listsReports(FunctionalTester $I): void
    {
        $page = $I->page($I->visit('GET', '/admin/reports'));

        assertSame('Reports', $page['component']);
    }

    public function validatesTitle(FunctionalTester $I): void
    {
        $I->visit('POST', '/admin/reports', ['title' => '']);

        $errors = $I->page($I->visit('GET', '/admin/reports'))['props']['errors'];
        assertSame('Title cannot be blank.', $errors['title']);
    }
}
```

See `tests/Functional/AuthCest.php` and `tests/Functional/AdminUsersCest.php` for more examples.

### Web tests on another port

The web suite starts `composer serve` on port 8080. If that port is taken, start a server yourself and point the suite
at it:

```bash
APP_ENV=test php -S 127.0.0.1:8081 -t public public/index.php
APP_ENV=test vendor/bin/codecept run Web -o "extensions: enabled: []" -o "modules: config: PhpBrowser: url: http://127.0.0.1:8081"
```

## Code quality

| Command | Tool | Configuration |
|---|---|---|
| `composer psalm` | [Psalm](https://psalm.dev) at level 1 | `psalm.xml` |
| `composer cs-check` | [PHP CS Fixer](https://cs.symfony.com), PER-CS 2.0 rules | `.php-cs-fixer.php` |
| `composer cs-fix` | Applies the code style fixes | `.php-cs-fixer.php` |
| `composer rector` | [Rector](https://getrector.com), PHP 8.2 rules | `rector.php` |
| `composer dependency-analyser` | Finds unused and undeclared Composer dependencies | `composer-dependency-analyser.php` |
| `composer audit` | Checks dependencies for security advisories | |

`composer.json` pins the platform to PHP 8.2, so `composer update` only installs packages that run on the lowest
supported PHP version, even if you develop on a newer one.
