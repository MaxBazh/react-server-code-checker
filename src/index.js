import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app';

import {Provider} from 'mobx-react';
import stores from './stores';

ReactDom.render(
    <Provider stores={stores}>
        <App/>
    </Provider>, 
    document.querySelector('#app')
);

// import checker404Servise from './services/checker404Servise';
// let urls = [
//     'https://www.youtube.com/',
//     'https://yandex.ru/'
// ];
// const api = new checker404Servise();
// api.getChekedUrls(urls)
//     .then(res => {
//         if( res === null ){
//             return false;
//         }

//         console.log(res);
//     }).catch(err => {        
//         console.log(err);
//     });
