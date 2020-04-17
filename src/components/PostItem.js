import React from 'react';
import { Item, Button } from 'semantic-ui-react';

const PostItem = ({ post, userId, navigateToPost, deletePost }) => {
  const viewPost = () => navigateToPost(post.id)
  return (
    <Item>
      <Item.Content>
        <Item.Header as='a' onClick={viewPost}>{post.title}</Item.Header>
        <Item.Meta>{post.body}</Item.Meta>
        <Button onClick={viewPost} content='View' primary />
        <Button onClick={() => deletePost(userId, post.id)} content='Delete' secondary />
      </Item.Content>
    </Item>
  );
};

export default PostItem;
