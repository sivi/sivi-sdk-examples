# Server Only API Example (Node.js)

A minimal Node.js/Express server that proxies requests to the Sivi Core API.

## Prerequisites

Ensure **Node.js** (18 or later) and **yarn** are installed:

```bash
node -v    # Check Node.js version
yarn -v    # Check yarn version
```

If they are missing, install them (Ubuntu/Debian):

```bash
# Install Node.js (via NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install yarn
npm install -g yarn
```

## Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and replace `your-sivi-api-key` with your actual API key.

3. Start the server:
   ```bash
   yarn start
   # or
   node src/index.js
   ```

4. The server runs on `http://localhost:4000`.

## Endpoints

- `POST /designs-from-prompt` - Generate designs from a text prompt
- `POST /designs-from-content` - Generate designs from structured content
- `POST /content-from-prompt` - Generate marketing content from a prompt
- `GET /get-request-status?requestId=...` - Check async job status
- `GET /get-design-variants?designId=...` - Get design variants
- `POST /update-webhook` - Update webhook URL

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

### `command not found: yarn`

Install yarn globally:
```bash
npm install -g yarn
```

### Getting an empty array `[]` as response?

Make sure `.env` exists and `SIVI_API_KEY` is set correctly, then restart the server.
