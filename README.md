# monorepo-publish-action ✨

A GitHub action to publish packages of a monorepo.
The action is based on the library [workspaces-publish](https://github.com/tada5hi/workspaces-publish).

## Action inputs

| Name       | Description                   | Default                       |
|------------|-------------------------------|-------------------------------|
| `token`    | Token for the registry        |                               |
| `registry` | Registry address              | `https://registry.npmjs.org/` |
| `cwd`      | Directory of the root package | `.`                           |

## Usage

It is important that before this action step is executed, additional steps are performed, 
such as node installation, checkout of the repo, building the packages, 
as well as incrementing the version of the packages

```yaml
uses: tada5hi/monorepo-publish-action@v1
with:
    token: ${{ secrets.NPM_TOKEN }}
```

### release-please

The action can also be used in combination with [release-please](https://github.com/googleapis/release-please),
as release-please only increases the versions in the monorepo, but does not release the packages.

```yaml
on:
    push:
        branches:
            - main

permissions:
    contents: write
    pull-requests: write

jobs:
    release:
        runs-on: ubuntu-latest
        steps:
            -   uses: google-github-actions/release-please-action@v4
                id: release
                with:
                    token: ${{ secrets.GITHUB_TOKEN }}

            -   name: Checkout
                if: steps.release.outputs.releases_created == 'true'
                uses: actions/checkout@v4

            -   name: Install Node.JS
                if: steps.release.outputs.releases_created == 'true'
                uses: actions/setup-node@v4
                with:
                    node-version: 18
            
            -   name: Install dependencies
                if: steps.release.outputs.releases_created == 'true'
                run: npm ci

            -   name: Publish
                if: steps.release.outputs.releases_created == 'true'
                uses: tada5hi/monorepo-publish-action@v1
                env:
                    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```
