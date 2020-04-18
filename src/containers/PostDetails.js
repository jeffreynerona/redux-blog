import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Header, Divider, Segment, List, Button, Dimmer, Loader } from 'semantic-ui-react'
import * as postsActions from '../actions/postsActions';
import CommentItem from '../components/CommentItem';

const PostDetails = (props) => {
  const { posts, getPost, comments, getComments, isLoading, setIsPostLoading } = props;
  const history = useHistory();
  const params = useParams();
  const postId = parseInt(params.postId);
  const allPosts = Object.values(posts);
  const userPost = allPosts.find(p => p.id === postId);
  const userComments = comments[postId];
  const renderComments = () => (
    <Segment inverted>
      <List divided inverted relaxed>
        {userComments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
      </List>
    </Segment>
  );

  useEffect(() => {
    setIsPostLoading(true);
    getPost(postId);
    getComments(postId);
  }, []);

  return (
    <Container className="my-container">
      <Dimmer active={isLoading}><Loader /></Dimmer>
      <Button content="Back" onClick={() => history.goBack()} />
      {userPost ? (<Container text>
        <Header as='h2'>{userPost.title}</Header>
        <p>{userPost.body}</p>
      </Container>) : 'Loading Post...'}
      <Divider />
      <Container className="my-narrow-container">
        <h3>Comments</h3>
        {userComments ? renderComments() : 'No Comments Found'}
      </Container>
    </Container>
  );
}

const mapDispatchToProps = {
    getPost: postsActions.getPost,
    getComments: postsActions.getPostComments,
    setIsPostLoading: postsActions.setIsLoading,
};
const mapStateToProps = ({ posts, users }) => ({
  posts: posts.userPosts,
  users: users.usersList,
  comments: posts.postComments,
  isLoading: posts.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
