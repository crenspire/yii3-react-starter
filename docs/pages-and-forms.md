# Pages, forms and validation

A page is three pieces: a React component, an action that renders it, and a route.

## Adding a page

### 1. The React component

Create `assets/react/src/pages/Reports.jsx`. The file path is the component name, so `pages/Admin/Reports.jsx` would
be `Admin/Reports`. Pages are loaded on demand, so each one becomes its own JavaScript chunk.

```jsx
import { Head } from "@inertiajs/react"
import AdminLayout from "@/layouts/AdminLayout"

export default function Reports({ reports }) {
  return (
    <>
      <Head title="Reports" />
      <div className="flex flex-col gap-4 px-4 py-6 lg:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <ul>
          {reports.map((report) => (
            <li key={report.id}>{report.title}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

// Persistent layout: the sidebar keeps its state when you navigate between admin pages.
Reports.layout = (page) => <AdminLayout>{page}</AdminLayout>
```

For a public page, wrap the content in `@/components/Layout` instead, as `pages/Home.jsx` does.

### 2. The action

Create `src/Controller/Admin/ReportsAction.php`. `Inertia` and other services are injected by the DI container, and
the request is passed to `__invoke()`:

```php
<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final readonly class ReportsAction
{
    public function __construct(
        private Inertia $inertia,
    ) {}

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        return $this->inertia->render($request, 'Reports', [
            'reports' => fn(): array => [
                ['id' => 1, 'title' => 'Monthly revenue'],
            ],
        ]);
    }
}
```

Wrap expensive props in closures. They run only when the prop is sent, which matters for partial reloads.

### 3. The route

Add it to `config/common/routes.php`. Inside the `/admin` group it is protected by `RequireAuthMiddleware`:

```php
Group::create('/admin')
    ->middleware(RequireAuthMiddleware::class)
    ->routes(
        // ...
        Route::get('/reports')
            ->action(Controller\Admin\ReportsAction::class)
            ->name('admin/reports'),
    ),
```

To show the page in the sidebar, add it to `mainNavigation` in `assets/react/src/components/admin/navigation.js`.

## Props

Besides plain values and closures, the adapter supports deferred, optional, merge, once and infinite scroll props:

```php
use Crenspire\Inertia\Inertia;

return $this->inertia->render($request, 'Admin/Dashboard', [
    'stats' => fn() => $this->stats->summary(),
    // Loaded in a second request right after the page renders.
    'activity' => Inertia::defer(fn() => $this->activity->latest()),
    // Only sent when a partial reload asks for it.
    'report' => Inertia::optional(fn() => $this->reports->build()),
]);
```

See the [yii3-inertia README](https://github.com/crenspire/yii3-inertia#props) for every prop type.

### Shared props

Props shared with every page come from two places:

- `sharedProps` in `config/web/params.php`. The kit shares `repositoryUrl`.
- A middleware that calls `Inertia::share()`, like `App\Auth\ShareAuthMiddleware`, which shares `auth.user`.

In React, read them with `usePage().props`.

## Forms

Use Inertia's `useForm()` on the client. It submits JSON, tracks `processing`, and picks up validation errors:

```jsx
import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function ReportForm() {
  const form = useForm({ title: "" })

  const submit = (event) => {
    event.preventDefault()
    form.post("/admin/reports", { preserveScroll: true })
  }

  return (
    <form onSubmit={submit} noValidate>
      <Field data-invalid={!!form.errors.title}>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          value={form.data.title}
          onChange={(event) => form.setData("title", event.target.value)}
          aria-invalid={!!form.errors.title}
        />
        <FieldError>{form.errors.title}</FieldError>
      </Field>
      <Button type="submit" disabled={form.processing}>Create</Button>
    </form>
  )
}
```

The CSRF token is handled for you: the client reads the `XSRF-TOKEN` cookie and sends it with every request.

## Validation and redirects

On the server, read the JSON body with `App\Http\RequestData`, validate with `yiisoft/validator`, and flash errors
before redirecting back. This is the pattern every admin action follows:

```php
use App\Http\RequestData;
use Crenspire\Inertia\Flash\InertiaFlash;
use Crenspire\Inertia\Inertia;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\ValidatorInterface;

final readonly class StoreReportAction
{
    public function __construct(
        private Inertia $inertia,
        private InertiaFlash $flash,
        private ValidatorInterface $validator,
    ) {}

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $data = RequestData::from($request);
        $title = RequestData::string($data, 'title');

        $result = $this->validator->validate(
            ['title' => $title],
            ['title' => [new Required(), new Length(max: 100)]],
        );

        if (!$result->isValid()) {
            // Errors appear in form.errors on the next render.
            $this->flash->errors($result->getFirstErrorMessagesIndexedByProperty());

            return $this->inertia->back($request, '/admin/reports');
        }

        // ... save the report

        $this->flash->flash('success', 'The report was created.');

        return $this->inertia->redirect('/admin/reports');
    }
}
```

- `back()` redirects to the `Referer`, with a fallback URL.
- After PUT, PATCH and DELETE, the middleware turns a 302 into a 303, so the browser follows with a GET.
- `$inertia->location($request, $url)` forces a full page visit, for example to an external site.

## Flash messages and toasts

`$flash->flash('success', '...')` puts a message in the next page object. `assets/react/src/main.jsx` listens for
Inertia's `flash` event and shows `success`, `error` and `message` as [Sonner](https://sonner.emilkowal.ski) toasts.
To show one from the client, call `toast.success('...')` from `sonner`.
