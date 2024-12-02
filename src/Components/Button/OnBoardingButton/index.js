import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({onPress, Name = ''}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={styles.getStartedBtn}
        useAngle={true}
        angle={90}
        colors={['#63dc80', '#55c36f', '#3db65e']}>
        <Text style={styles.getStartedBtnText}>{Name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  getStartedBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5cce76',
    width: 300,
    height: 45,
    borderRadius: 22,
  },
  getStartedBtnText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
});

export default Button;
