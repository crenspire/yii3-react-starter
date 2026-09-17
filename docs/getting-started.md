# Getting started

## Requirements

- PHP 8.2 or later with the `session` extension
- Composer 2
- Node.js 20.19+ or 22.12+ and npm
- Docker (optional)

## Installation

```bash
git clone https://github.com/crenspire/yii3-react-starter.git
cd yii3-react-starter
composer install
npm install
```

## Running the app

Run the PHP server and the Vite dev server in two terminals:

```bash
APP_ENV=dev APP_DEBUG=true composer serve   # http://localhost:8080
npm run dev                                 # Vite on http://localhost:5173
```

Open http://localhost:8080. To see the admin area, go to `/login` and sign in with any email and a password of at
least 8 characters. See [Admin area and authentication](admin-and-auth.md) for why that works.

`APP_ENV` is required and must be `dev`, `test` or `prod`. The app refuses to start without it.

### How the dev server is detected

While `npm run dev` is running, Vite writes its URL to `public/hot`. The root view (`src/views/inertia.php`) sees the
file and loads scripts from the dev server with hot module replacement. When Vite stops, it deletes the file, and the
root view falls back to the production build in `public/dist`.

- Run `npm run build` if you want to use the app without the dev server.
- Start Vite on another port with `VITE_PORT=5174 npm run dev`. The hot file tells PHP the new URL.

## Running in Docker

The development image runs FrankenPHP with Xdebug:

```bash
make build
make up        # http://localhost, or the DEV_PORT set in docker/.env
make shell     # a shell inside the container
make down
```

Run `npm run dev` on the host, not in the container. The project directory is mounted into the container, so PHP
sees `public/hot` and the browser loads assets from Vite on your machine.

Useful targets:

| Command | Description |
|---|---|
| `make yii <command>` | Run a console command, for example `make yii hello` |
| `make composer <args>` | Run Composer in the container |
| `make test` | Run the Codeception suites in the test environment |
| `make psalm`, `make cs-fix`, `make rector` | Code quality tools |
| `make help` | List all targets |

To open files from error pages in your IDE, copy `docker/dev/override.env.example` to `docker/dev/override.env` and
set `APP_HOST_PATH` to the project path on your machine.

## Next steps

- [Architecture](architecture.md) explains how the pieces fit together.
- [Pages, forms and validation](pages-and-forms.md) walks through adding your first page.
