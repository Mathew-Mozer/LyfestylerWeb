import * as ActionTypes from './ActionTypes';

export const Diets = (state= {
        isLoading: true,
        errMess: null,
        diets:[]
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_DIETS:
            return{...state, isLoading:false, errMess:null,diets: action.payload}
        case ActionTypes.DIETS_LOADING:
            return{...state, isLoading:true, errMess:null,diets: []}
        case ActionTypes.DIETS_FAILED:
            return{...state, isLoading:false, errMess:action.payload,diets: []}
        default:
            return state
    }
}