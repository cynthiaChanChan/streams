import { AUTH_STATUS } from '../actions/types';
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    UPDATE_STREAM,
    DELETE_STREAM
} from './types';
import stream from '../apis/stream';

const fetchAuth = (isSignedIn, userId) => {
    return {
        type: AUTH_STATUS,
        payload: {
            isSignedIn, userId
        }
    }
};

const createStream = formValues => async dispatch => {
    const response = await stream.post('/streams', formValues);
    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    });
};

const fetchStreams = () => async dispatch => {
    const response = await stream.get('/streams');
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    });
};

const fetchStream = id => async dispatch => {
    const response = await stream.get(`/streams/${id}`);
    dispatch({
        type: FETCH_STREAM,
        payload: response.data
    });
};

const updateStream = id => async dispatch => {
    const response = await stream.put(`/streams/${id}`);
    dispatch({
        type: UPDATE_STREAM,
        payload: response.data
    });
};

const deleteStream = id => async dispatch => {
    await stream.delete(`/streams/${id}`);
    dispatch({
        type: DELETE_STREAM,
        payload: id
    });
}

export { 
    fetchAuth, 
    createStream, 
    fetchStreams, 
    fetchStream, 
    updateStream, 
    deleteStream 
};