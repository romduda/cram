import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import { cramToApi, apolloClient } from '../Services/ApiService';
import Topic from '../Interfaces/Topic';

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
          type={type}/>

      </View>
      <Button
        title= "Flip Camera"
        type="outline"
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
        type="outline"
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
              type="outline"
              onPress={() => setModelVisible(false)}
            />
            <Button
              title = "Cram!"
              type="outline"
              onPress={async () => {
                const topic = await cramToApi(imageURI);
                setTopic(topic);
                setModelVisible(false);
                return navigation.push('Result', { paramC: topic })
              }}
            />
          </View>
        </View>
      </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    // backgroundColor: 'orange',
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
  },

});
