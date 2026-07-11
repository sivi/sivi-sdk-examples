# Server Only API - Polling Example (Node.js)

A Node.js/Express server that demonstrates how to poll for async job completion when using the Sivi Core API.

## Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Copy `.env.example` to `.env` and fill in your credentials.

3. Start the server:
   ```bash
   yarn start
   ```

4. The server runs on `http://localhost:4000`.

## Endpoints

All core endpoints are available, plus:

- `POST /designs-from-prompt-poll` - Submits a design job and polls until completion, returning the final result directly.

## How polling works

1. Submit a design request (returns a `requestId`).
2. Poll `GET /general/get-request-status` every 10 seconds.
3. When `status === 'completed'`, return the final result.
4. If `status === 'failed'`, return the error.

## Example request

```bash
curl -X POST http://localhost:4000/designs-from-prompt-poll \
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
