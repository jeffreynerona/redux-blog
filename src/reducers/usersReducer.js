import {
  GET_USERS,
  GET_USER,
  SET_IS_USER_LOADING,
} from "../actions/usersActions";

export const initialState = {
  usersList: [],
  isLoading: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return Object.assign({}, state, {
        usersList: action.payload.users,
        isLoading: false,
      });
    case GET_USER:
      const { user } = action.payload;
      const currentUsers = state.usersList;
      if (user && !currentUsers.find(u => u.id === user.id)) currentUsers.push(user);
      return Object.assign({}, state, {
        usersList: currentUsers,
        isLoading: false,
      });
    case SET_IS_USER_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      });
    default:
      return state;
  }
};

export default users;
  