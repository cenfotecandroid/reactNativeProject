import reducers from './src/reducers';
import { createStore, applyMiddleware } from "redux"
import promiseMiddleware from "redux-promise";

const createStoreMiddleware = applyMiddleware(promiseMiddleware)(createStore);
const store = createStoreMiddleware(reducers);
export default store;