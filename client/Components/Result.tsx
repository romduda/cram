import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export const Result = ({ route }:any) => {
  const topic = route.params.paramC;
  const videoURL = topic.url;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView style= {styles.scroll}>
          <View style={styles.videoContainer}>
            <Text style={styles.videoTitle}>{topic && topic.title}</Text>
            <Text style={styles.caption}>Andre told you to read the docs again didnt he? Don't worry - Cram is here to the rescue!</Text>
            <WebView source={{ uri: videoURL }} style={styles.webview} />
            <View style={styles.relatedContainer}>
              <Text>Did you cram? Check out these related pages if you have time!</Text>
              {topic && topic.related.map((relatedTopic:string) => {
                return (
                <TouchableOpacity key={relatedTopic} style={styles.relatedBtn}>
                  <Text>
                    {relatedTopic}
                  </Text>
                </TouchableOpacity>)
            })}</View>
          </View>
        </ScrollView>
        <Button
          title = "Cram again?"
          type="outline"
          onPress={() => {
            navigation.pop();
          }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  home: {
    backgroundColor: 'orange',
    padding: 50,
    textAlign: 'center',
    flex: 1
  },
  btn: {
    padding: 50
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
})