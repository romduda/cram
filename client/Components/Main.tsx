import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Modal, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import { cramToApi, apolloClient } from '../Services/ApiService';
import Topic from '../Interfaces/Topic';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Main ({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState<Camera|null>(null);
  const [imageURI, setImageURI] = useState('');
  const [modalVisible, setModelVisible] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [topic, setTopic] = useState<Topic|null>(null);

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
            <Ionicons name="camera-reverse-outline" size={32}/>
          </TouchableOpacity>
        </Camera>
      </View>
      <Button
        title="Take Picture"
        style={styles.button}
        type="outline"
        onPress={() => takePicture()}
      />
      <Modal
        transparent={false}
        visible={modalVisible}
      >
      <View style={styles.imageModal}>
        <View style={styles.imageContainer}>
          <ImageBackground source={{uri:imageURI}} style={styles.image}>
            <TouchableOpacity onPress={() => setModelVisible(false)} style={styles.cancelContainer}>
              <Ionicons name="ios-close" size={32}/>
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.buttonContainer}>
            <Button
              title="Cram!"
              type="outline"
              onPress={async () => {
                const topic = await cramToApi(imageURI);
                if (topic.title === 'Error') {
                  return Alert.alert(
                    "Text not recognised",
                    "If you are sure text is readable, try cram again. Otherwise, please take another photo.",
                    [
                      { text: "OK" }
                    ],
                    { cancelable: false }
                    );
                  }
                  setTopic(topic);
                  setModelVisible(false);
                  return navigation.push('Crammed', { paramC: topic })
              }}
            >
            </Button>
          </View>
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
    width: '100%',
    margin: 20,
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
  },
  imageModal: {
    flex: 1,
    // backgroundColor: "black",
    paddingVertical: 80,
  },
  imageContainer: {
    // backgroundColor: "#000000aa",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 40,
    borderRadius: 10,
    overflow: 'hidden',
    // borderWidth: 1
  },
  image: {
    width: '103%',
    height: '100%',
    flex: 1,
    // borderWidth: 1
  },
  buttonsFlex: {
    flex: 1,
    display: 'flex',
    flexDirection: "row",
  },

});
