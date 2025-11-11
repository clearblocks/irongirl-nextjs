# Cookie-Based Authentication Fix

## Problem

The initial implementation used Bearer tokens in the `Authorization` header for authentication. However, this approach had a critical flaw:

- **Issue**: Browser page navigation (e.g., clicking links, redirects) doesn't send custom headers like `Authorization`
- **Result**: When users logged in and were redirected to `/admin/dashboard`, the middleware couldn't find the token and redirected them back to login
- **Root Cause**: Confusion between API requests (which can have custom headers) and browser navigation requests (which cannot)

## Solution

Switched to **cookie-based authentication** with HttpOnly cookies:

1. **Login endpoint sets HttpOnly cookie**: When authentication succeeds, the server sets an `admin_token` cookie with `httpOnly: true`
2. **Middleware reads cookie**: The middleware checks for the token in the cookie instead of the Authorization header
3. **Browser sends cookies automatically**: Cookies are automatically included with all requests, including page navigation

## Changes Made

### 1. API Login Endpoint (`src/app/api/admin/login/route.ts`)

```typescript
// On successful authentication, set HttpOnly cookie
response.cookies.set('admin_token', token, {
  httpOnly: true, // Prevent JavaScript access
  secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
  sameSite: 'lax', // CSRF protection
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
});
```

Added DELETE endpoint for logout:
```typescript
export async function DELETE() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.delete('admin_token');
  return response;
}
```

### 2. Middleware (`src/middleware.ts`)

Changed from reading Authorization header to reading cookie:

```typescript
// Before:
const authHeader = request.headers.get('authorization');
const token = authHeader.substring(7);

// After:
const token = request.cookies.get('admin_token')?.value;
```

### 3. Auth Utilities (`src/lib/auth.ts`)

- Added `credentials: 'include'` to all fetch requests to ensure cookies are sent/received
- Updated `verifyAuth()` to call `/api/admin/verify` endpoint (checks cookie)
- Updated `logout()` to be async and call DELETE endpoint to clear cookie
- Added comments explaining dual localStorage + cookie approach

### 4. New Verify Endpoint (`src/app/api/admin/verify/route.ts`)

Created new endpoint for client-side auth verification:
```typescript
export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  // Validate token and return authentication status
}
```

### 5. Auth Hook (`src/hooks/useAuth.ts`)

- Updated `checkAuth()` to use new `verifyAuth()` signature (no token parameter)
- Made `logout()` async to properly await cookie deletion
- Added cleanup logic to remove localStorage if server cookie is invalid

### 6. Dashboard Page

Updated logout handler to be async:
```typescript
const handleLogout = async () => {
  await logout();
  router.push('/');
};
```

## Benefits of Cookie-Based Approach

1. **Works with page navigation**: Cookies are automatically sent with all requests
2. **More secure**: HttpOnly cookies can't be accessed by JavaScript (XSS protection)
3. **Seamless UX**: No need to manually add headers to every navigation
4. **Standard practice**: This is how most web applications handle session authentication

## Security Features

- **HttpOnly**: Prevents XSS attacks from stealing the token
- **Secure flag**: Ensures cookie only sent over HTTPS in production
- **SameSite: lax**: Provides CSRF protection
- **7-day expiration**: Automatic logout after inactivity
- **Dual storage**: Cookie for security, localStorage for client-side state tracking

## Testing

The authentication flow now works as expected:

1. User logs in → Cookie is set
2. User is redirected to dashboard → Cookie is sent automatically
3. Middleware validates cookie → User sees dashboard
4. User logs out → Cookie is cleared
5. User tries to access dashboard → Redirected to login

## Key Takeaway

When implementing authentication in web applications:
- Use **cookies** for authentication state that needs to persist across page navigations
- Use **Authorization headers** for API requests where you have full control over the request
- Remember that browser navigation is different from programmatic fetch requests

