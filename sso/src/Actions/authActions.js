import axios from 'axios'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';


export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token
});

export const logout = () => {
  localStorage.removeItem('token');
  return { type: LOGOUT };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      // const credentials = {
      //   "usr": "660066",
      //   "pwd": "3636"
      // };
      const usr = credentials.username
      const pwd = credentials.password
      const data1 = {
        "usr": usr,
        "pwd": pwd
      }
      const response = axios.post("https://api.nitisakc.dev/auth/login", data1, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      dispatch(loginSuccess(data.token));
    } catch (error) {
      console.error('Login error:', error);
    }
  };
};