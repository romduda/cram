import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../Components/CustomText";
import Login from "./Login";
import { Video } from "expo-av";

export const Home = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/blurredCode.mp4")}
        style={styles.backgroundVideo}
        rate={1}
        shouldPlay={true}
        isLooping={true}
        volume={0}
        resizeMode="cover"
        testID="background-video"
      />
      <Text style={styles.home}>CRAM</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setArrowVisible(!arrowVisible);
          return setModalVisible(!modalVisible);
        }}
        
      >
        <CustomText>
          {arrowVisible ? (
            <Text testID="arrow-icon">
              <Ionicons
                name="arrow-forward-outline"
                size={25}
                style={{ flex: 1 }}
              >
              </Ionicons>
            </Text>
          ) : (
            "Log In"
          )}
        </CustomText>
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          testID="modal-login"
        >
          <Login
            navigation={navigation}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            setArrowVisible={setArrowVisible}
            arrowVisible={arrowVisible}
          ></Login>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  home: {
    padding: 50,
    textAlign: "center",
    flex: 1,
    fontWeight: "600",
    marginTop: 100,
    fontSize: 50,
    color: "white",
    fontFamily: "Optima-Bold",
  },
  btn: {
    width: "90%",
    height: 50,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modal: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalContainer: {
    display: "flex",
    justifyContent: "flex-end",
    // margin: 100,
  },
});
