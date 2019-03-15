import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form'
import { LyfeStyles } from './lyfestyles'
import { Items } from './items'
import { userdata } from './userdata'
import { Ingredients } from './ingredients'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { addIngredient,formLyfeStyleEditor } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            lyfestyles: LyfeStyles,
            items: Items,
            userdata: userdata,
            ingredients: Ingredients,
            ...createForms({
                addIngredient: addIngredient,
                formLyfeStyleEditor: formLyfeStyleEditor
            })
        }),
        applyMiddleware(thunk,logger)
    );
    return store
}