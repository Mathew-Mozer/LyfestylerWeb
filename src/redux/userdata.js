import * as ActionTypes from './ActionTypes';

export const userdata = (state= {
    userdata:[]
    }, action) => {
    switch(action.type){
        case ActionTypes.SET_USERDATA:
            return{...state, userdata: action.payload}
        default:
            return state
    }
}