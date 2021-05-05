import React from 'react';
import { Crammed } from '../Crammed';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

const mockRoute = {
  params: {
    paramC: {
      bullets: [
        "const http = require('http'); const hostname = '127.0.0.1'; const port =      3000;",
        "const server = http.createServer((req, res) => {res.statusCode = 200; res.setHeader('Content-Type', 'text/plain');res.end('Hello World');});",
        "server.listen(port, hostname, () => {console.log('Server running at http://hostname:port');});",
      ],
      related: ['Koa', 'Express'],
      title: 'Node',
      url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
    },
  },
};

const mockRouteKoa = {
  params: {
    paramC: {
      bullets: [
        `const Koa = require('koa');`,
        `const app = new Koa();`,
        `app.use(ctx => {ctx.body = 'Hello World';});`,
        `app.listen(3000, () => console.log('server started on port 3000'));`,
      ],
      related: ['Node', 'Express'],
      title: 'Koa',
      url: 'https://www.youtube.com/watch?v=z84uTk5zmak',
      id: '608ac3aa638930e38c852598',
    },
  },
};

const notFound = {
  params: {
    paramC: {
      title: 'Not Found',
      url:
        'Sorry no materials available at present. Check out some of the other available materials!',
      related: [
        'Koa',
        'Node',
        'Express',
        'Apollo',
        'REST',
        'HTTP',
        'MongoDB',
        'SQL',
      ],
      bullets: [],
    },
  },
};

jest.mock('../../Services/ApiService', () => {
  return {
    furtherTopics: jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          bullets: [
            `const Koa = require('koa');`,
            `const app = new Koa();`,
            `app.use(ctx => {ctx.body = 'Hello World';});`,
            `app.listen(3000, () => console.log('server started on port 3000'));`,
          ],
          related: ['Node', 'Express'],
          title: 'Koa',
          url: 'https://www.youtube.com/watch?v=z84uTk5zmak',
          id: '608ac3aa638930e38c852598',
        });
      })
    ),
  };
});

const fakeNavigation = {
  navigate: jest.fn(),
  push: jest.fn(),
};

describe('Crammed page test suite on successful topic load', () => {
  afterEach(cleanup);

  it('crammed page loads correctly "Node" topic has been found ', () => {
    const { getByText, debug } = render(<Crammed route={mockRoute} />);
    getByText('Node');
  });

  it('Related topics Koa and Express are shown for Node Topic', () => {
    const { getByText, debug } = render(<Crammed route={mockRoute} />);
    getByText('Koa');
    getByText('Express');
  });

  it('Cheatsheet and Related topics components have been rendered on page load', () => {
    const { getByTestId, debug } = render(<Crammed route={mockRoute} />);
    getByTestId('bullet-container');
    getByTestId('related-topics-container');
  });

  it('Video component is rendered on page load', () => {
    const { getByTestId, debug } = render(<Crammed route={mockRoute} />);
    getByTestId('video-container');
  });

  it('Option to "Cram again" is available', () => {
    const { getByText, debug } = render(<Crammed route={mockRoute} />);
    getByText('Cram again?');
  });
});

describe('Crammed page test suite on unsuccessful topic load', () => {
  afterEach(cleanup);

  it('Not found page message loads successfully', () => {
    const { getByText, debug } = render(<Crammed route={notFound} />);
    getByText('Not Found');
  });

  it('Not found still gives the option to cram again', () => {
    const { getByText, debug } = render(<Crammed route={notFound} />);
    getByText('Cram again?');
  });
});

describe('Navigation from Crammed back to Cram', () => {
  afterEach(cleanup);

  it('Click the "Cram again?" button brings the user back to Cram page when Topic "Not Found"', async () => {
    const { getByTestId, debug } = render(
      <Crammed route={notFound} navigation={fakeNavigation} />
    );
    const cramAgainBtn = getByTestId('cram-again-btn');
    fireEvent.press(cramAgainBtn);
    await waitFor(() => {
      expect(fakeNavigation.navigate).toBeCalledWith('Cram');
    });
  });

  it('Click the "Cram again?" button brings the user back to Cram page when Topic exists', async () => {
    const { getByTestId, debug } = render(
      <Crammed route={mockRoute} navigation={fakeNavigation} />
    );
    const cramAgainBtn = getByTestId('cram-again-btn');
    fireEvent.press(cramAgainBtn);
    await waitFor(() => {
      expect(fakeNavigation.navigate).toBeCalledWith('Cram');
    });
  });
});

describe('Navigation from Crammed to Further Topics', () => {
  afterEach(cleanup);

  it('Clicking a further topic navigates you to that topic', async () => {
    const { getByText, debug } = render(
      <Crammed route={mockRoute} navigation={fakeNavigation} />
    );
    const cramAgainBtn = getByText('Koa');
    fireEvent.press(cramAgainBtn);
    await waitFor(() => {
      expect(fakeNavigation.push).toBeCalledWith('Crammed', {
        paramC: mockRouteKoa.params.paramC,
      });
    });
  });
});
