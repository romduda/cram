import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { furtherTopics } from '../Services/ApiService';

export const Crammed:any = ({ route, navigation }: any) => {
  const topic = route.params.paramC;
  return (
    <View style={styles.container}>
      <ScrollView style= {styles.scroll}>
          <View style={topic.title === 'Not Found' ? styles.notFoundContainer : styles.videoContainer}>
            <Text style={styles.videoTitle}>{topic.title}</Text>
            {topic.title === 'Not Found' ?
            <View>
              <Text>
                {topic.url}
              </Text>
            </View>
            :
            <View style={styles.found}>
              {/* <Text style={styles.caption}>Andre told you to read the docs again didnt he? Don't worry - Cram is here to the rescue!</Text> */}
              <WebView source={{ uri: topic.url }} style={styles.webview} />
            </View>
            }
            <View style={styles.bulletContainer}>
              <Text style={styles.tips}>Cheatsheet</Text>
              {topic.bullets.map((bullet:string) => {
                return (
                  <Text key={bullet} style={styles.bullet}>{'\u25CF'}  {bullet}</Text>
                )
              })}
            </View>
            <View style={styles.relatedContainer}>
              <Text style={{fontSize: 22, fontWeight: '500'}}>Related Topics</Text>
              {topic.related.map((relatedTopic:string) => {
                return (
                <TouchableOpacity
                  key={relatedTopic}
                  style={styles.relatedBtn}
                  onPress={async () => {
                    const topic = await furtherTopics(relatedTopic);
                    return navigation.push('Crammed', { paramC: topic })
                  }}
                >
                  <Text>
                    {relatedTopic}
                  </Text>
                </TouchableOpacity>)
              })}
            </View>
          </View>
        </ScrollView>
        <Button
          title="Cram again?"
          type="outline"
          onPress={() => {
            navigation.navigate('Cram');
          }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: 'black',
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
  notFoundContainer: {
    height: 600,
    padding: 50,
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  videoContainer: {
    paddingHorizontal: 50,
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    height: 1100
  },
  webview: {
    margin: 20,
    padding: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 5
  },
  videoTitle: {
    textAlign: 'center',
    fontSize: 30,
    // borderWidth: 1,
    paddingVertical: 30,
  },
  bulletContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 300,
    height: 300,
    borderWidth: 1,
    margin: 40,
    borderRadius: 5
  },
  tips: {
    fontSize: 22,
    fontWeight: '500'
  },
  bullet: {
    textAlign: 'left',
    width: '95%',
    height: '100%',
    borderRadius: 5,
    flex: 1,
    margin: 10,
    fontSize: 12,
    alignSelf: 'center',
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
    alignItems: 'center',
    height: 150,
    width: 300,
    margin: 10
  },
  relatedBtn: {
    borderWidth: 1,
    display: 'flex',
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '90%'
  },
  found: {
    height: 500,
    // marginTop: 30,
  }
})