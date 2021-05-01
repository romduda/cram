import React from 'react';
import { render } from '@testing-library/react-native';

import TestComponent from '../TestComponent'

it('TestComponent', () => {
  // arrange
  const component = render(<TestComponent/>).toJSON();

  // act
  // assert
  expect(component).toMatchSnapshot();
})

//TODO delete before we finish the project