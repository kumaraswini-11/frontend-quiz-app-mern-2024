# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

===================

/src
|-- /api
| |-- api.js
|
|-- /components
| |-- Login.js
| |-- OtherComponent.js
|
|-- /redux
| |-- /auth
| |-- authSlice.js
| |-- authThunks.js
|
|-- /utils
| |-- middleware.js
|
|-- /store
| |-- store.js
|
|-- /services
| |-- authService.js
|
|-- App.js
|-- index.js

/app
|-- /redux
| |-- /auth
| | |-- authSlice.js
| | |-- authThunks.js
|-- /api
| |-- api.js
|-- store.js
