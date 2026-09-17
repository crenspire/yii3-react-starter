# Deployment

## Production image

`docker/Dockerfile` builds the production image in three stages:

1. **assets**: Node 22 installs the npm packages and runs `npm run build`.
2. **prod-builder**: installs Composer dependencies without dev packages and with an optimized class map, and copies
   the built assets into `public/dist`.
3. **prod**: a FrankenPHP image with the application, running as `www-data` with `APP_ENV=prod`.

`.dockerignore` keeps local builds, `node_modules`, `vendor` and the hot file out of the image, so the image always
has a clean build.

```bash
make prod-build    # docker build --target prod, tagged ${IMAGE}:${IMAGE_TAG}
make prod-push     # push to your registry
```

Set `IMAGE`, `IMAGE_TAG`, `PROD_HOST` and `PROD_SSH` in `docker/.env`.

## Deploying with Docker Swarm

`make prod-deploy` runs `docker stack deploy` over SSH with `docker/compose.yml` and `docker/prod/compose.yml`:

- Two replicas with rolling updates that start the new container before stopping the old one, and roll back on
  failure.
- [caddy-docker-proxy](https://github.com/lucaslorentz/caddy-docker-proxy) labels route `PROD_HOST` to the app and
  provision HTTPS. The stack expects an external `caddy_public` network.
- The `runtime` directory is a volume, so logs survive deploys.

Put production secrets in `docker/prod/override.env`. It is loaded if present and ignored by Git.

## Before going to production

- [ ] Replace the demo sign-in and session-backed users with real authentication and a database. See
      [Admin area and authentication](admin-and-auth.md#replacing-the-demo-with-real-users).
- [ ] Remove or replace the sample data on the dashboard.
- [ ] Set `APP_DEBUG=false`. The production `.env` already does.
- [ ] Update `repositoryUrl` and the landing page content in `src/Controller/HomePage/Action.php`.
- [ ] Serve the app over HTTPS. The `XSRF-TOKEN` cookie is marked `Secure` on HTTPS requests.

## Long-running workers

The production image runs FrankenPHP in classic mode, where every request is a fresh PHP request. If you switch to
worker mode, or to RoadRunner or Swoole, keep in mind:

- **Sessions:** with `yiisoft/session`, PHP keeps the session ID for the whole worker process. A request without a
  session cookie can then reopen the previous visitor's session. Override the `SessionInterface` definition as
  described in the yii3-inertia workers guide, which also resets the global session ID between requests.
- **Services must be stateless.** The Inertia adapter keeps request data in request attributes, so it is safe in
  workers. Check your own services for state that should not leak between requests.
