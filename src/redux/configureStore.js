import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Diets } from './diets'
import { Items } from './items'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            diets: Diets,
            items: Items
        }),
        applyMiddleware(thunk,logger)
    );
    return store
}