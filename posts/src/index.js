import React from 'react';
import ReactDom from 'react-dom';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'; // default
axios.defaults.headers.post['Content-Type'] = 'application/json'; // default

axios.interceptors.request.use(request => {
    console.log(request);
    // edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);

});

axios.interceptors.response.use(response => {
    console.log(response);
    // edit request config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);

});

ReactDom.render(
    <App />,
    document.getElementById('root')
);
registerServiceWorker();
