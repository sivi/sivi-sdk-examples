# Server Only API Example (PHP)

A minimal PHP example that proxies requests to the Sivi Core API.

## Prerequisites

- **PHP 8.x** with the `curl` extension installed
  ```bash
  php -v           # Check PHP version
  php -m | grep curl   # Verify curl extension is loaded
  ```
  If `curl` is missing, install it (Ubuntu/Debian example):
  ```bash
  sudo apt install php8.3-curl -y
  ```

## Setup

1. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and replace `your-sivi-api-key` with your actual API key.

2. Start the local PHP development server:
   ```bash
   php -S localhost:4000
   ```

3. The server runs on `http://localhost:4000`.

> **Note:** The PHP server reads `.env` automatically on startup. If you prefer to use shell environment variables instead, export them before starting the server:
> ```bash
> export SIVI_API_KEY="your-sivi-api-key"
> export SIVI_API_URL="https://api.sivi.ai"
> php -S localhost:4000
> ```

## Endpoints

All routes are handled in `index.php`:

- `POST /designs-from-prompt`
- `POST /designs-from-content`
- `POST /content-from-prompt`
- `GET /get-request-status?requestId=...`
- `GET /get-design-variants?designId=...`
- `POST /update-webhook`

## Example request

```bash
curl -X POST http://localhost:4000/designs-from-prompt \
  -H "Content-Type: application/json" \
  -d '{
    "type": "displayAds",
    "subtype": "displayAds-half-page-ad",
    "dimension": { "width": 300, "height": 600 },
    "prompt": "generate a design for my t-shirt shop for summer campaign with 20% off",
    "language": "english",
    "numOfVariants": 3
  }'
```

## Troubleshooting

### Getting an empty array `[]` as response?

The PHP server was not automatically loading the `.env` file (unlike the Node.js version which uses `dotenv`). This caused the `SIVI_API_KEY` to be empty, and the Sivi API returns `[]` when the key is missing or invalid.

**Fix applied:** `SiviClient.php` now auto-loads `.env` on startup.

If you still see `[]`:
1. Make sure `.env` exists and `SIVI_API_KEY` is set correctly.
2. Restart the PHP server after editing `.env` (Ctrl+C, then `php -S localhost:4000`).
3. Verify the key is loaded by checking `getenv('SIVI_API_KEY')` is not empty.
