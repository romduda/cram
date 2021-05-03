import React from 'react';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { Home } from '../Home';


it('There is a button with "Log In" on home page', () => {
  // arrange
  const { getByText } = render(
    <MockedProvider>
      <Home />
    </MockedProvider>

  );
  // expect(() => getByText('Log In')).not.toThrow();
  // const loginButton = getByText('Log In');
  getByText('Log In');

  // act
  // assert
});





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