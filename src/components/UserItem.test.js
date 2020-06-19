import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import UserItem from './UserItem';


describe('<UserItem />', () => {
  const defaultProps = {
    user: {
      id: 2,
      name: 'Zelda',
    },
    navigateToUser: jest.fn(),
  };

  afterEach(() => {
    cleanup();
  });
  it('renders the user\'s image', () => {
    const { container } = render(<UserItem {...defaultProps} />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.src).toEqual('https://i.pravatar.cc/300?id=2');
    expect(img.alt).toEqual('Zelda');
  });
  it('renders the user\'s name as a header', () => {
    const { container } = render(<UserItem {...defaultProps} />);
    const header = container.querySelector('.header');
    expect(header).not.toBeNull();
    expect(header.textContent).toEqual('Zelda');
  });
  it('navigates to the user if item is clicked', () => {
    const { container } = render(<UserItem {...defaultProps} />);
    const item = container.querySelector('.item');
    expect(item).not.toBeNull();
    userEvent.click(item);
    expect(defaultProps.navigateToUser).toHaveBeenCalled();
  });
});
