import blogService from '../services/blogService';

export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";
export const SET_IS_USER_LOADING = "SET_IS_USER_LOADING";

export const getUsers = () => async dispatch => {
  try {
    const { data } = await blogService.get('/users');
    dispatch({ type: 'GET_USERS', payload: { users: data } });
  } catch (error) {
    setIsLoading(false)(dispatch);
    alert('There was an error getting the users list.');
  }
};

export const getUser = (userId) => async dispatch => {
  try {
    const { data } = await blogService.get(`/users/${userId}`);
    dispatch({ type: 'GET_USER', payload: { user: data } });
  } catch (error) {
    setIsLoading(false)(dispatch);
    alert('There was an error getting the user.');
  }
};

export const setIsLoading = (isLoading) => dispatch => dispatch({ type: 'SET_IS_USER_LOADING', payload: isLoading });
