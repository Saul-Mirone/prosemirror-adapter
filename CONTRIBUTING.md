# Development Workflow

> We use pnpm for development.
> Please make sure you have node.js, npm and pnpm installed on your machine.

After cloning prosemirror-adapter, run `pnpm install` to install dependencies.

To get started:

> If you're using vscode, things are much easier.
> You can just press `Ctrl/Cmd+Shift+b`.

1. Run `pnpm build`.
2. Run `pnpm ex`.

After that,
you may want to play with any packages,
You can watch them through `pnpm --filter=@prosemirror-adapter/xxx start`.

For example, `pnpm --filter=@prosemirror-adapter/core start`.

# License

By contributing to prosemirror adapter, you agree that your contributions will be licensed under its MIT license.
