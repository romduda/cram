import React from "react";
import { StyleSheet, Text } from "react-native";

export default function CustomText(props: any) {
  return <Text style={styles.text}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontFamily: "Optima-Bold",
    fontSize: 20,
    color: "white",
    height: "100%",
    backgroundColor: "#3333FF",
    padding: 13,
  },
});
