import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Mock, { Random } from 'mockjs';
import { FetchList } from '../src/components/FetchList';

const server = setupServer(
  rest.get('/persons', function (req, res, ctx) {
    return res(
      ctx.json({
        list: Mock.mock({
          'list|1-10': [
            {
              uuid: Random.guid(),
              name: Random.name(),
            },
          ],
        }).list,
      }),
    );
  }),
  rest.get('/greeting', function (req, res, ctx) {
    return res(
      ctx.json({
        greeting: 'hello there',
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());

test('加载和展示控件', async () => {
  render(<FetchList />);
  fireEvent.click(screen.getByText('Load Greeting'));
  await waitFor(() => screen.getByRole('heading'));
  expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  expect(screen.getByRole('button')).toBeDisabled();
});
