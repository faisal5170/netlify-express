import React from 'react';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <div className="loader-container">
      <div className="loader"></div>
    </div>
    <App />
  </Provider>,
  document.getElementById('root')
);



