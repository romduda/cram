import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { Video } from "expo-av";

export const Home = ({ navigation }:any) => {
  return (
    <View style={styles.container}>
      <Video
      source={require('../assets/developerVid.mp4')}
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
      <Ionicons name="information-circle-outline" size={80} style={{color: 'white'}}/>
      </Text>
      <Button
        title="Login"
        type="solid"
        style={styles.btn}
        onPress={() => {
          navigation.push('Cram', { paramA: 'Hello!' })
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  home: {
    padding: 50,
    textAlign: 'center',
    flex: 1,
    fontWeight: '600',
    marginTop: 100,
    fontSize: 30,
  },
  btn: {
    padding: 50
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
