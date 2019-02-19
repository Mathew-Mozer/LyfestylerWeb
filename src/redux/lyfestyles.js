import * as ActionTypes from './ActionTypes';
import { actions } from 'react-redux-form';



export const LyfeStyles = (state= {
        isLoading: true,
        errMess: null,
        lyfestyles:[]
    }, action) => {
        
    switch(action.type){
        case ActionTypes.ADD_LYFESTYLES:
            return  {...state, isLoading:false, errMess:null,lyfestyles: action.payload}
        case ActionTypes.ADD_LYFESTYLE:
            return  {...state, isLoading:false, errMess:null,lyfestyles: state.lyfestyles.some((ls)=>ls.id===action.payload.id)?state.lyfestyles.map((itm)=>itm.id==action.payload.id?action.payload:itm):state.lyfestyles.concat(action.payload)}
        case ActionTypes.UPDATE_LYFESTYLE:
            return{...state, isLoading:false, errMess:null,lyfestyles: state.lyfestyles.map((itm)=>{if(itm.id===action.payload.id){return(action.payload)}return(itm)})}
        case ActionTypes.DELETE_LYFESTYLE:
            return{...state, isLoading:false, errMess:null,lyfestyles: state.lyfestyles.filter((itm)=>{if(itm.id!==action.payload.lyfestyleid)return(itm);return(false)})}
        case ActionTypes.LYFESTYLES_LOADING:
            return{...state, isLoading:true, errMess:null,lyfestyles: []}
        case ActionTypes.LYFESTYLES_EMPTY:
            return{...state, isLoading:false, errMess:null,lyfestyles: []}
        case ActionTypes.LYFESTYLES_FAILED:
            return{...state, isLoading:false, errMess:action.payload,lyfestyles: []}
        default:
            return state
    }
}