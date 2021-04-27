import React from 'react';
import Main from './Main';

export const Cram = ({ navigation, route }:any) => {
  console.log(route);
  return (
    <Main navigation={navigation} route={route}/>
  )
}