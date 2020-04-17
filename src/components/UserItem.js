import React from 'react';
import { Image, List } from 'semantic-ui-react';

const UserItem = ({ user, navigateToUser }) => (
  <List.Item onClick={() => navigateToUser(user.id)}>
    <Image avatar src={`https://i.pravatar.cc/300?id=${user.id}`} alt={user.name} />
    <List.Content>
      <List.Header>{user.name}</List.Header>
    </List.Content>
  </List.Item>
);

export default UserItem;
