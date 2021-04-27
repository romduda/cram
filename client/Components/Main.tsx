import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { Camera } from 'expo-camera';
import { cramToApi, apolloClient } from '../Services/ApiService';
import Topic from '../Interfaces/Topic';
import CustomText from './CustomText';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Main ({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState<Camera|null>(null);
  const [imageURI, setImageURI] = useState('');
  const [modalVisible, setModelVisible] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [topic, setTopic] = useState<Topic|null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const picture = await camera.takePictureAsync();
      setImageURI(picture.uri);
      setModelVisible(true);
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <Camera
          ref={ref=> setCamera(ref)}
          style={styles.camera}
          type={type}
          >
          <TouchableOpacity
            style={styles.flip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name="camera-reverse-outline" color="white" size={38}/>
          </TouchableOpacity>
        </Camera>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => takePicture()}
      >
        <Ionicons name="radio-button-on-outline" color="white" size={72}></Ionicons>
      </TouchableOpacity>
      <Modal
        transparent={false}
        visible={modalVisible}
      >
      <View style={styles.imageModal}>
        <Spinner
          visible={loading}
          textContent={'Scanning...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.imageContainer}>
          <ImageBackground source={{uri:imageURI}} style={styles.image}>
            <TouchableOpacity onPress={() => setModelVisible(false)} style={styles.cancelContainer}>
              <Ionicons name="ios-close" color="white" size={32}/>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cramButton}
            onPress={async () => {
              setLoading(true);
              const topic = await cramToApi(imageURI);
              if (topic.title === 'Error') {
                return Alert.alert(
                  "Text not recognised",
                  "If you are sure text is readable, try cram again. Otherwise, please take another photo.",
                  [
                    { text: "OK" ,  onPress: () => setLoading(false)}
                  ],
                  { cancelable: false }
                );
              }
                setTopic(topic);
                setModelVisible(false);
                navigation.push('Crammed', { paramC: topic })
                return setLoading(false);
            }}
          >
          <CustomText>
            CRAM!
          </CustomText>
          </TouchableOpacity>
        </View>
      </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 30,
    borderWidth: 1,
    height: 140,
    width: 300,
    overflow: 'hidden'
  },
  camera: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  buttonContainer: {
    width: '70%',
  },
  cramButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    // padding: 10,
    height: 50,
  },
  cancelContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20
  },
  flip: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10
  },
  button: {
    width: 300,
    paddingBottom: 15,
    display: 'flex',
    alignItems: 'center'
  },
  imageModal: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 80,
    display: 'flex',
    alignItems: 'center',

  },
  imageContainer: {
    // backgroundColor: "#000000aa",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '70%',
    margin: 40,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    borderRadius: 5,
  },
  spinnerTextStyle: {
    color: 'white',
    fontWeight: '200'
  },

});
