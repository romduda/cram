import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import { ApolloProvider } from '@apollo/client/react';
import { cramToApi, apolloClient } from '../Services/ApiService';

export default function Main () {
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState<Camera|null>(null);
  const [imageURI, setImageURI] = useState('');
  const [modalVisible, setModelVisible] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [videoModal, setVideoModel] = useState(false);
  const [videoURL, setVideoURL] = useState('');

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
    // <ApolloProvider client={apolloClient}>
      <View style={styles.bigContainer}>
        <View style={styles.container}>
          <Camera
            ref={ref=> setCamera(ref)}
            style={styles.camera}
            type={type}/>

        </View>
        <Button
          title= "Flip Camera"
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
        </Button>
        <Button
          title="Take Picture"
          onPress={() => takePicture()}
        />
        <Modal
          transparent={false}
          visible={modalVisible}
        >
        <View style={styles.imageModal}>
          <View style={styles.imageContainer}>
            <Image source={{uri:imageURI}} style={styles.image}/>
            <View style={styles.buttonsFlex}>
              <Button
                title = "Retake Image"
                onPress={() => setModelVisible(false)}
              />
              <Button
                title = "Cram!"
                onPress={async () => {
                  const videoURL = await cramToApi(imageURI);
                  setVideoURL(videoURL);
                  setModelVisible(false);
                  return setVideoModel(true);
                }}
              />
            </View>
          </View>
        </View>
        </Modal>
        <Modal
          transparent={false}
          visible={videoModal}
        >
        <View style={styles.imageModal}>
          <View style={styles.imageContainer}>
            <Image source={{uri:videoURL}} style={styles.image}/>
            <Button
              title = "Exit"
              onPress={() => setVideoModel(false)}
            />
          </View>
        </View>
        </Modal>
      </View>
    // </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',

  },
  camera: {
    width: '90%',
    height: '90%'
  },
  buttonContainer: {

  },
  button: {

  },
  text: {

  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageModal: {
    flex: 1,
    backgroundColor: "#000000aa",
    paddingVertical: 80
  },
  imageContainer: {
    backgroundColor: "#ffffff",
    margin: 50,
    padding: 10,
    paddingBottom: 50
  },
  retakeBtn: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    backgroundColor: 'red'
  },
  buttonsFlex: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
