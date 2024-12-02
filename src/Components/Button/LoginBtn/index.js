import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const LoginBtn = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.loginBtnStyle}>
      <Text style={styles.loginBtnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginBtnStyle: {
    width: 120,
    height: 45,
    backgroundColor: '#33b056',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  loginBtnText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 14,
  },
});

export default LoginBtn;
