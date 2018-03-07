import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

var giphy = require('giphy-api')('rNq8FtmogPXR2ZuiSwncKoSAcTbDVQii');

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data,
    name: 'tyler'
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};

export const testAction = () => (dispatch, getState) => {
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
               payload: data,
               animal: 'cat'
            }))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        })
};

export const searchGiphs = (entry) => (dispatch, getState) =>
{
  giphy.search('pokemon').then(function (res) {
// Res contains gif data!
console.log(res);
dispatch({type:'GIPH', payload:res})

});
}

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
            dispatch(fetchProtectedDataError(err));
        })
};

// export const testAction = () => (dispatch, getState) => {
// console.log('actions test')
//
//   dispatch({
//       type: 'TEST'
//     });
//
// }

// export const testAction = async () => async (dispatch, getState) =>
// {
//   // await response of fetch call
//   let response = await fetch('https://api.github.com');
//   // only proceed once promise is resolved
//   let data = await response.json();
//   console.log(data);
//   // only proceed once second promise is resolved
//   return data;
// }

// export const testAction = async () => async (dispatch, getState) =>
// {
//   let payload = await (fetch('https://api.github.com')).json();
//   console.log(payload);
//   dispatch({
//     type:'TEST',
//     payload
//   })
//
// }
