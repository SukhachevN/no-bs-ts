import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonWrapper } from './ButtonWrapper';

test('handles onClick', () => {
  const onClick = jest.fn();
  render(<ButtonWrapper title='Add item' onClick={onClick} />);
  const buttonElement = screen.getByText(/Add item/i);
  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalledTimes(1);
});
