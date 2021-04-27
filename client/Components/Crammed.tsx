import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { furtherTopics } from '../Services/ApiService';
import CustomText from './CustomText';

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
            <Text style={{fontSize: 22, fontWeight: '500', color:'white', fontFamily: 'Optima-Bold',}}>Related Topics</Text>
            <View style={styles.relatedContainer}>
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
                  <Text style={{color:'white', fontFamily: 'Optima-Bold'}}>
                    {relatedTopic}
                  </Text>
                </TouchableOpacity>)
              })}
            </View>
          </View>
        </ScrollView>
        {/* <Button
          title="Cram again?"
          type="outline"
          onPress={() => {
            navigation.navigate('Cram');
          }}
        /> */}
        <TouchableOpacity
        style={styles.againBtn}
        onPress={() => {
          navigation.navigate('Cram');
        }}
        >
          <CustomText>
            Cram again?
          </CustomText>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1F1F1F',
    color: 'white'
  },
  home: {
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
    // paddingHorizontal: 50,
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    height: 1200,
    // borderWidth: 1,
    // borderColor: 'white'
    marginBottom: 50,
  },
  webview: {
    margin: 20,
    padding: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white'
  },
  videoTitle: {
    textAlign: 'center',
    fontSize: 30,
    color:'white',
    fontFamily: 'Optima-Bold',
    paddingVertical: 30,
  },
  bulletContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 300,
    height: 300,
    borderWidth: 1,
    margin: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: 'white'
  },
  tips: {
    fontSize: 22,
    padding: 20,
    fontWeight: '500',
    color:'white',
    fontFamily: 'Optima-Bold',
  },
  bullet: {
    textAlign: 'left',
    width: '95%',
    height: '100%',
    borderRadius: 5,
    flex: 1,
    margin: 5,
    fontSize: 12,
    alignSelf: 'center',
    color:'white',
    fontFamily: 'Optima-Bold',
  },
  scroll: {
    display: 'flex',
    flex: 1,
    width: '100%'
  },
  caption: {
    padding: 10
  },
  relatedContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // height: 300,
    width: 300,
    margin: 10,
    // borderColor: 'white',
    // borderWidth: 1
    // paddingVertical: 20,
  },
  relatedBtn: {
    borderWidth: 1,
    borderColor: 'white',
    // display: 'flex',
    // flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '90%',
    height: 60,
    color:'white',
    fontFamily: 'Optima-Bold',
  },
  found: {
    height: 500,
  },
  againBtn: {
    width: '100%',
    height: 55,
    // borderWidth: 1,
    // borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'blue',
    paddingHorizontal: 30,
  }
})