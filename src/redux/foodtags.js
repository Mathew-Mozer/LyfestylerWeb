import * as ActionTypes from './ActionTypes';
import { compareByName } from '../shared/sortTools'

export const FoodTags = (state= {
        isLoading: true,
        errMess: null,
        foodTags:[]
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_FOODTAGS:
            return{...state, isLoading:false, errMess:null,foodTags: action.payload.sort(compareByName)}
        default:
            return state
    }
}