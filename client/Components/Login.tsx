import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function Login({
  navigation,
  modalVisible,
  setModalVisible,
  arrowVisible,
  setArrowVisible,
}: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={username}
          onChangeText={(username) => setUsername(username)}
          placeholder="Username"
          placeholderTextColor="white"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder={"Password"}
          secureTextEntry={true}
          placeholderTextColor="white"
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        testID="arrow-btn"
        style={styles.btn}
        onPress={() => {
          
          if (username && password) {
            setModalVisible(!modalVisible);
            setTimeout(() => setArrowVisible(!arrowVisible), 700);
            setTimeout(
              () => navigation.push("Cram", { paramA: username }),
              300
            );
          } else {
            return Alert.alert(
              "Incorrect username or password.",
              "Please try again.",
              [{ text: "OK" }],
              { cancelable: false }
            );
          }
        }}
      ></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "50%",
    marginTop: 250,
  },
  input: {
    width: 300,
    fontFamily: "Optima-Bold",
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 10,
    borderRadius: 5,
    color: "white",
  },
  button: {
    alignItems: "center",
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: "Optima-Bold",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: "90%",
    height: 50,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
});
