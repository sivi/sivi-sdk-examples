<?php

// Load .env file if present (PHP doesn't read .env automatically like Node.js dotenv)
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0 || strpos($line, '=') === false) {
            continue;
        }
        list($key, $value) = explode('=', $line, 2);
        putenv(trim($key) . '=' . trim($value));
        $_ENV[trim($key)] = trim($value);
    }
}

class SiviClient {
    private static function getHeaders(): array {
        $apiKey = getenv('SIVI_API_KEY') ?: '';
        return [
            'Content-Type: application/json',
            'sivi-api-key: ' . $apiKey,
        ];
    }

    private static function getBaseUrl(): string {
        return getenv('SIVI_API_URL') ?: 'https://api.sivi.ai';
    }

    public static function get(string $endpoint, array $queryParams = []): array {
        $url = self::getBaseUrl() . $endpoint;
        if (!empty($queryParams)) {
            $url .= '?queryParams=' . urlencode(json_encode($queryParams));
        }

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, self::getHeaders());
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode >= 400) {
            throw new Exception("Sivi API GET $endpoint failed with status $httpCode: $response");
        }

        return json_decode($response, true) ?? [];
    }

    public static function post(string $endpoint, array $body = []): array {
        $url = self::getBaseUrl() . $endpoint;

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_HTTPHEADER, self::getHeaders());
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode >= 400) {
            throw new Exception("Sivi API POST $endpoint failed with status $httpCode: $response");
        }

        return json_decode($response, true) ?? [];
    }
}
