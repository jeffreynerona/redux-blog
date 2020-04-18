import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { List, Container, Dimmer, Loader } from 'semantic-ui-react';
import * as usersActions from '../actions/usersActions';
import UserItem from '../components/UserItem';

const UserList = (props) => {
  const { users, getUsers, isLoading, setIsLoading } = props;
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getUsers();
  }, []);

  const navigateToUser = (id) => history.push(`/user/${id}`);
  const renderUsers = (user) => <UserItem key={`u-${user.id}`} user={user} navigateToUser={navigateToUser} />;
  return (
    <Container className="my-container">
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      <List animated verticalAlign='middle'>
        <h1>Awesome Bloggers</h1>
        {users.length ?  users.map(renderUsers) : <div>Loading Users...</div>}
      </List>
    </Container>
  );
}

const mapDispatchToProps = {
  getUsers: usersActions.getUsers,
  setIsLoading: usersActions.setIsLoading,
};
const mapStateToProps = ({ posts, users }) => ({
  posts: posts.postsList,
  users: users.usersList,
  isLoading: users.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
