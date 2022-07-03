import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { APIComponent } from './APIComponent';

const server = setupServer(
  rest.get('/api', (req, res, ctx) => res(ctx.json({ name: 'Nikita' })))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('gets the data', async () => {
  render(<APIComponent />);
  const out = await waitFor(() => screen.findByRole('contentinfo'));
  expect(out).toHaveTextContent('Name is Nikita');
});
