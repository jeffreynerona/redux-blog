import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  getUsers,
  GET_USERS,
  SET_IS_USER_LOADING,
} from './usersActions';
import blogService from '../services/blogService';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('userActions', () => {
  jest.spyOn(blogService, 'get');
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(window, 'alert').mockImplementation();
  });
  describe('getUsers', () => {
    describe('success', () => {
      it('calls api and dispatches GET_USER with the correct user data', async () => {
        const mockedUsers = [{ id: 1, name: 'Jeff' }, { id: 2, name: 'Link' }];
        const expectedActions = [{ type: GET_USERS, payload: { users: mockedUsers } }];
        blogService.get.mockImplementation(() => ({ data: mockedUsers }));
        const store = mockStore({});
        await store.dispatch(getUsers());
        expect(blogService.get).toHaveBeenCalledWith('/users');
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    describe('fail', () => {
      it('sets loading to false and shows an alert', async () => {
        blogService.get.mockImplementation(() => { throw new Error(); });
        const expectedActions = [{ type: SET_IS_USER_LOADING, payload: false }];
        const store = mockStore({});
        await store.dispatch(getUsers());
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
