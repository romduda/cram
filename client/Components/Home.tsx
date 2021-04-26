import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../Components/CustomText';
// import { Button } from 'react-native-elements';
import { Video } from "expo-av";

export const Home = ({ navigation }:any) => {
  return (
    <View style={styles.container}>
      <Video
      source={require('../assets/blurredCode.mp4')}
      style={styles.backgroundVideo}
      rate={1}
      shouldPlay={true}
      isLooping={true}
      volume={0}
      // muted={true}
      resizeMode="cover"
      />
      <Text
      style={styles.home}
      >
      CRAM
      </Text>
      <TouchableOpacity
      style={styles.btn}
      onPress={() => navigation.push('Cram', { paramA: 'Hello!' })
      }>
      <CustomText>Log In</CustomText>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  home: {
    padding: 50,
    textAlign: 'center',
    flex: 1,
    fontWeight: '600',
    marginTop: 100,
    fontSize: 50,
    color: 'white',
    fontFamily: 'Optima-Bold'
  },
  btn: {
    width: '90%',
    height: 50,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
