# Client SDK with User Management - Vanilla JS Example

A plain HTML/JavaScript example that combines the Sivi SDK with a user management backend.

## Structure

- `client-app/` - Plain HTML/JS frontend with Sivi SDK integration
- `user-mgmt-server/` - Express backend that proxies user management API calls

## Setup

### 1. Backend (User Management Server)

```bash
cd user-mgmt-server
yarn install
cp .env.example .env
# Edit .env with your SIVI_API_KEY and SIVI_AUTH_URL
yarn start
```

Server runs on `http://localhost:4000`.

### 2. Frontend (Client App)

Serve the `client-app` folder with any static file server:

```bash
cd client-app
npx serve .
# or
python3 -m http.server 3000
```

Open `http://localhost:3000` in your browser.

## Features

- **Design Tab**: Layout-based design generation with Sivi SDK
- **User Management Tab**: Login/create users, delete users, and set credit limits
