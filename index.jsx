const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./app.jsx');

require('./index.pcss');

const reactRoot = document.querySelector('.app');

ReactDOM.render(<App/>, reactRoot);