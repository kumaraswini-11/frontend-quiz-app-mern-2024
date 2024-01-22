# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

===================

rearrange, restructure, apply all the modern best practices of html, css, javascript, airbnb js styling, and ordering format, naming convection - keep it small but understandable, functionality, styling, and keep only required think , make the code clean, optimizezed, performance, seo, aria

i wanted when i do sign up i will redirect to login page. and when i log in form log in page i want my data is store on redux , so some think like this. remenber i m using jwt with access token and refresh toke concept where i m storing the refresh token in mongo db. then tell me how will i set up code base

i was thinking to store the refrsh token in the datbase, and the access token in the coookies as it will expire in a day and front end guy can use it to veryfy and generate refshe token againg if he has the vlid acces token and its not expired. do you have any better idea or this one the best?

=================================

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
