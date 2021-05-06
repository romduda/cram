import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HeaderBtn() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      testID='logout-btn'
      style={styles.logOutBtn}
      onPress={() => {
        navigation.navigate("Home");
      }}
    >
      <Text style={styles.btnText}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logOutBtn: {
    borderRadius: 5,
    marginHorizontal: 15,
  },
  btnText: {
    fontFamily: "Optima-Bold",
    fontSize: 16,
    color: "white",
  },
});
