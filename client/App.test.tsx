import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import fetchMock from 'jest-fetch-mock';
import 'react-native-gesture-handler/jestSetup';
import { AppWrapper } from './App';
import { Camera } from 'expo-camera';

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
  const expoCamera: any = jest.createMockFromModule('expo-camera');
  expoCamera.Camera.requestPermissionsAsync = jest
    .fn()
    .mockResolvedValue({ status: 'granted' });
  return expoCamera;
});

describe('Login', () => {
  afterEach(cleanup);

  //INTEGRATION TEST
  it('after login, navigate to the cram page and render important components', async () => {
    fetchMock.enableMocks();

    const {
      getByPlaceholderText,
      getByTestId,
      getByText,
      findByText,
      findByTestId,
      debug,
    } = render(
      <MockedProvider>
        <AppWrapper />
      </MockedProvider>
    );

    // press login to use form
    act(() => {
      fireEvent.press(getByText('Log In'));
    });
    const loginBtn = getByTestId('arrow-btn');

    // fill out form and login
    const username = getByPlaceholderText('Username');
    const password = getByPlaceholderText('Password');
    act(() => {
      fireEvent.changeText(username, 'hello');
      fireEvent.changeText(password, 'world');
    });

    act(() => {
      fireEvent.press(loginBtn);
    });
    await waitFor(async () => {
      // Not checking for "...what do you need to cram?" message since it's
      // inside of Camera component which we're mocking
      await findByText('Cram');
      await findByText('Logout');
      await findByText('Home');
      await findByTestId('take-picture-btn');
      await findByTestId('CRAM-button');
    });
  });
});
