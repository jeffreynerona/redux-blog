import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import UserList from './containers/UserList';
import UserPosts from './containers/UserPosts';
import PostDetails from './containers/PostDetails';

const App = () => (
  <BrowserRouter>
    <Route path="/" exact component={UserList} />
    <Route path="/user/:userId" component={UserPosts} />
    <Route path="/post/:postId" component={PostDetails} /> 
  </BrowserRouter>
);

export default App;
