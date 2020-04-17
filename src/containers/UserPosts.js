import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Item, Button } from 'semantic-ui-react';
import PostItem from '../components/PostItem';
import NewPost from './NewPost';
import * as usersActions from '../actions/usersActions';
import * as postsActions from '../actions/postsActions';

const UserPosts = (props) => {
  const { posts, getUserPosts, users, getUser, deletePost, createPost } = props;
  const history = useHistory();
  const params = useParams();
  const userId = parseInt(params.userId);
  const userPosts = posts[userId];
  const postUser = users.find((user) => user.id === userId);

  useEffect(() => {
    if (!userId) history.push('/users');
    getUser(userId);
    getUserPosts(userId);
  }, []);

  const navigateToPost = (id) => history.push(`/post/${id}`);
  const renderPosts = (post) =>
    <PostItem
      key={`u-${post.id}`}
      post={post}
      userId={userId}
      navigateToPost={navigateToPost}
      deletePost={deletePost}
    />;
  const newPost = (post) => createPost(userId, post.title, post.body);
  
  return (
    <Container className="my-container">
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
};
const mapStateToProps = ({ posts, users }) => ({
  posts: posts.userPosts,
  users: users.usersList,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
