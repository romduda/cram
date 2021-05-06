import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { Camera } from 'expo-camera';
import { cramToApi } from '../Services/ApiService';
import Topic from '../Interfaces/Topic';
import CustomText from './CustomText';

export default function Main({ navigation, route }: any) {
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [imageURI, setImageURI] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [topic, setTopic] = useState<Topic | null>(null);
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
      setModalVisible(true);
    }
  };

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={type}
          testID="expo-camera"
        >
          <TouchableOpacity
            testID="camera-flip-btn"
            style={styles.flip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Ionicons name="camera-reverse-outline" color="white" size={38} />
          </TouchableOpacity>
          <View style={styles.imageTextContainer}>
            <Text style={styles.imageText}>
              {' '}
              Hi {route.params.paramA}, what do you need to cram?{' '}
            </Text>
          </View>
        </Camera>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => takePicture()}
        testID="take-picture-btn"
      >
        <Ionicons
          name="radio-button-on-outline"
          color="white"
          size={72}
        ></Ionicons>
      </TouchableOpacity>
      <Modal transparent={false} visible={modalVisible}>
        <View style={styles.imageModal}>
          <Spinner
            visible={loading}
            textContent={'Scanning...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.imageContainer}>
            <ImageBackground source={{ uri: imageURI }} style={styles.image}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelContainer}
              >
                <Ionicons name="ios-close" color="white" size={32} />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View testID="CRAM-button" style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cramButton}
              onPress={async () => {
                setLoading(true);
                const topic = await cramToApi(imageURI);

                if (topic.title === 'Error') {
                  return Alert.alert(
                    'No text found!',
                    'Try taking another photo.',
                    [{ text: 'OK', onPress: () => setLoading(false) }],
                    { cancelable: false }
                  );
                }
                setTopic(topic);
                setModalVisible(false);
                navigation.push('Crammed', { paramC: topic });
                return setLoading(false);
              }}
            >
              <CustomText>CRAM</CustomText>
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
    backgroundColor: '#1F1F1F',
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
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
  },
  buttonContainer: {
    width: '79%',
    marginBottom: 30,
  },
  cramButton: {
    borderRadius: 10,
    height: 50,
  },
  cancelContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  imageTextContainer: {
    width: '100%',
    height: 70,
  },
  imageText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontFamily: 'Optima-Bold',
  },
  flip: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    width: 300,
    paddingBottom: 15,
    display: 'flex',
    alignItems: 'center',
  },
  imageModal: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    paddingVertical: 20,
    display: 'flex',
    alignItems: 'center',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '79%',
    marginTop: 75,
    marginBottom: 25,
    borderRadius: 5,
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
    fontWeight: '200',
  },
});
