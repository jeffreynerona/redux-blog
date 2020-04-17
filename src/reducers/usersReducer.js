const initialState = {
    usersList: [],
  };
  
  const users = (state = initialState, action) => {
    switch (action.type) {
      case "GET_USERS":
        return Object.assign({}, state, { usersList: action.payload.users });
      case "GET_USER":
        const { user } = action.payload;
        const currentUsers = state.usersList;
        if (user && !currentUsers.find(u => u.id === user.id)) currentUsers.push(user);
        return Object.assign({}, state, { usersList: currentUsers });
      default:
        return state;
    }
  };
  
  export default users;
  