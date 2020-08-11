import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux'
import reducer from './store/reducer';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga';
import { watchPosts } from './store/sagas';
import history from './history'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(watchPosts);

ReactDOM.render(<Provider store={store}><Router history={ history }><App /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
