# Frontend

| | |
|---|---|
| Framework | React 19 with the automatic JSX runtime |
| Routing and data | Inertia.js 3 (`@inertiajs/react`) |
| Components | [shadcn/ui](https://ui.shadcn.com) (Radix UI), [Tabler](https://tabler.io/icons) and [Lucide](https://lucide.dev) icons |
| Styling | Tailwind CSS 4, configured in CSS |
| Tables and charts | TanStack Table 9, Recharts 3 |
| Toasts | Sonner |
| Build | Vite 8 |

All frontend code lives in `assets/react/src`, and `@/` is an alias for that directory.

## The Inertia app

`assets/react/src/main.jsx` creates the app:

- **Pages** are resolved from `pages/**/*.jsx` and loaded on demand, so each page is a separate chunk. The landing
  page does not download the dashboard's chart library.
- **Titles** come from `<Head title="...">` in each page, formatted as `Title - Yii3 React Starter Kit`.
- **Toasts** show flash messages from the server (see [Pages, forms and validation](pages-and-forms.md#flash-messages-and-toasts)).

## shadcn/ui components

Components in `components/ui` come from the shadcn CLI. `components.json` in the project root configures it for this
project (JavaScript, the `new-york` style, and the aliases above), so you can add more:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add calendar popover
```

The files are yours to edit. A few were changed after installing:

- `checkbox.jsx` shows a dash for the indeterminate state.
- `sonner.jsx` uses the kit's `useTheme()` hook instead of `next-themes`.

Blocks from [ui.shadcn.com/blocks](https://ui.shadcn.com/blocks) can be added the same way. The CLI writes their page
files for a Next.js layout, so move the page content into `pages/` and delete what it created outside
`assets/react/src`.

## Theming

`assets/react/src/app.css` holds the whole theme:

- **Colors** are CSS variables in the shadcn/ui neutral theme, in OKLCH, under `:root` for light and `.dark` for dark.
  Change them, or paste a theme generated at [ui.shadcn.com/themes](https://ui.shadcn.com/themes).
- **`@theme inline`** maps the variables to Tailwind utilities, so `bg-primary` and `text-muted-foreground` follow
  the theme.
- **Fonts** are Geist and Geist Mono, bundled from `@fontsource-variable`, so no font CDN is used.

Tailwind CSS 4 has no `tailwind.config.js`. Add design tokens with `@theme` in `app.css`.

## Dark mode

The theme is `light`, `dark` or `system`, stored in `localStorage` under `theme`.

- `src/views/inertia.php` applies it before React loads, so the page never flashes the wrong theme.
- `hooks/use-theme.js` reads and changes it, and keeps every component that uses the hook in sync:

```jsx
import { useTheme } from "@/hooks/use-theme"

const { theme, resolvedTheme, setTheme } = useTheme()
setTheme("dark")
```

- The `dark:` variant applies inside any element with the `dark` class.

## Vite

| Command | Result |
|---|---|
| `npm run dev` | Dev server with hot module replacement on port 5173, or `VITE_PORT` |
| `npm run build` | Hashed production assets and `manifest.json` in `public/dist` |

In `vite.config.js`:

- Built assets use the `/dist/` base URL, and the dev server serves from its own root.
- `publicDir` is off, because `public/` is PHP's web root rather than static files for Vite.
- A small plugin writes `public/hot` while the dev server runs. PHP reads it to decide between the dev server and the
  build (see [Getting started](getting-started.md#how-the-dev-server-is-detected)).
