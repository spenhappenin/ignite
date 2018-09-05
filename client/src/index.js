import React from 'react';
import App from './components/App';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import ScrollToTop from './components/ScrollToTop';
import store from './store';
import { BrowserRouter, } from 'react-router-dom';
import { initMiddleware, } from 'devise-axios';
import { Provider, } from 'react-redux';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-quill/dist/quill.snow.css';

initMiddleware();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
