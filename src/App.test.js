import React from 'react';
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom'

import App from './App';
import { initialState as usersInitialState } from './reducers/usersReducer';
import { initialState as postsInitialState } from './reducers/postsReducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const store = (params) => mockStore({
  posts: postsInitialState,
  users: usersInitialState,
  ...params,
});

const usersList = [{ id: 4, name: 'Voldemort' }];
const isLoading = false;

describe('redux', () => {
  const loadingMessage = 'Loading Users...';
  it('can be rendered with initial store state', () => {
    const { container, queryByText } = render(<Provider store={store()}><App /></Provider>)
    expect(container.querySelector('.container')).not.toBeNull();
    const loadingContainer = queryByText(loadingMessage);
    expect(loadingContainer.textContent).toEqual(loadingMessage);
    expect(loadingContainer).not.toBeNull();
  });
  it('can be rendered with a custom store state', () => {
    const { queryByText } = render(
      <Provider store={store({ users: { usersList, isLoading } })}>
        <App />
      </Provider>,
    );
    const nameContainer = queryByText('Voldemort');
    expect(nameContainer).not.toBeNull();
    expect(nameContainer.textContent).toEqual('Voldemort');
    const loadingContainer = queryByText(loadingMessage);
    expect(loadingContainer).toBeNull();
  });
});

describe('react-router', () => {
  afterEach(() => {
    cleanup();
  })
  it('renders users list in root path', () => {
    const history = createMemoryHistory()
    const { container } = render(
      <Provider store={store()}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    const title = container.querySelector('h1');

    expect(title).not.toBeNull();
    expect(title.textContent).toEqual('Awesome Bloggers');
  });
  it('navigates to a user when clicked', () => {
    const history = createMemoryHistory()
    const { container, queryByText } = render(
      <Provider store={store({ users: { usersList, isLoading } })}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    const userItem = queryByText('Voldemort');
    userEvent.click(userItem);
    const title = container.querySelector('h1');

    expect(title).not.toBeNull();
    expect(title.textContent).toEqual('Voldemort Posts');
  });
});


