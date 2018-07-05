import React from 'react';
import ReactDom from 'react-dom';

import 'core-js';
import 'whatwg-fetch';
import 'raf/polyfill';

import App from './App';
import './styles/blog.css';
import registerServiceWorker from './registerServiceWorker';
// import axios from 'axios';

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'; // default
// axios.defaults.headers.post['Content-Type'] = 'application/json'; // default

// axios.interceptors.request.use(request => {
//     console.log(request);
//     // edit request config
//     return request;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);

// });

// axios.interceptors.response.use(response => {
//     console.log(response);
//     // edit request config
//     return response;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);

// });

ReactDom.render(
    <App />,
    document.getElementById('mountNode')
);

registerServiceWorker();

// browser shouldn’t perform a page refresh, but the application reloads and shows the correct output
if (module.hot) {
    module.hot.accept();
}