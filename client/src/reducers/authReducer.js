import { AUTH_STATUS } from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case AUTH_STATUS:
            return action.payload;
        default:
            return state;
    }
};