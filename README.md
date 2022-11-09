# prosemirror-adapter

An universal adapter for [ProseMirror](https://prosemirror.net/) to use it with modern UI frameworks. (React, Vue and more coming soon)

## What is this?

[Prosemirror](https://github.com/ProseMirror/prosemirror) is a toolkit to build modern rich text editors.  But it is not a good fit for a modern UI framework like React or Vue. This adapter is a low level tool to make it work with them without pain. You'll need this adapter if you want to use Prosemirror to build a rich text editor with complex UI in React or Vue.

### What's on the Plan?

- [x] Support Popular UI Frameworks
  - [x] [React](https://reactjs.org/)
  - [x] [Vue](https://vuejs.org/)
  - ...coming soon
- [x] Add out of box support for prosemirror features
  - [x] [Prosemirror Node View](https://prosemirror.net/docs/ref/#view.NodeView)
  - [ ] [Prosemirror Mark View](https://prosemirror.net/docs/ref/#view.MarkViewConstructor)
  - [ ] [Prosemirror Plugin View](https://prosemirror.net/docs/ref/#state.PluginView)
  - [ ] [Prosemirror Widget Decoration](https://prosemirror.net/docs/ref/#view.Decoration%5Ewidget)

## Supported UI frameworks

- [x] [React](/packages/react)
- [x] [Vue](/packages/vue)

## Contributing

Follow our [contribution guide](/CONTRIBUTING.md) to learn how to contribute to milkdown.

## License

[MIT](/LICENSE)
