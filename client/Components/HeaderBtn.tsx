import React from 'react'
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function HeaderBtn () {
  const navigation = useNavigation();
  return (
    <Button
      style={styles.logOutBtn}
      title="Logout"
      type="clear"
      onPress={() => {
        navigation.navigate('Home');
      }}
    />
  )
}

const styles = StyleSheet.create({
  logOutBtn: {
    // borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 7,
    // marginVertical: 5
  }
})
