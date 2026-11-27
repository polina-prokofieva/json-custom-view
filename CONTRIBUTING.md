# Contributing to json-custom-view

Thank you for your interest in improving json-custom-view! Bug reports, ideas, documentation fixes and pull requests are all welcome.

By taking part in this project you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Reporting bugs and requesting features

- Search the [existing issues](https://github.com/polina-prokofieva/json-custom-view/issues) first, to avoid duplicates.
- Open a new issue using the **Bug report** or **Feature request** template.
- For a bug, include the JSON you passed in, the settings object, what you expected and what happened instead. A small reproduction helps a lot. You can also try it in the [demo app](https://polina-prokofieva.github.io/json-custom-view-app/).
- Please do not report security vulnerabilities in public issues. See [SECURITY.md](SECURITY.md) instead.

## Development setup

You need [Node.js](https://nodejs.org/) 22 or newer and npm.

```sh
git clone https://github.com/polina-prokofieva/json-custom-view.git
cd json-custom-view
npm ci
npm start          # dev server with a demo page
```

The repository is a monorepo using [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces). Every package lives in `packages/`:

| Folder           | Package                   |
| ---------------- | ------------------------- |
| `packages/core`  | `json-custom-view`        |
| `packages/react` | `@json-custom-view/react` |

Run `npm ci` once at the repository root; it installs the dependencies of every package. Useful scripts, also run from the root:

| Command                | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `npm start`            | Starts the webpack dev server for `json-custom-view` |
| `npm run build`        | Builds every package                               |
| `npm test`             | Runs the Jest tests of every package               |
| `npm run lint`         | Runs ESLint                                        |
| `npm run editorconfig` | Checks that files follow the `.editorconfig` rules |

To run a script for one package only, add `--workspace`, for example `npm test --workspace=json-custom-view`. To add a dependency to a package, run `npm install <name> --workspace=<package name>` from the root.

## Making a pull request

1. Fork the repository and create a branch from `main`.
2. Make your change. Add or update tests in the package's `tests/` folder when you change behaviour.
3. Run `npm run editorconfig`, `npm run lint`, `npm test` and `npm run build` and make sure they all pass. CI runs the same checks on every pull request.
4. If you change the public API or the settings of `json-custom-view` (`packages/core/src/api/api.ts`, `packages/core/src/settings.ts`, `packages/core/src/types.d.ts`), update `packages/core/src/api/api.d.ts` and the settings table in `packages/core/README.md` to match.
5. Do not change `version` in any `package.json` or edit `CHANGELOG.md` by hand. Releases are automated (see below).
6. Open a pull request with a [Conventional Commits](https://www.conventionalcommits.org/) title and fill in the template. Keep each pull request focused on one change.

## Pull request titles and releases

Releases are made by [release-please](https://github.com/googleapis/release-please). Pull requests are squash merged, so the pull request title becomes the commit message on `main`, and the title decides the next version. A check fails if the title does not follow Conventional Commits.

| Title starts with                                        | Release         |
| -------------------------------------------------------- | --------------- |
| `fix:`                                                   | patch (1.2.6 → 1.2.7) |
| `feat:`                                                  | minor (1.2.6 → 1.3.0) |
| `feat!:` or `fix!:`, or `BREAKING CHANGE:` in the body   | major (1.2.6 → 2.0.0) |
| `docs:`, `test:`, `chore:`, `ci:`, `build:`, `refactor:` | no release      |

After a releasable change is merged, release-please opens (or updates) a Release PR that bumps the version and updates `CHANGELOG.md`. Nothing is published until a maintainer merges that Release PR; then the package is published to npm automatically.

## Code style

- Source code is written in TypeScript and lives in `src/`.
- Indent with 2 spaces, use LF line endings and end every file with a newline (see `.editorconfig`).
- ESLint settings are in `eslint.config.mjs`.

## License

By contributing, you agree that your contributions will be licensed under the project's [ISC license](https://opensource.org/licenses/ISC).
