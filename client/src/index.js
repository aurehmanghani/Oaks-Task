import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import thunk from 'redux-thunk'
// import {createStore,applyMiddleware, compose, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import store from './store/';
//import taskReducer from './reducers/task';

import './index.css';

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const rootReducer = combineReducers({task: taskReducer});


//const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();