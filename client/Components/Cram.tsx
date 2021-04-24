import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Main from './Main';

export const Cram = ({ navigation }:any) => {
  return (
    <Main navigation={navigation}/>
  )
}