import React from "react";
import Main from "./Main";

export const Cram = ({ navigation, route }: any) => {
  console.log('hi from Cram.tsx', route);
  
  return <Main navigation={navigation} route={route} />;
};
