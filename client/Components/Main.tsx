import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import { cramToApi, apolloClient } from '../Services/ApiService';
import { WebView } from 'react-native-webview';

export default function Main () {
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState<Camera|null>(null);
  const [imageURI, setImageURI] = useState('');
  const [modalVisible, setModelVisible] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [videoModal, setVideoModel] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [topic, setTopic] = useState(null);

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
                const topic = await cramToApi(imageURI);
                setTopic(topic);
                const videoURL = topic.url;
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
        <ScrollView style= {styles.scroll}>
          <View style={styles.videoContainer}>
            <Text style={styles.videoTitle}>{topic && topic.title}</Text>
            <Text style={styles.caption}>Andre told you to read the docs again didnt he? Don't worry - Cram is here to the rescue!</Text>
            <WebView source={{ uri: videoURL }} style={styles.webview} />
            <View style={styles.relatedContainer}>
              <Text>Did you cram? Check out these related pages if you have time!</Text>
              {topic && topic.related.map(relatedTopic => {
                return (
                <TouchableOpacity key={relatedTopic} style={styles.relatedBtn}>
                  <Text>
                    {relatedTopic}
                  </Text>
                </TouchableOpacity>)
            })}</View>
            <Button
              title = "Cram again?"
              onPress={() => setVideoModel(false)}
              />
          </View>
        </ScrollView>
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
  },
  videoContainer: {
    padding: 50,
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    height: 800
  },
  webview: {
    margin: 20,
    padding: 50,
    width: 300,
    overflow: 'hidden',
    borderWidth: 1
  },
  videoButtons: {

  },
  videoTitle: {
    textAlign: 'center',
    fontSize: 30
  },
  scroll: {
    display: 'flex',
    flex: 1,
  },
  caption: {
    padding: 10
  },
  relatedContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: 150,
    margin: 10,
  },
  relatedBtn: {
    borderWidth: 1,
    display: 'flex',
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }

});
