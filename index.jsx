const {h, render} = require('preact');

if (process.env.NODE_ENV === 'development') {
	// eslint-disable-next-line global-require
	require('preact/devtools');
}

const App = require('./app.jsx');

require('babel-polyfill');
require('./index.pcss');

const reactRoot = document.querySelector('.app');

/** @jsx h */
render(<App/>, reactRoot);
