# prosemirror-adapter

<p align="center">
    <br/>
    <br/>
    <img src="/assets/logo.svg?raw=true" width="400"/>
    <br/>
    <br/>
</p>

Universal adapter for [ProseMirror](https://prosemirror.net/) to use it with modern UI frameworks. (React, Vue and more coming soon)

![npm](https://img.shields.io/npm/v/@prosemirror-adapter/core)

## What is this?

[Prosemirror](https://github.com/ProseMirror/prosemirror) is a toolkit to build modern rich text editors.  But it is not a good fit for a modern UI framework like React or Vue. This adapter is a low level tool to make it work with them without pain. You'll need this adapter if you want to use Prosemirror to build a rich text editor with complex UI in React or Vue.

### What's on the plan?

- [x] Support Popular UI Frameworks
  - [x] [React](https://reactjs.org/)
  - [x] [Vue](https://vuejs.org/)
  - 🚀 coming soon...
- [x] Add out of box support for prosemirror features
  - [x] [Prosemirror Node View](https://prosemirror.net/docs/ref/#view.NodeView)
  - [ ] [Prosemirror Mark View](https://prosemirror.net/docs/ref/#view.MarkViewConstructor)
  - [ ] [Prosemirror Plugin View](https://prosemirror.net/docs/ref/#state.PluginView)
  - [ ] [Prosemirror Widget Decoration](https://prosemirror.net/docs/ref/#view.Decoration%5Ewidget)

### What's not on the plan?

This package should only take care about building a bridge between prosemirror and UI frameworks. It should be kept as an low level binding.
So something out of this scope will not be considered. For example:

- ❎ We won't provide UI components.
- ❎ We won't provide key bindings.
- ❎ We won't provide schema for special modules like table or math.

## Getting Started

<table>
  <tr>
    <th>react</th>
    <th>vue</th>
  </tr>
  <tr>
    <td>
      <a align="center" title="react" href="/packages/react">
        <img src="/assets/react.svg" width="100" height="100" alt="react">
      </a>
    </td>
    <td>
      <a align="center" title="vue" href="/packages/vue">
        <img src="/assets/vue.svg" width="100" height="100" alt="vue">
      </a>
    </td>
  </tr>
</table>

## Contributing

PR welcome! Follow our [contribution guide](/CONTRIBUTING.md) to learn how to contribute to prosemirror-adapter.

## License

[MIT](/LICENSE)
