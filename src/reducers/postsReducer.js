const initialState = {
    userPosts: {},
    postComments: {},
    isLoading: false,
  };
  
  const posts = (state = initialState, action) => {
    switch (action.type) {
      case "GET_USER_POSTS":
        return Object.assign({}, state, {
          userPosts: {
            ...state.userPosts,
            [action.payload.userId]: action.payload.posts,
          },
          isLoading: false,
        });
      case "GET_POST":
        return Object.assign({}, state, {
          userPosts: {
            ...state.userPosts,
            [action.payload.post.userId]: action.payload.post,
          },
          isLoading: false,
        });
      case "GET_POST_COMMENTS":
        return Object.assign({}, state, {
          postComments: {
            ...state.postComments,
            [action.payload.postId]: action.payload.comments,
          },
          isLoading: false,
        });
      case "CREATE_POST":
        return Object.assign({}, state, {
          userPosts: {
            ...state.userPosts,
            [action.payload.userId]: [
              action.payload.post,
              ...state.userPosts[action.payload.userId],
            ],
          },
          isLoading: false,
        });
      case "DELETE_POST":
        const posts = state.userPosts[action.payload.userId];
        const updatedPosts = posts.filter(p => p.id !== action.payload.postId);
        return Object.assign({}, state, {
          userPosts: {
            ...state.userPosts,
            [action.payload.userId]: updatedPosts,
          },
          isLoading: false,
        });
      case "SET_IS_POST_LOADING":
        return Object.assign({}, state, {
          isLoading: action.payload,
        });
      default:
        return state;
    }
  };
  
  export default posts;
  