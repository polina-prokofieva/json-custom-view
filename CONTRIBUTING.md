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

Useful scripts:

| Command                | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `npm start`            | Starts the webpack dev server                      |
| `npm run build`        | Builds the production bundle into `build/`         |
| `npm test`             | Runs the Jest test suite                           |
| `npm run lint`         | Runs ESLint                                        |
| `npm run editorconfig` | Checks that files follow the `.editorconfig` rules |

## Making a pull request

1. Fork the repository and create a branch from `main`.
2. Make your change. Add or update tests in `tests/` when you change behaviour.
3. Run `npm run editorconfig`, `npm run lint`, `npm test` and `npm run build` and make sure they all pass. CI runs the same checks on every pull request.
4. If you change the public API or the settings (`src/api.ts`, `src/settings.ts`, `src/types.d.ts`), update `src/api.d.ts` and the settings table in `Readme.md` to match.
5. If you change anything under `src/`, bump the `version` in `package.json` following [semantic versioning](https://semver.org/). Every merge to `main` is published to npm automatically.
6. Open a pull request and fill in the template. Keep each pull request focused on one change.

## Code style

- Source code is written in TypeScript and lives in `src/`.
- Indent with 2 spaces, use LF line endings and end every file with a newline (see `.editorconfig`).
- ESLint settings are in `eslint.config.mjs`.

## License

By contributing, you agree that your contributions will be licensed under the project's [ISC license](https://opensource.org/licenses/ISC).
