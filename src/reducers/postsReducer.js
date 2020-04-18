const initialState = {
    userPosts: {},
    postComments: {},
  };
  
  const posts = (state = initialState, action) => {
    switch (action.type) {
      case "GET_USER_POSTS":
        return Object.assign({}, state, {
          userPosts: {
            ...state.userPosts,
            [action.payload.userId]: action.payload.posts,
          }
        });
      case "GET_POST":
        return Object.assign({}, state, {
          userPosts: {
            ...state.userPosts,
            [action.payload.post.userId]: action.payload.post,
          }
        });
      case "GET_POST_COMMENTS":
        return Object.assign({}, state, {
          postComments: {
            ...state.postComments,
            [action.payload.postId]: action.payload.comments,
          }
        });
      case "CREATE_POST":
        return Object.assign({}, state, {
            userPosts: {
            ...state.userPosts,
            [action.payload.userId]: [
              action.payload.post,
              ...state.userPosts[action.payload.userId],
            ],
          }
        });
      case "DELETE_POST":
        const posts = state.userPosts[action.payload.userId];
        const updatedPosts = posts.filter(p => {
          return p.id !== action.payload.postId;
        });
        return Object.assign({}, state, {
          userPosts: {
            ...state.userPosts,
            [action.payload.userId]: updatedPosts,
          }
        });
      default:
        return state;
    }
  };
  
  export default posts;
  