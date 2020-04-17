import blogService from '../services/blogService';

export const getUserPosts = (userId) => async dispatch => {
  try {
    const { data } = await blogService.get(`/posts?userId=${userId}`);
    dispatch({ type: 'GET_USER_POSTS', payload: { posts: data, userId } });
  } catch (error) {
    alert('There was an error getting the posts.');
  }
};

export const getPost = (postId) => async dispatch => {
  try {
    const { data } = await blogService.get(`/posts/${postId}`);
    dispatch({ type: 'GET_POST', payload: { post: data } });
  } catch (error) {
    alert('There was an error getting the post.');
  }
};

export const createPost = (userId, title, body) => async dispatch => {
  try {
    const { data } = await blogService.post('/posts', { userId, title, body });
    dispatch({ type: 'CREATE_POST', payload: { post: data, userId } });
  } catch (error) {
    alert('There was an error create the post.');
  }
};

export const deletePost = (userId, postId) => async dispatch => {
  try {
    blogService.delete(`/posts/${postId}`); // Dont await, it doesn't get deleted anyway
    dispatch({ type: 'DELETE_POST', payload: { userId, postId } });
  } catch (error) {
    alert('There was an error deleting the post.');
  }
};

export const getPostComments = (postId) => async dispatch => {
  try {
    const { data } = await blogService.get(`/posts/${postId}/comments`);
    dispatch({ type: 'GET_POST_COMMENTS', payload: { comments: data, postId } });
  } catch (error) {
    alert('There was an error getting the comments.');
  }
};
