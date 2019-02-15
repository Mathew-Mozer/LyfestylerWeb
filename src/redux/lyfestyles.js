import * as ActionTypes from './ActionTypes';

export const LyfeStyles = (state= {
        isLoading: true,
        errMess: null,
        lyfestyles:[]
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_LYFESTYLES:
            return  {...state, isLoading:false, errMess:null,lyfestyles: action.payload}
        case ActionTypes.LYFESTYLES_LOADING:
            return{...state, isLoading:true, errMess:null,lyfestyles: []}
        case ActionTypes.LYFESTYLES_FAILED:
            return{...state, isLoading:false, errMess:action.payload,lyfestyles: []}
        default:
            return state
    }
}