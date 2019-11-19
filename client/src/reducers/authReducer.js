import { AUTH_STATUS } from '../actions/types'

const INITIAL_STATE =  {
    isSignedIn: null,
    userId: null
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
    case AUTH_STATUS:
        return action.payload;
    default:
        return state
    }
};
