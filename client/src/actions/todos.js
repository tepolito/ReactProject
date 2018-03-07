import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const getTodos = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/todos`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch({
               type: 'TEST',
               payload: data
            }))
        .catch(err => {
          //  dispatch(fetchProtectedDataError(err));
        })
};

export const postTodo = (entry) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log(entry);
    return fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        body: JSON.stringify(entry),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch({
               type: 'TEST',
               payload:data
            }))
        .catch(err => {
          //  dispatch(fetchProtectedDataError(err));
        })
};
