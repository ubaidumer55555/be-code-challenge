<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Design Patterns

- **Dependency Injection:** Nest's built-in DI is used to provide services, repositories and other providers (keeps components loosely coupled and easy to test).
- **Modular Design (Feature Modules):** The codebase is organized into modules (`user`, `task`, `invite`, `database`), keeping responsibilities isolated and making the app extensible and maintainable.
- **Singleton (Module/provider scope):** Providers registered in Nest modules (for example `DatabaseService`) are singletons by default and used that way here (single instance per application lifecycle).
- **Layered (Controller → Service → Repository):** Controllers handle HTTP, services contain business logic, and repositories encapsulate persistence (TypeORM). This enforces single responsibility per layer.
- **Repository Pattern:** Data access is centralized in repository classes (`*.repository.ts`), abstracting TypeORM calls and making DB operations easier to test and change.
- **DTOs (Data Transfer Objects):** DTO classes define and validate request shapes (via `class-validator`) and annotate Swagger docs (`@ApiProperty`).
- **Auth: Guard + Strategy + Decorator:** Authentication uses a JWT strategy with a guard, and authorization is expressed via custom decorators (`@Roles`) plus a role guard for declarative access control.

## Run Locally (step-by-step)

1. Clone the repo and install dependencies

```powershell
git clone <repo_url>
cd be-code-challenge
yarn install
```

2. Create environment variables (see list below). For local development you can create a `.env` file in project root.

3. Start the app in watch mode

```powershell
yarn run start:dev
```

4. The server will listen on `PORT` (default `3000`). The application seeds an initial admin user on startup.

Notes:

- The app uses TypeORM with `synchronize: true` for development. For production, disable `synchronize` and use migrations.

## Env variables

- `DATABASE_URL` (required) — full Postgres URL, e.g. `postgres://user:password@localhost:5432/dbname`
- `JWT_SECRET` (required) — secret used to sign JWTs
- `PORT` (optional) — port to run the server, default `3000`

## Seed & Migrations

- Seed: the project seeds an initial admin user automatically on startup via `DatabaseService.seedUsers()`.
- Migrations: this starter currently uses `synchronize: true`. To switch to migrations for production:
  - Set `synchronize: false` in `DatabaseModule` configuration.

## Developer notes — modules & structure

- `src/main.ts`: App bootstrap and global setup.
- `src/database`: Database module, entities, and seed service. `DatabaseModule` configures TypeORM and runs seeding on init.
- `src/user`, `src/task`, `src/invite`: Feature modules following Controller → Service → Repository pattern.
- `src/*.dto.ts`: DTOs define request/response shapes and validation rules.
- `src/*/repository.ts`: Encapsulate DB access using TypeORM repository API.
- `src/util`: Helpers, enums, and custom decorators (auth guard, role decorator) to keep cross-cutting concerns centralized.

Design goals:

- Single responsibility per layer for easier testing and maintenance.
- Keep controllers thin (HTTP handling only), services implement business rules, repositories handle persistence.
- Use typed DTOs and enums to keep runtime validations and API contracts explicit.

## API & Types

- All public API controllers should declare explicit return types. Services and repositories should use TypeScript types and interfaces.

## Swagger (API documentation)

Swagger (OpenAPI) provides an interactive UI to explore and test the application's HTTP endpoints. In this project Swagger is configured during app bootstrap and the docs are served at:

http://localhost:3000/api-docs

Open that URL after starting the server (`yarn run start:dev` by default) to view request/response schemas, examples, and to try API calls.

## Answers to exercise questions (short)

- How are roles enforced? Using a `RoleGuard` and a `roles` decorator applied on controllers/routes.
- How does pagination work? The `getAllTasks` endpoint accepts `offset` and `limit` and the repository uses `findAndCount` with `skip`/`take`.
- How are passwords stored? Passwords are hashed with Argon2 via `hashPassword` helper before saving.

## Code hygiene — comments & formatting

- The codebase should not contain inline or block comments in production files. Use clean, self-documenting code and small functions instead of commented explanations.
- To enforce formatting and simple lint fixes run:

```powershell
yarn run format
yarn run lint
```

- (Optional) To find comments in TypeScript files locally (preview before removing):

```powershell
Select-String -Path .\src\**\*.ts -Pattern "(^\s*//)|(/\*)" -AllMatches
```

- If you want to remove comments automatically, back up your work first. A safer approach is to fix code and re-run linters rather than stripping comments blindly.

## Next steps / Recommendations

- Add TypeORM migrations for production workflows and disable `synchronize`.
- Implement Swagger decorators across controllers to generate complete API docs.
- Consider adding integration tests for auth flows and paginated endpoints.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
