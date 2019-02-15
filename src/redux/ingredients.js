
import * as ActionTypes from './ActionTypes';

export const Ingredients = (state= {
        isLoading: true,
        errMess: null,
        ingredients:[]
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_INGREDIENTS:
            return{...state, isLoading:false, errMess:null,ingredients: action.payload}
        case ActionTypes.ADD_INGREDIENT:
            return{...state, isLoading:false, errMess:null,ingredients: state.ingredients.concat(action.payload)}
        case ActionTypes.UPDATE_INGREDIENT:
            return{...state, isLoading:false, errMess:null,ingredients: state.ingredients.map((itm)=>{if(itm.id===action.payload.id){return(action.payload)}return(itm)})}
        case ActionTypes.REMOVE_INGREDIENT:
            return{...state, isLoading:false, errMess:null,ingredients: state.ingredients.filter((itm)=>{if(itm.id!==action.payload.id)return(itm);return(false)})}
        case ActionTypes.INGREDIENTS_LOADING:
            return{...state, isLoading:true, errMess:null,ingredients:action.payload?[]:state.ingredients}
        case ActionTypes.INGREDIENTS_FAILED:
            return{...state, isLoading:false, errMess:action.payload,ingredients: []}
        default:
            return state
    }
}