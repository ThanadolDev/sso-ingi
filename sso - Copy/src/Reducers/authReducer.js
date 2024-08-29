import { LOGIN_SUCCESS, LOGOUT } from '../Actions/authActions';

const initialState = {
  token: localStorage.getItem('token'),
  test: true,
  isAuthenticated: localStorage.getItem('token') !== null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { 
        ...state, 
        isAuthenticated: true,
        token: action.payload
      };
    case LOGOUT:
      return { 
        ...state, 
        isAuthenticated: false,
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;