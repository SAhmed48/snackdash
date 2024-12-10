import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import MaterialTopTab from '../../Navigation/MaterialTopNavigator';

const AddCart = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f6f6f6'} barStyle={'dark-content'} />
      <MaterialTopTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AddCart;
