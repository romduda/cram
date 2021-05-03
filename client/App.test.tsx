import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';

// import App from './App';

describe('<App />', () => {
  it('placeholder test', () => {
    expect(1).toBe(1);
  });
});


// it('after login, navigate to the cram page', () => {
//   const { getByPlaceholderText, getByTestId, getByText, debug } = render(
//     <MockedProvider>
//       <Home />
//     </MockedProvider>
//   );

//   fireEvent.press(getByText('Log In'));
//   const loginBtn = getByTestId('arrow-icon');

//   const username = getByPlaceholderText('Username');
//   const password = getByPlaceholderText('Password');
//   // console.log('username', username);
//   // debug();
//   fireEvent.changeText(username, 'hello');
//   fireEvent.changeText(password, 'world');
//   // username.value = 'hello';
//   // password.value = 'world';

//   // jest.spyOn(Alert, 'alert');
//   fireEvent.press(loginBtn);
//   // expect(Alert.alert).toHaveBeenCalled();

// })