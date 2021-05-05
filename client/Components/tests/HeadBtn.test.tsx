import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import HeaderBtn from "../HeaderBtn";

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate
    })
  }
})


describe('pressing logout, takes you back to home logged out', () => {


  it('logout button navigates to home', () => {
    const { debug, getByTestId } = render(
        <HeaderBtn />
    )
    const logoutBtn = getByTestId('logout-btn');
    fireEvent.press(logoutBtn)
    expect(mockedNavigate).toHaveBeenCalledWith("Home");
  })

})