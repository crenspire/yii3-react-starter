<?php

declare(strict_types=1);

namespace App\Tests\Support;

use App\Environment;
use HttpSoft\Message\ServerRequest;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Yiisoft\Yii\Runner\Http\HttpApplicationRunner;

use function dirname;
use function explode;
use function json_decode;
use function json_encode;
use function preg_match;
use function rawurldecode;
use function session_create_id;
use function session_id;
use function session_status;
use function strpos;
use function substr;

/**
 * Inherited Methods
 *
 * @method void wantToTest($text)
 * @method void wantTo($text)
 * @method void execute($callable)
 * @method void expectTo($prediction)
 * @method void expect($prediction)
 * @method void amGoingTo($argumentation)
 * @method void am($role)
 * @method void lookForwardTo($achieveValue)
 * @method void comment($description)
 * @method void pause($vars = [])
 *
 * @SuppressWarnings(PHPMD)
*/
class FunctionalTester extends \Codeception\Actor
{
    use _generated\FunctionalTesterActions;

    /**
     * Define custom actions here
     */

    public function sendRequest(ServerRequestInterface $request): ResponseInterface
    {
        // PHP keeps the session ID for the whole process. Start a new session for requests without a session
        // cookie, as a new browser would, so tests don't share session data.
        if (!isset($request->getCookieParams()['PHPSESSID']) && session_status() !== PHP_SESSION_ACTIVE) {
            session_id(session_create_id());
        }

        $runner = new HttpApplicationRunner(
            rootPath: dirname(__DIR__, 2),
            environment: Environment::appEnv(),
        );

        $response = $runner->runAndGetResponse($request);

        $body = $response->getBody();
        if ($body->isSeekable()) {
            $body->rewind();
        }

        return $response;
    }

    /**
     * Returns the Inertia page object embedded in a root view response.
     *
     * @return array{component: string, props: array<string, mixed>, url: string, version: string}
     */
    public function extractPage(string $html): array
    {
        if (preg_match('~<script data-page="app" type="application/json">(.*?)</script>~s', $html, $matches) !== 1) {
            throw new RuntimeException('The response does not contain an Inertia page object.');
        }

        /** @var array{component: string, props: array<string, mixed>, url: string, version: string} */
        return json_decode($matches[1], true, flags: JSON_THROW_ON_ERROR);
    }

    public function currentVersion(): string
    {
        // Send the cookies along: PHP keeps the session ID for the whole test process, so a cookie-less request
        // would reuse the current session and rotate its CSRF token.
        return $this->version ??= $this->extractPage(
            (string) $this->sendRequest(new ServerRequest(cookieParams: $this->cookies, uri: '/'))->getBody(),
        )['version'];
    }

    private ?string $version = null;

    /** @var array<string, string> Cookies kept between {@see visit()} calls, like a browser. */
    private array $cookies = [];

    /**
     * Sends a request like a browser running the Inertia client: cookies persist between calls, and non-GET
     * requests carry the XSRF token and a JSON body.
     *
     * @param array<string, mixed>|null $data JSON body for POST, PUT and DELETE requests.
     * @param bool $inertia Whether to send the request as an Inertia visit.
     */
    public function visit(string $method, string $uri, ?array $data = null, bool $inertia = true): ResponseInterface
    {
        $headers = ['Referer' => 'http://localhost' . $uri];
        if ($inertia) {
            $headers['X-Inertia'] = 'true';
            $headers['X-Inertia-Version'] = $this->currentVersion();
        }
        if ($method !== 'GET') {
            $headers['Content-Type'] = 'application/json';
            if (isset($this->cookies['XSRF-TOKEN'])) {
                $headers['X-XSRF-TOKEN'] = rawurldecode($this->cookies['XSRF-TOKEN']);
            }
        }

        $request = new ServerRequest(
            cookieParams: $this->cookies,
            method: $method,
            uri: 'http://localhost' . $uri,
            headers: $headers,
        );
        if ($data !== null) {
            $request->getBody()->write(json_encode($data, JSON_THROW_ON_ERROR));
            $request->getBody()->rewind();
        }

        $response = $this->sendRequest($request);
        foreach ($response->getHeader('Set-Cookie') as $cookie) {
            [$pair] = explode(';', $cookie, 2);
            $separator = strpos($pair, '=');
            if ($separator !== false) {
                $this->cookies[substr($pair, 0, $separator)] = substr($pair, $separator + 1);
            }
        }

        return $response;
    }

    /**
     * Returns the page object from an Inertia JSON response or a root view response.
     *
     * @return array{component: string, props: array<string, mixed>, url: string, version: string}
     */
    public function page(ResponseInterface $response): array
    {
        $body = (string) $response->getBody();
        if ($response->getHeaderLine('X-Inertia') === 'true') {
            /** @var array{component: string, props: array<string, mixed>, url: string, version: string} */
            return json_decode($body, true, flags: JSON_THROW_ON_ERROR);
        }

        return $this->extractPage($body);
    }

    /**
     * Signs in through the login form.
     */
    public function login(string $email = 'olivia.martin@example.com'): void
    {
        $this->visit('GET', '/login', inertia: false);
        $this->visit('POST', '/login', ['email' => $email, 'password' => 'password123']);
    }
}
