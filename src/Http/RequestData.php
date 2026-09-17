<?php

declare(strict_types=1);

namespace App\Http;

use Psr\Http\Message\ServerRequestInterface;

use function is_array;
use function json_decode;

/**
 * Reads submitted data from a request. The Inertia client sends JSON unless the form contains files.
 */
final class RequestData
{
    /**
     * @return array<string, mixed>
     */
    public static function from(ServerRequestInterface $request): array
    {
        $parsed = $request->getParsedBody();
        if (is_array($parsed) && $parsed !== []) {
            /** @var array<string, mixed> */
            return $parsed;
        }

        $decoded = json_decode((string) $request->getBody(), true);

        /** @var array<string, mixed> */
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Returns a trimmed string value, or an empty string when the field is missing or not a string.
     *
     * @param array<string, mixed> $data
     */
    public static function string(array $data, string $key): string
    {
        $value = $data[$key] ?? '';

        return is_string($value) ? trim($value) : '';
    }
}
