import _ from "loadsh";

import { 
    FETCH_STREAMS,
    FETCH_STREAM,
    CREATE_STREAM,
    EDIT_STREAM,
    DELECT_STREAM 
} from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return _.mapKeys(action.payload, 'id');
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload}; 
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};       
        case DELECT_STREAM:
            return _.omit(state, action.payload);  
        default:
            return state;     
    }        
};