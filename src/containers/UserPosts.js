import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Item, Button, Dimmer, Loader } from 'semantic-ui-react';
import PostItem from '../components/PostItem';
import NewPost from './NewPost';
import * as usersActions from '../actions/usersActions';
import * as postsActions from '../actions/postsActions';

const UserPosts = (props) => {
  const {
    posts,
    getUserPosts,
    users,
    getUser,
    deletePost,
    createPost,
    setIsUserLoading,
    setIsPostLoading,
    isPostLoading,
    isUserLoading,
  } = props;
  const history = useHistory();
  const params = useParams();
  const userId = parseInt(params.userId);
  const userPosts = posts[userId];
  const postUser = users.find((user) => user.id === userId);

  useEffect(() => {
    if (!userId) history.push('/');
    setIsUserLoading(true);
    getUser(userId);
    setIsPostLoading(true);
    getUserPosts(userId);
  }, []);
  const handleDeletePost = (uId, pId) => {
    setIsPostLoading(true);
    deletePost(uId, pId);
  }

  const navigateToPost = (id) => history.push(`/post/${id}`);
  const renderPosts = (post) =>
    <PostItem
      key={`u-${post.id}`}
      post={post}
      userId={userId}
      navigateToPost={navigateToPost}
      deletePost={handleDeletePost}
    />;
  const newPost = (post, test) => {
    setIsPostLoading(true);
    createPost(userId, post.title, post.body);
  };
  const isLoading = isUserLoading || isPostLoading;
  return (
    <Container className="my-container">
      <Dimmer active={isLoading}><Loader /></Dimmer>
      <Button content="Back" onClick={() => history.goBack()} />
      <NewPost onSubmit={newPost} />
      {postUser && <h1>{postUser.name} Posts</h1>}
      <Item.Group>
        {userPosts && userPosts.length ?  userPosts.map(renderPosts) : <div>Loading Posts...</div>}
      </Item.Group>
    </Container>
  );
}

const mapDispatchToProps = {
    getUserPosts: postsActions.getUserPosts,
    getUser: usersActions.getUser,
    deletePost: postsActions.deletePost,
    createPost: postsActions.createPost,
    setIsPostLoading: postsActions.setIsLoading,
    setIsUserLoading: usersActions.setIsLoading,
};
const mapStateToProps = ({ posts, users }) => ({
  posts: posts.userPosts,
  users: users.usersList,
  isPostLoading: posts.isLoading,
  isUserLoading: users.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
