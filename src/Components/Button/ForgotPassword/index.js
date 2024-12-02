import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ForgotBtn = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.ForgotBtnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ForgotBtnText: {
    color: '#33b056',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
  },
});

export default ForgotBtn;
