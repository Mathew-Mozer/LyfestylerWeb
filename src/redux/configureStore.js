import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form'
import { Diets } from './diets'
import { Items } from './items'
import { FoodTags } from './foodtags'
import { Ingredients } from './ingredients'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { addIngredient } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            diets: Diets,
            items: Items,
            foodTags: FoodTags,
            ingredients: Ingredients,
            ...createForms({
                addIngredient: addIngredient
            })
        }),
        applyMiddleware(thunk,logger)
    );
    return store
}