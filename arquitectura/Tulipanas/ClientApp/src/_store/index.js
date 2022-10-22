import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../_reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var store = null;

export default function generateStore() {
    store = createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
};

export const getStore = () => store;
