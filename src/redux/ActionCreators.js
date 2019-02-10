import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl'

export const dietsFailed = (errmess) => ({
    type: ActionTypes.DIETS_FAILED,
    payload: errmess
});

export const addDiets = (payload) => ({
    type: ActionTypes.ADD_DIETS,
    payload: payload
})

export const dietsLoading = () => ({
    type: ActionTypes.DIETS_LOADING
});

export const fetchDiets = () => (dispatch) => {
    dispatch(dietsLoading(true));

    return fetch(baseUrl+'diets')
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(payload => dispatch(addDiets(payload)))
        .catch(error => dispatch(dietsFailed(error.message)));
}


export const itemsFailed = (errmess) => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: errmess
});

export const addItems = (payload) => ({
    type: ActionTypes.ADD_ITEMS,
    payload: payload
})

export const ItemsLoading = () => ({
    type: ActionTypes.ITEMS_LOADING
});

export const fetchItems = () => (dispatch) => {
    dispatch(dietsLoading(true));

    return fetch(baseUrl+'items')
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(payload => dispatch(addItems(payload)))
        .catch(error => dispatch(itemsFailed(error.message)));
}

export const ingredientsFailed = (errmess) => ({
    type: ActionTypes.INGREDIENTS_FAILED,
    payload: errmess
});

export const addIngredients = (payload) => ({
    type: ActionTypes.ADD_INGREDIENTS,
    payload: payload
})

export const ingredientsLoading = () => ({
    type: ActionTypes.INGREDIENTS_LOADING
});

export const fetchIngredients = () => (dispatch) => {
    dispatch(dietsLoading(true));

    return fetch(baseUrl+'ingredients')
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(payload => dispatch(addIngredients(payload)))
        .catch(error => dispatch(ingredientsFailed(error.message)));
}

export const postIngredient = (name) => (dispatch) => {
    const newIngredient = {
        name: name,
    }

    return fetch(baseUrl + 'ingredients',{
        method: 'POST',
        body: JSON.stringify(newIngredient),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addIngredient(response)))
    .catch(error => { console.log('Add Ingredient ', error.message)
    alert('Your ingredient could not be added\nError: ' + error.message)})
}

export const addIngredient = (payload) => ({
    type: ActionTypes.ADD_INGREDIENT,
    payload:payload
});

export const fetchFoodTags = () => (dispatch) => {

    return fetch(baseUrl+'foodtags')
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(payload => dispatch(addFoodTags(payload)))
        .catch(error => console.log("Error getting Food Type "+error.message));
}

export const addFoodTags = (payload) => ({
    type: ActionTypes.ADD_FOODTAGS,
    payload:payload
});

