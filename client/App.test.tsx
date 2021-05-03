import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { Home } from './Components/Home'
import { NavigationContainer } from '@react-navigation/native';
import fetchMock from 'jest-fetch-mock';
import 'react-native-gesture-handler/jestSetup';
// import * as expoCamera  from 'expo-camera';


import { AppWrapper } from './App';

//Warnings for animations
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});


jest.mock('expo-camera', () => {
  //createMockFromModule imports the module - cannot use import becuase the mocks are being hoisted before the imports, if not it can't mock the actual imports
  const expoCamera: any = jest.createMockFromModule('expo-camera');
  // change just one function to mock.
  expoCamera.Camera.requestPermissionsAsync = jest.fn().mockResolvedValue(
      { status: 'granted' }
  )
  return expoCamera;
})



describe('<App />', () => {

  it('placeholder test', () => {
    expect(1).toBe(1);
  });

  // jest.useFakeTimers();
  
  it('after login, navigate to the cram page', async () => {
   
    // jest.mock('./Services/ApiService', () => {
    //   return {apolloClient: jest.fn()}
    // });

    // jest.mock('fetch', () => fetchMock.sandbox())
    fetchMock.enableMocks();

    const { getByPlaceholderText, getByTestId, getByText, findByText,  debug } = render(
      <MockedProvider >
        <AppWrapper />
        {/* <NavigationContainer>
          <Home />
        </NavigationContainer> */}
      </MockedProvider>

    );
  
  
    // press login to use form
    act(() => {
      fireEvent.press(getByText('Log In'));
    })
    const loginBtn = getByTestId('arrow-btn');
  
    // fill out form and login
    const username = getByPlaceholderText('Username');
    const password = getByPlaceholderText('Password');
    act( ()=> {
      fireEvent.changeText(username, 'hello');
      fireEvent.changeText(password, 'world');
    })

    //something to checkbefore navigation that changes after
    expect(loginBtn).toBeTruthy();
    act( () => {
      fireEvent.press(loginBtn);
    })
    await waitFor( () => {
      console.log('inside of waitFor');
      
      const greetingMsg = findByText('need to cram');
      debug()
    })
    // fireEvent(loginBtn, 'onPress', );
  
    // navigate to the next page "cram" (passes to cram then to main)
    // check camera
    // getByTestId('expo-camera');
    // check take photo button
    // check cram header
    // check home button
    // check logout button
    // check greeting msg

    // expect(setTimeout).toHaveBeenCalledTimes(1);
    

  })

});
