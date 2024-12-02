import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const SocialBtn = ({onPress, source}) => {
  return (
    <TouchableOpacity
      style={[styles.socialLoginBtnStyle]}
      onPress={onPress}>
      <Image source={source} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialLoginBtnStyle: {
    width: 45,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SocialBtn;
