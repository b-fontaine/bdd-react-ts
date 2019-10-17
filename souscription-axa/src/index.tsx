import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import Header from './layout/Header';

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Router />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
