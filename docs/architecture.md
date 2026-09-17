# Architecture

The kit is a Yii3 application that renders React pages through [Inertia.js](https://inertiajs.com). Yii3 owns
routing, controllers, validation, sessions and security. React owns the UI. There is no separate API: actions return
Inertia responses, and the Inertia client swaps pages without full reloads.

## Request flow

```
Browser
  │  first visit: normal GET          later visits: XHR with X-Inertia header
  ▼
public/index.php → HttpApplicationRunner (yiisoft/config)
  ▼
Middleware (config/web/di/application.php)
  ErrorCatcher → SessionMiddleware → XsrfTokenMiddleware → CsrfTokenMiddleware
  → InertiaMiddleware → ShareAuthMiddleware → FormatDataResponse → RequestCatcherMiddleware → Router
  ▼
Route group middleware, e.g. RequireAuthMiddleware for /admin (config/common/routes.php)
  ▼
Action, e.g. App\Controller\Admin\DashboardAction
  │  $inertia->render($request, 'Admin/Dashboard', $props)
  ▼
Response
  ├─ first visit: HTML from src/views/inertia.php with the page object in a JSON <script> tag
  └─ Inertia visit: JSON page object { component, props, url, version, flash }
  ▼
React: assets/react/src/main.jsx loads pages/Admin/Dashboard.jsx and renders it with the props
```

Requests that match no route go to `App\Handler\NotFound\NotFoundHandler`, which renders the `Error` page with a 404
status, so 404s work for both first visits and Inertia visits.

### What each middleware does

| Middleware | Purpose |
|---|---|
| `ErrorCatcher` | Turns exceptions into error responses |
| `SessionMiddleware` | Starts the session and sets the session cookie |
| `XsrfTokenMiddleware` | Sets the `XSRF-TOKEN` cookie that the Inertia client sends back as `X-XSRF-TOKEN`, and passes it to Yii's CSRF check |
| `CsrfTokenMiddleware` | Rejects POST, PUT, PATCH and DELETE requests without a valid token (422) |
| `InertiaMiddleware` | Handles asset version mismatches (409), turns redirects after PUT, PATCH and DELETE into 303, and adds `Vary: X-Inertia` |
| `ShareAuthMiddleware` | Shares the signed-in user with every page as the `auth` prop |
| `Router` | Matches the route and runs the action |

## Asset versioning

The asset version is a hash of the Vite manifest (`public/dist/manifest.json`). Every page object carries it, and the
client sends it back with each visit. After a deploy the hash changes, `InertiaMiddleware` answers the next visit
with `409 Conflict`, and the client reloads the page to pick up the new JavaScript.

## Configuration

Yii3 merges configuration with [yiisoft/config](https://github.com/yiisoft/config). The plan is in
`config/configuration.php`.

| File | Contents |
|---|---|
| `config/common/params.php` | Application name, charset, locale and aliases |
| `config/common/routes.php` | Routes and route groups |
| `config/common/di/*.php` | Services shared by web and console: logger, router, error handler |
| `config/web/params.php` | Inertia settings: root view, props shared with every page, Vite build directory |
| `config/web/di/application.php` | The middleware stack and the 404 handler |
| `config/console/commands.php` | Console commands |
| `config/environments/{dev,test,prod}/params.php` | Per-environment overrides |

The Inertia adapter registers `Inertia`, `InertiaMiddleware`, `InertiaFlash`, the Vite helper and the asset version
through its own config plugin, so actions can type-hint them without extra definitions. The full list of Inertia
params is in the [yii3-inertia README](https://github.com/crenspire/yii3-inertia#configuration).

### Environment variables

| Variable | Values | Purpose |
|---|---|---|
| `APP_ENV` | `dev`, `test`, `prod` | Required. Selects `config/environments/*` |
| `APP_DEBUG` | `true`, `false` | Detailed error pages and event checks |
| `APP_HOST_PATH` | Path | Maps `/app` in Docker to your host path for IDE links on error pages |
| `APP_C3` | `true`, `false` | Collects code coverage for browser tests |
| `VITE_PORT` | Port | Dev server port, read by `vite.config.js` |

## Project layout

```
assets/react/src/
├── components/        # Landing page sections and Layout
│   ├── admin/         # Admin sidebar, header, cards, chart, users table and forms
│   └── ui/            # shadcn/ui components
├── hooks/             # useTheme, useIsMobile
├── layouts/           # AdminLayout
├── lib/utils.js       # cn() class name helper
├── pages/             # Inertia pages: Home, Error, Auth/Login, Admin/*
├── app.css            # Tailwind CSS 4 entry and theme
└── main.jsx           # Inertia app entry
config/                # Yii3 configuration (see above)
docker/                # Dockerfile and compose files for dev, test and prod
docs/                  # This documentation
public/                # Web root; npm run build writes public/dist
src/
├── Admin/User/        # Demo user repository and form validation
├── Auth/              # Demo auth session and middleware
├── Command/           # Console commands
├── Controller/        # Actions: HomePage, Auth, Admin
├── Handler/NotFound/  # 404 page rendered through Inertia
├── Http/              # Request data helper
├── views/inertia.php  # Inertia root view
└── Environment.php    # Reads APP_ENV, APP_DEBUG and related variables
tests/                 # Codeception suites: Unit, Functional, Console, Web
```
