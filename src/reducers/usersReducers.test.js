import userReducer, { initialState } from './usersReducer';
import {
  GET_USERS,
  GET_USER,
  SET_IS_USER_LOADING
} from '../actions/usersActions';

const myInitialState = (params) => ({
  ...initialState,
  ...params,
});

const users = [{ id: 1, name: 'Jeff' }, { id: 2, name: 'Link' }];

describe('userReducer', () => {
  describe('no action', () => {
    it('returns the intial state', () => {
      const userState = userReducer(myInitialState(), {});
      expect(userState).toEqual(initialState);
    });
  });
  describe('SET_IS_USER_LOADING', () => {
    it('sets the isLoading value', () => {
      const userState = userReducer(myInitialState(), { type: SET_IS_USER_LOADING, payload: false });
      expect(userState.isLoading).toEqual(false);
      const newUserState = userReducer(userState, { type: SET_IS_USER_LOADING, payload: true });
      expect(newUserState.isLoading).toEqual(true);
    });
  });
  describe('GET_USERS', () => {
    it('sets the user list', () => {
      const userState = userReducer(myInitialState(), {});
      expect(userState.usersList).toEqual([]);
      const newUserState = userReducer(userState, { type: GET_USERS, payload: { users } });
      expect(newUserState.usersList).toEqual(users);
    });
    it('sets the isLoading to false', () => {
      const userState = userReducer(myInitialState({ isLoading: true }), {});
      expect(userState.isLoading).toEqual(true);
      const newUserState = userReducer(userState, { type: GET_USERS, payload: { users } });
      expect(newUserState.isLoading).toEqual(false);
    });
  });
  describe('GET_USER', () => {
    it('returns the original usersList if nothing is passed', () => {
      const userState = userReducer(myInitialState({ usersList: users }), { type: GET_USER, payload: {} });
      expect(userState.usersList).toEqual(users);
    });
    it('adds the user to userList if no id matches the list yet', () => {
      const newUser = { id: 3, name: 'Zelda' };
      const userState = userReducer(myInitialState({ usersList: users }), { type: GET_USER, payload: { user: newUser } });
      expect(userState.usersList).toContainEqual(newUser);
    });
    it('doesn\'t add user to userList if user id already exists', () => {
      const newUser = { id: 2, name: 'Jen' };
      const userState = userReducer(myInitialState({ usersList: users }), { type: GET_USER, payload: { user: newUser } });
      expect(userState.usersList).not.toContainEqual(newUser);
    });
  });
});
