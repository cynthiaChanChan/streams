import { AUTH_STATUS } from '../actions/types'

const fetchAuth = (isSignedIn, userId) => {
    return {
        type: AUTH_STATUS,
        payload: {
            isSignedIn, userId
        }
    }
}

export { fetchAuth };