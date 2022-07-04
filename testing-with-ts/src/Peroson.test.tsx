import { render, screen } from '@testing-library/react';
import { Person } from './Person';

test('renders a name', () => {
  render(<Person name='Nikita' />);
  const divElement = screen.getByRole('contentinfo');
  expect(divElement).toHaveTextContent('Name is Nikita');
  expect(divElement).toHaveAttribute('role', 'contentinfo');
});
