import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export const Screen2 = ({ navigation }:any) => {
  return (
    <View>
      <Text>Screen2</Text>
      <Button
        title="Click to go to screen 1"
        onPress={() => {
          navigation.push('Screen1', { paramA: 'Hello!' })
        }}
      />
    </View>
  )
}
