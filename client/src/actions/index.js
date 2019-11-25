import { 
    AUTH_STATUS,
    FETCH_STREAMS,
    FETCH_STREAM,
    CREATE_STREAM,
    EDIT_STREAM,
    DELECT_STREAM 
} from './types';
import stream from '../apis/stream';
import history from '../history';

const fetchAuth = (isSignedIn, userId) => {
    return {
        type: AUTH_STATUS,
        payload: { isSignedIn, userId }
    }
}

const fetchStreams = () => async dispatch => {
    const response = await stream.get('/streams');
    dispatch({ type: FETCH_STREAMS, payload: response.data });
}

const fetchStream = id => async dispatch => {
    const response = await stream.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
}

const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await stream.post('/streams', {...formValues, userId});
    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');
}

const editStream = (formValues, id) => async dispatch => {
    const response = await stream.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
}

const delectStream = id => async dispatch => {
    await stream.delete(`/streams/${id}`);
    dispatch({ type: DELECT_STREAM, payload: id });
    history.push('/');
}

export { fetchAuth, fetchStreams, fetchStream, createStream, editStream, delectStream };