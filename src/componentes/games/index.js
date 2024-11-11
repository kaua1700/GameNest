import React from 'react';
import {View, Text, TouchableOpacity,Image, StyleSheet} from 'react-native';

export default function Games(props) {


function filterDesc(desc) {
  if(desc.length < 27) {
    return desc;
  } 
  return `${desc.substring(0, 22)}...`;
}

  return(
    <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <Image 
      source={props.img}
      style={styles.gameImg}
      />
      <Text style={styles.gameText}>
      {filterDesc(props.children)}
      </Text>
      <View opacity={0.6}>
      <Text style={styles.gameText}>{props.cost}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameImg: {
    width: 175,
    height: 175,
    maxHeight: 175,
    maxWidth: 175
  },
  gameText: {
    color: '#FF4081',
    fontFamily: 'Roboto',
    fontSize: 16,
  }
});