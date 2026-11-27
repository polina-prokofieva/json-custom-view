<!--
Use a Conventional Commits title, for example "fix: keep empty arrays when hideEmpty is off".
fix = patch release, feat = minor release, feat! = major release, docs/chore/ci/test = no release.
-->

## What does this change?

<!-- A short description of the change and why it is needed. -->

Closes #

## Type of change

- [ ] Bug fix
- [ ] New feature or setting
- [ ] Documentation
- [ ] Build, CI or tooling

## Checklist

- [ ] `npm run editorconfig`, `npm run lint`, `npm test` and `npm run build` pass locally
- [ ] Tests are added or updated for changed behaviour
- [ ] The title follows Conventional Commits (`fix:`, `feat:`, `docs:`, `chore:` ...); versions and changelogs are not edited by hand
- [ ] If the public API or settings changed, `packages/core/src/api/api.d.ts` and the settings table in `packages/core/README.md` are updated
