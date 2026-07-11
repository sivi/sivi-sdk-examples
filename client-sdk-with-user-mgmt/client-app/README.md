# Client SDK with User Management

A React + Vite example that combines the Sivi SDK with a user management backend.

## Structure

- `client-app/` - React frontend with Sivi SDK integration
- `user-mgmt-server/` - Express backend that proxies user management API calls

## Setup

### 1. Backend (User Management Server)

```bash
cd user-mgmt-server
yarn install
cp .env.example .env
# Edit .env with your SIVI_API_KEY and SIVI_API_URL
yarn start
```

Server runs on `http://localhost:4000`.

### 2. Frontend (Client App)

```bash
cd client-app
yarn install
cp .env.example .env
yarn dev
```

Client runs on `http://localhost:3000`.

The Vite dev config proxies `/api/*` to the backend server automatically.

## Features

- **Design Tab**: Same layout-based design generation as `client-only-sdk`
- **User Management Tab**: Dropdown to select a flow (Login/Create User, Delete User, Set Credit Limit), input the required fields, submit, and view the JSON response
