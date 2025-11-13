# Authentication System

This document describes the Bearer token authentication system implemented for the admin area.

## Overview

The application has two main areas:
- **Public Area**: Accessible to everyone (home page, about page)
- **Admin Area**: Protected with Bearer token authentication (admin dashboard)

## Implementation

### 1. Environment Configuration

Add the following to your `.env.local` file:

```env
ADMIN_TOKEN=your-secret-admin-token-change-me-in-production
```

⚠️ **Important**: Make sure to change this token in production and keep it secure!

### 2. API Endpoints

#### POST `/api/admin/login`

Authenticates an admin user by validating their Bearer token.

**Request:**
```http
POST /api/admin/login
Authorization: Bearer your-secret-admin-token
```

**Response:**
- `200 OK`: Authentication successful
  ```json
  {
    "success": true,
    "message": "Authentication successful"
  }
  ```
- `401 Unauthorized`: Invalid or missing token
  ```json
  {
    "error": "Invalid token"
  }
  ```

### 3. Middleware Protection

The middleware (`src/middleware.ts`) automatically protects all routes under `/admin/*` (except `/admin/login`):

- Checks for the `admin_token` cookie (set by the login endpoint)
- Validates the token against the environment variable
- Redirects to `/admin/login` if authentication fails

**Note**: The middleware checks cookies, not the Authorization header, because cookies are automatically sent with browser page navigation requests.

### 4. Client-Side Authentication

#### Auth Utilities (`src/lib/auth.ts`)

Provides helper functions for authentication:
- `setAuthToken(token)`: Store token in localStorage (for client-side state tracking)
- `getAuthToken()`: Retrieve token from localStorage
- `removeAuthToken()`: Remove token from localStorage
- `login(token)`: Authenticate with the server, sets HttpOnly cookie and stores token in localStorage
- `logout()`: Remove token from localStorage and clear server cookie
- `verifyAuth()`: Verify authentication with server (checks HttpOnly cookie)
- `authenticatedFetch(url, options)`: Make authenticated API requests (cookies sent automatically)

**Note**: Authentication is primarily handled via HttpOnly cookies for security. localStorage is used as a secondary indicator for client-side auth state checks.

#### Auth Hook (`src/hooks/useAuth.ts`)

React hook for managing authentication state:
```typescript
const { isAuthenticated, isLoading, login, logout } = useAuth();
```

### 5. Pages

#### Public Pages
- `/` - Home page
- `/about` - About page

#### Admin Pages
- `/admin/login` - Admin login page
- `/admin/dashboard` - Protected admin dashboard

### 6. How It Works

1. **Login Flow:**
   - User visits `/admin/login`
   - User enters admin token
   - Token is sent to `/api/admin/login` endpoint with Bearer authentication
   - Server validates token and sets HttpOnly `admin_token` cookie
   - Token is also stored in localStorage for client-side state tracking
   - User is redirected to `/admin/dashboard`

2. **Protected Route Access:**
   - User tries to access `/admin/dashboard`
   - Middleware checks for valid token in `admin_token` cookie
   - Cookie is automatically sent with the page request by the browser
   - Client-side: `useAuth` hook checks authentication status via `/api/admin/verify`
   - If not authenticated, user is redirected to `/admin/login`

3. **Logout Flow:**
   - User clicks logout button
   - DELETE request sent to `/api/admin/login` to clear the cookie
   - Token is removed from localStorage
   - User is redirected to home page

## Key Security Features

- **HttpOnly Cookies**: Prevents XSS attacks from stealing tokens
- **Secure Flag**: Cookies only sent over HTTPS in production
- **SameSite: lax**: Provides CSRF protection
- **30-day Persistent Login**: Cookie survives browser close, users stay logged in
- **Auto-Login**: Valid cookie bypasses login screen automatically
- **Middleware Protection**: Server-side validation that can't be bypassed
- **Dual Storage**: Cookie (secure) + localStorage (UX state tracking)

## Security Considerations

⚠️ **This is a simplified authentication system for demonstration purposes.**

For production use, consider:
- Using a more secure authentication method (JWT, OAuth, etc.)
- Implementing token expiration and refresh
- Adding rate limiting to prevent brute force attacks
- Using HTTPS to encrypt token transmission
- Implementing CSRF protection
- Adding multi-factor authentication
- Using secure, randomly generated tokens
- Implementing proper session management

## Testing

To test the authentication system:

1. Set up your `.env.local` file with an admin token
2. Start the development server:
   ```bash
   yarn dev
   ```
3. Visit `http://localhost:3000`
4. Click "Admin Login"
5. Enter your token from `.env.local`
6. You should be redirected to the admin dashboard

## Making Authenticated Requests

To make authenticated API requests from the client:

```typescript
import { authenticatedFetch } from '@/lib/auth';

// Example: Fetch protected data
const response = await authenticatedFetch('/api/admin/some-endpoint');
const data = await response.json();
```

The `authenticatedFetch` function ensures cookies are included with `credentials: 'include'`, so the HttpOnly `admin_token` cookie is automatically sent.

## API Endpoints

### POST `/api/admin/login`
Authenticates and sets the HttpOnly cookie.

### DELETE `/api/admin/login`
Clears the authentication cookie (logout).

### GET `/api/admin/verify`
Verifies if the user is authenticated by checking the cookie.


