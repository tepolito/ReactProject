import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';


const initialState = {
    data: '',
    error: null,
    giphs:[],
    test: 'watever'
};

// export default function reducer(state = initialState, action) {
//     if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
//         return Object.assign({}, state, {
//             data: action.data,
//             error: null
//         });
//     } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
//         return Object.assign({}, state, {
//             error: action.error
//         });
//     }
//     return state;
// }

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROTECTED_DATA_SUCCESS:
      return {
        ...state,
        data:action.data,
        error:null
      };

    case FETCH_PROTECTED_DATA_ERROR:
      return {
        ...state,
        error:action.error
      };

    case 'TEST':
    console.log(action)
      return {
        ...state,
        test:'yo'
      };

      case 'GIPH':
      console.log(action)
        return {
          ...state,
          giphs: [...action.payload.data]
        };

    default:
      return state;
  }
};
