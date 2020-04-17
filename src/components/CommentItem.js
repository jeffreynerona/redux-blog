import React from 'react';
import { List } from 'semantic-ui-react'

const CommentItem = ({ comment }) => {
  return (<List.Item>
    <List.Content>
      <List.Header>{comment.name}</List.Header>
      {comment.body}
    </List.Content>
  </List.Item>);
};

export default CommentItem;
