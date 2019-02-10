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