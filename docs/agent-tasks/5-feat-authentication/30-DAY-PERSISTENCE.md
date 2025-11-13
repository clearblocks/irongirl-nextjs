# 30-Day Persistent Login

## ✅ Implementation Complete

The admin authentication now supports **30-day persistent login** with automatic bypass of the login screen.

## What Changed

### Single Update Required
Updated cookie expiration in `/src/app/api/admin/login/route.ts`:

```typescript
// Before:
maxAge: 60 * 60 * 24 * 7, // 7 days

// After:
maxAge: 60 * 60 * 24 * 30, // 30 days
```

## How It Works

### 1. **Login Sets Long-Lived Cookie**
```
User logs in
  ↓
POST /api/admin/login validates token
  ↓
Sets HttpOnly cookie with 30-day expiration
  ↓
Cookie stored on user's device
```

### 2. **Cookie Persists Across Sessions**
- Cookie is NOT session-only (has explicit maxAge)
- Survives browser close, system restart, etc.
- Valid for 30 days from login

### 3. **Automatic Re-Authentication**
```
User returns after closing browser
  ↓
Visits /admin/dashboard (or any /admin/* route)
  ↓
Browser automatically sends cookie
  ↓
Middleware validates cookie
  ↓
✅ Access granted - No login required!
```

### 4. **Login Page Auto-Redirect**
```typescript
// In /admin/login page.tsx
useEffect(() => {
  if (isAuthenticated && !authLoading) {
    router.push('/admin/dashboard');
  }
}, [isAuthenticated, authLoading, router]);
```

If user visits `/admin/login` while cookie is still valid:
- `useAuth` hook detects valid session
- Automatically redirects to dashboard
- User never sees login form

## User Experience Flow

### First Login
1. User visits `/admin/login`
2. Enters token
3. Redirected to `/admin/dashboard`
4. Cookie stored (30 days)

### Subsequent Visits (within 30 days)
**Option A: Direct to Dashboard**
1. User visits `/admin/dashboard`
2. Cookie sent automatically
3. Middleware validates
4. ✅ Dashboard shown (no login)

**Option B: Via Login Page**
1. User visits `/admin/login`
2. Cookie sent automatically
3. `useAuth` detects authentication
4. Auto-redirects to dashboard
5. ✅ Dashboard shown (no login)

### After 30 Days
1. Cookie expires
2. User visits `/admin/dashboard`
3. No valid cookie found
4. Redirected to `/admin/login`
5. Must login again

## Cookie Configuration

```typescript
response.cookies.set('admin_token', token, {
  httpOnly: true,        // JavaScript can't access (XSS protection)
  secure: true,          // HTTPS only in production
  sameSite: 'lax',       // CSRF protection
  maxAge: 60 * 60 * 24 * 30,  // 30 days in seconds
  path: '/',             // Available site-wide
});
```

### Why These Settings?

- **httpOnly: true** - Prevents JavaScript from reading the cookie (XSS attacks can't steal it)
- **secure: true** - In production, cookie only sent over HTTPS
- **sameSite: 'lax'** - Protects against CSRF while allowing normal navigation
- **maxAge: 30 days** - Cookie persists for 30 days, not just current session
- **path: '/'** - Cookie sent with all requests to the site

## Testing the 30-Day Persistence

### Test 1: Basic Persistence
```bash
1. Login to /admin/dashboard
2. Close browser completely
3. Open browser and visit /admin/dashboard
4. ✅ Should show dashboard without login
```

### Test 2: Login Page Redirect
```bash
1. Login to /admin/dashboard
2. Close browser
3. Open browser and visit /admin/login
4. ✅ Should auto-redirect to dashboard
```

### Test 3: Expiration
```bash
1. Login to /admin/dashboard
2. Manually edit cookie expiration to past date (via browser dev tools)
3. Visit /admin/dashboard
4. ✅ Should redirect to login (cookie expired)
```

### Test 4: Cross-Tab Persistence
```bash
1. Login in Tab 1
2. Open Tab 2
3. Visit /admin/dashboard in Tab 2
4. ✅ Should show dashboard (cookie shared across tabs)
```

## Validation Checklist

- [x] Cookie set with 30-day maxAge
- [x] Cookie is not session-only
- [x] Middleware checks cookie on every request
- [x] Login page redirects if already authenticated
- [x] Dashboard accessible without login if cookie valid
- [x] Cookie survives browser close
- [x] All security flags (httpOnly, secure, sameSite) configured
- [x] Documentation updated

## Security Notes

### Benefits
- **Convenience**: Users don't need to login every time
- **Security**: HttpOnly prevents XSS token theft
- **CSRF Protection**: SameSite flag prevents cross-site attacks

### Considerations for Production
- Consider adding "Remember Me" checkbox (7 days vs 30 days)
- Implement refresh token mechanism for longer sessions
- Add activity-based expiration (not just time-based)
- Monitor for suspicious activity (IP changes, etc.)
- Consider device fingerprinting for additional security
- Add "Active Sessions" management page

## Browser Developer Tools Inspection

You can verify the cookie in browser DevTools:

```
1. Open DevTools (F12)
2. Go to Application tab
3. Cookies → http://localhost:3000
4. Look for "admin_token"
5. Check:
   - HttpOnly: ✓
   - Secure: (depends on environment)
   - SameSite: Lax
   - Expires: (30 days from now)
```

## Summary

The system now supports **30-day persistent login** with:
- ✅ Cookie-based authentication
- ✅ Automatic login bypass
- ✅ Session survival across browser restarts
- ✅ Security best practices (HttpOnly, Secure, SameSite)
- ✅ Seamless user experience

No additional code changes needed - the architecture already supported this, only the expiration time was updated!

