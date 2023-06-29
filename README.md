# @ts-defold/create
<a href="https://github.com/ts-defold/create/actions/workflows/main.yml"><img alt="CI" src="https://github.com/ts-defold/create/actions/workflows/main.yml/badge.svg"></a>
<a href="https://discord.gg/eukcq5m"><img alt="Chat with us!" src="https://img.shields.io/discord/766898804896038942.svg?colorB=7581dc&logo=discord&logoColor=white"></a>

<p align="center">
  <img src="docs/hero.png">
</p>

```sh
> npm init @ts-defold <project-directory>
```
```sh
> npm init @ts-defold my-game -- --template war-battles
```

## Templates
By default the CLI will search for templates on [github](https://github.com/search?q=tsd-template&type=repositories) that follow the pattern `tsd-template-*`. i.e. `--template war-battles` resolves to [tsd-template-war-battles](https://github.com/ts-defold/tsd-template-war-battles).

As an alternative, you may also supply a zip archive either from a local path or remote url to seed the project with.
