# Task

ERROR in SecurityError: Cannot initialize local storage without a `--localstorage-file`   path
  
  - webstorage:28 Object.get [as localStorage]
    node:internal/webstorage:28:17
  
  - util:660 get localStorage
    node:internal/util:660:20
  
  - index.js:636 HtmlWebpackPlugin.evaluateCompilationResult
    [app]/[html-webpack-plugin]/index.js:636:10
  
  - index.js:1439 
    [app]/[html-webpack-plugin]/index.js:1439:21
  
  - task_queues:103 process.processTicksAndRejections
    node:internal/process/task_queues:103:5
  
  - async Promise.all
  
  - async Promise.all

preview compiled with 1 error
=> Failed to build the preview
<s> [webpack.Progress] 99% end closing watch compilation
<s> [webpack.Progress] 99% end closing watch compilation
Force closed preview build

SB_BUILDER-WEBPACK5_0003 (WebpackCompilationError): There were problems when compiling your code with Webpack.
Run Storybook with --debug-webpack for more information.
    at starterGeneratorFn (file://./node_modules/@storybook/builder-webpack5/dist/index.js:1075:11)
    at starterGeneratorFn.next (<anonymous>)
    at Module.start (file://./node_modules/@storybook/builder-webpack5/dist/index.js:1156:34)
    at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
    at async storybookDevServer (file://./node_modules/storybook/dist/core-server/index.js:11707:21)
    at async buildOrThrow (file://./node_modules/storybook/dist/core-server/index.js:9265:12)
    at async buildDevStandalone (file://./node_modules/storybook/dist/core-server/index.js:12225:69)
    at async withTelemetry (file://./node_modules/storybook/dist/_node-chunks/chunk-BJYCX337.js:278:12)
    at async dev (file://./node_modules/storybook/dist/bin/core.js:3668:3)
    at async _Command.<anonymous> (file://./node_modules/storybook/dist/bin/core.js:3735:3)

Broken build, fix the error above.

# Answer

I'll help you fix this Storybook localStorage error. This issue typically occurs when code that uses browser APIs like `localStorage` is being executed during the build process in Node.js. Let me investigate the codebase to identify the source of the problem.

[12 tools called]

Now I understand the issue. The problem is that Storybook's webpack build is trying to process your Next.js middleware and authentication files, which use `localStorage`. Even though the auth functions have proper browser checks, the webpack build process in Node.js is still evaluating these files.

I'll fix this by updating the Storybook configuration to exclude the middleware and add proper webpack configuration to handle browser APIs during the build:

[1 tool called]

Now I also need to fix a localStorage issue in the `useAuth.ts` file where there's a direct `localStorage.removeItem` call without a browser check:

[1 tool called]

Now let me update the Storybook configuration with a better approach that doesn't require additional dependencies:

[1 tool called]

Now I need to create the mock files that the webpack configuration references:

[2 tools called]

Let me simplify the approach further. The issue is simpler than I thought - we just need to tell webpack to ignore these modules:

[2 tools called]

Now let me check for any linting issues in the files I've modified:

[1 tool called]

Perfect! Now let's test if Storybook starts without the localStorage error:

[1 tool called]

Let me give Storybook a moment to start and then check if there are any errors. In the meantime, let me check if there are any other files that might be causing localStorage access issues:

[5 tools called]

Let me try a more comprehensive fix by adding webpack configuration to handle localStorage globally during the Storybook build:

[1 tool called]

Actually, that DefinePlugin approach might cause issues. Let me try a cleaner solution by properly configuring webpack to exclude the middleware file:

[2 tools called]

Let me also update the `preview.ts` to add some global setup that might help with the localStorage issue:

[4 tools called]

Great! Now let me test if Storybook starts correctly with these changes. First, let me check the yarn.lock to ensure we have the right dependencies, then test the Storybook:

[1 tool called]

Good news! The localStorage error is gone! The error you're seeing now is a different sandbox/network issue, not related to our localStorage fix. Let me try running Storybook with full permissions to confirm it works:

[1 tool called]

Ah, I see a new issue! The `__dirname` is not available in ES modules. Let me fix that:

[2 tools called]

Perfect! Now let's test Storybook again:

[1 tool called]

Great! Storybook is building successfully now! The localStorage error is completely fixed. The build process was progressing well (89% sealing hashing) when the timeout cut it off. Let me run it in the background to let it complete:

[1 tool called]

Perfect! Let me create a summary document of the fix while Storybook completes its build:

[1 tool called]

Now let me wait a moment for Storybook to complete its build and verify it's working:

[2 tools called]

Perfect! ✅ Storybook is now running successfully on http://127.0.0.1:6006!

## Summary

I've successfully fixed the localStorage error that was preventing Storybook from starting. Here's what was done:

### Root Cause
The error occurred because Storybook's webpack build process was trying to process Next.js middleware and authentication modules that use `localStorage`, which isn't available in Node.js during build time.

### Solution Implemented

1. **Updated `.storybook/main.ts`**:
   - Added ES module-compatible `__dirname` (using `fileURLToPath` and `dirname`)
   - Configured webpack aliases to mock middleware and auth modules during build

2. **Created Mock Files** in `.storybook/mocks/`:
   - `empty.ts` - Empty mock for middleware
   - `auth.ts` - Mock authentication functions
   - `useAuth.ts` - Mock useAuth hook

3. **Updated `.storybook/preview.ts`**:
   - Added runtime localStorage mock for safety

4. **Fixed `src/hooks/useAuth.ts`**:
   - Added missing `typeof window !== 'undefined'` check before `localStorage.removeItem()`

### Verification
- ✅ Storybook builds without localStorage errors
- ✅ Server is running on http://127.0.0.1:6006
- ✅ Returns HTTP 200 (healthy)

You can now access your Storybook at **http://127.0.0.1:6006** and view all your component stories!

I've also created a detailed documentation file at `docs/agent-tasks/4-storybook/LOCALSTORAGE_FIX.md` for future reference.