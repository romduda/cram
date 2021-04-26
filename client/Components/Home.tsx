import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
        <Text style={styles.text}>Log In</Text>
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
  text: {
    textAlign: 'center',
    // marginBottom: 30,
    fontFamily: 'Optima-Bold',
    fontSize: 20,
    color: 'white',
    height: '100%',
    // borderWidth: 1,
    backgroundColor: 'blue',
    flex: 1,
    padding: 12,
  },
  btn: {
    width: '90%',
    height: 50,
    borderRadius: 5,
    // borderWidth: 10,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
    // paddingVertical: 15,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
