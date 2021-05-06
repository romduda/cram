import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { furtherTopics } from "../Services/ApiService";
import CustomText from "./CustomText";

export const Crammed: any = ({ route, navigation }: any) => {
  const topic = route.params.paramC;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View
          style={
            topic.title === "Not Found"
              ? styles.notFoundContainer
              : styles.videoContainer
          }
        >
          <Text style={styles.videoTitle}>{topic.title}</Text>
          {topic.title && topic.title === "Not Found" 
            ? (
            <View>
              <Text>{topic.url}</Text>
            </View>
          ) : (
            <View style={styles.found} testID="video-container">
              <WebView source={{ uri: topic.url }} style={styles.webview} />
            </View>
          )}
          <View style={styles.bulletContainer} testID="bullet-container">
            <Text style={styles.tips}>Cheatsheet</Text>
            {topic.title && topic.bullets.map((bullet: string) => {
              return (
                <View key={bullet} style={styles.bullet}>
                  <Text style={styles.bulletText}>
                    {"\u25CF"} {bullet}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              color: "white",
              fontFamily: "Optima-Bold",
              marginTop: 20,
            }}
          >
            Related Topics
          </Text>
          <View style={styles.relatedContainer} testID="related-topics-container">
            {topic.related.map((relatedTopic: string) => {
              return (
                <TouchableOpacity
                  key={relatedTopic}
                  style={styles.relatedBtn}
                  onPress={async () => {
                    const topic = await furtherTopics(relatedTopic);
                    return navigation.push("Crammed", { paramC: topic });
                  }}
                >
                  <Text style={{ color: "white", fontFamily: "Optima-Bold" }}>
                    {relatedTopic}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        testID='cram-again-btn'
        style={styles.againBtn}
        onPress={() => {
          setTimeout(() => {
            navigation.navigate("Cram");
          }, 100);
        }}
      >
        <CustomText>Cram again?</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#1F1F1F",
    color: "white",
  },
  home: {
    padding: 50,
    textAlign: "center",
    flex: 1,
  },
  btn: {
    padding: 50,
  },
  notFoundContainer: {
    height: 600,
    padding: 50,
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  videoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
  webview: {
    margin: 20,
    padding: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
  },
  videoTitle: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    fontFamily: "Optima-Bold",
    paddingVertical: 30,
  },
  bulletContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 300,
    borderWidth: 1,
    margin: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "white",
  },
  tips: {
    fontSize: 22,
    padding: 20,
    fontWeight: "500",
    color: "white",
    fontFamily: "Optima-Bold",
  },
  bullet: {
    textAlign: "left",
    width: "95%",
    borderRadius: 5,
    margin: 5,
  },
  bulletText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Optima-Bold",
    padding: 10,
  },
  scroll: {
    display: "flex",
    flex: 1,
    width: "100%",
  },
  relatedContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 300,
    marginTop: 30,
  },
  relatedBtn: {
    borderWidth: 1,
    borderColor: "white",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "90%",
    height: 60,
    color: "white",
    fontFamily: "Optima-Bold",
  },
  found: {
    height: 500,
  },
  againBtn: {
    width: "100%",
    height: 55,
    borderRadius: 5,
    backgroundColor: "#3333FF",
    paddingHorizontal: 30,
  },
});
