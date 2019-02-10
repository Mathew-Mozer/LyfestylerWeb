
import * as ActionTypes from './ActionTypes';
import { compareByName } from '../shared/sortTools'

export const Ingredients = (state= {
        isLoading: true,
        errMess: null,
        items:[]
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_INGREDIENTS:
            return{...state, isLoading:false, errMess:null,ingredients: action.payload.sort(compareByName)}
        case ActionTypes.ADD_INGREDIENT:
            return{...state, isLoading:false, errMess:null,ingredients: state.ingredients.concat(action.payload).sort(compareByName)}
        case ActionTypes.INGREDIENTS_LOADING:
            return{...state, isLoading:true, errMess:null,ingredients: []}
        case ActionTypes.INGREDIENTS_FAILED:
            return{...state, isLoading:false, errMess:action.payload,ingredients: []}
        default:
            return state
    }
}