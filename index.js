/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';

import React from 'react';

import reducers from './src/reducers';
import store from './store';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

const appRedux = () =>{
    return(
    <Provider store={store}>
        <App></App>
    </Provider>
    )
}

AppRegistry.registerComponent(appName, () => appRedux);