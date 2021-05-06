import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { Home } from '../Home';

it('there is a button with "Log In" on home page', () => {
  // arrange
  const { getByText } = render(
    <MockedProvider>
      <Home />
    </MockedProvider>
  );
  // expect(() => getByText('Log In')).not.toThrow();
  getByText('Log In');

  // act
  // assert
});

it('there is a video component on the home page', () => {
  const { getByTestId } = render(
    <MockedProvider>
      <Home />
    </MockedProvider>
  );
  getByTestId('background-video');
});

it('log in button says "Log In" before press, and shows arrow icon after press', () => {
  const { getByText, getByTestId, debug } = render(
    <MockedProvider>
      <Home />
    </MockedProvider>
  );
  const loginBtn = getByText('Log In');
  expect(() => getByTestId('arrow-icon')).toThrow();
  fireEvent.press(loginBtn);
  expect(() => getByText('Log In')).toThrow();
  getByTestId('arrow-icon');
});

// const video = require('./video');

// test('plays video', () => {
//   const spy = jest.spyOn(video, 'play');
//   const isPlaying = video.play();

//   expect(spy).toHaveBeenCalled();
//   expect(isPlaying).toBe(true);

//   spy.mockRestore();
// });

// import React from "react";
// import {
//   render,
//   fireEvent,
//   cleanup,
//   waitForElement,
//   waitForDomChange
// } from "@testing-library/react";
// import { ApolloMockedProvider } from "./test-utils/providers";
// import App from "./App";

// afterEach(cleanup);

// test("make sure I can submit a todo", async () => {
//   const { getByPlaceholderText, getByTestId, getByText } = render(
//     <ApolloMockedProvider
//       customResolvers={{
//         Mutation: () => ({
//           addTodo: () => ({ id: 1, type: "go to the store" })
//         })
//       }}
//     >
//       <App />
//     </ApolloMockedProvider>
//   );

//   const todoInput = getByPlaceholderText("todo...");
//   const submitButton = getByTestId("submit-button");
//   fireEvent.click(submitButton);

//   await waitForDomChange();

//   getByText("required");

//   fireEvent.change(todoInput, { target: { value: "go to the store" } });

//   fireEvent.click(submitButton);

//   await waitForElement(() => getByText("go to the store"));
// });
