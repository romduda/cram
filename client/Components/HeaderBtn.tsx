import React from 'react'
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default function HeaderBtn () {
  return (
    <Button style={styles.logOutBtn} title="Logout" type="outline">
    </Button>
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
