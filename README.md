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

### Basic 

```yaml
uses: tada5hi/monorepo-publish-action@v1
with:
    token: ${{ secrets.NPM_TOKEN }}
```
