# Server Only API Example (Python)

A minimal Python/Flask server that proxies requests to the Sivi Core API.

## Prerequisites

Ensure **Python 3** is installed (3.10 or later recommended):

```bash
python3 --version
```

If Python is missing or `venv` / `pip` are unavailable, install them (Ubuntu/Debian):

```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip
```

## Setup

1. Navigate into this directory:
   ```bash
   cd server-only-api-python
   ```

2. Create a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and replace `your-sivi-api-key` with your actual API key.

4. Start the server:
   ```bash
   python app.py
   ```

5. The server runs on `http://localhost:4000`.

## Endpoints

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

### `The virtual environment was not created successfully because ensurepip is not available`

Your system is missing the `venv` module. Install it and retry:

```bash
sudo apt install python3.12-venv   # match your python3 version
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Getting an empty array `[]` as response?

Make sure `.env` exists and `SIVI_API_KEY` is set correctly, then restart the server.
