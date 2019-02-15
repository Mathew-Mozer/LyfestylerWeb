import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl'
import { actions } from 'react-redux-form'

export const lyfeStylesFailed = (errmess) => ({
    type: ActionTypes.LYFESTYLES_FAILED,
    payload: errmess
});

export const addLyfeStyles = (payload) => ({
    type: ActionTypes.ADD_LYFESTYLES,
    payload: payload
})

export const lyfeStylesLoading = () => ({
    type: ActionTypes.LYFESTYLES_LOADING
});

export const fetchLyfeStyles = () => (dispatch) => {
    dispatch(lyfeStylesLoading(true));

    return fetch(baseUrl+'lyfeStyles')
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
        .then(payload => dispatch(addLyfeStyles(payload)))
        .catch(error => dispatch(lyfeStylesFailed(error.message)));
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
    dispatch(lyfeStylesLoading(true));

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

export const ingredientsLoading = (payload=true) => ({
    type: ActionTypes.INGREDIENTS_LOADING,
    payload:payload
});


export const fetchIngredients = () => (dispatch) => {
    dispatch(lyfeStylesLoading(true));

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

export const postIngredient = (name,tags) => (dispatch) => {
    //dispatch(ingredientsLoading(false))
    const newIngredient = {
        name: name,
        tags: tags
    }

    return fetch(baseUrl+'ingredients',{
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
export const putIngredient = (ingredient) => (dispatch) => {
    //dispatch(ingredientsLoading(false))
    return fetch(baseUrl+'ingredients/'+ingredient.id,{
        method: 'PUT',
        body: JSON.stringify(ingredient),
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
    .then(response => dispatch(updateIngredient(response)))
    .catch(error => { console.log('Add Ingredient ', error.message)
    alert('Your ingredient could not be added\nError: ' + error.message)})
}

export const deleteIngredient = (ingredient) => (dispatch) => {
    dispatch(ingredientsLoading(false))
    return fetch(baseUrl+'ingredients/'+ingredient.id,{
        method: 'DELETE',
        body: JSON.stringify(ingredient),
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
    .then(response => dispatch(removeIngredient(ingredient)))
    .catch(error => { console.log('Add Ingredient ', error.message)
    alert('Your ingredient could not be added\nError: ' + error.message)})
}

export const addIngredient = (payload) => ({
    type: ActionTypes.ADD_INGREDIENT,
    payload:payload
});

export const removeIngredient = (payload) =>({
    type: ActionTypes.REMOVE_INGREDIENT,
    payload:payload
});

export const updateIngredient = (payload) => ({
    type: ActionTypes.UPDATE_INGREDIENT,
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
