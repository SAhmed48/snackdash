import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessOrder = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f6f6f6'} barStyle={'dark-content'} />
      <LottieView
        source={require('../../Assets/Lottie/success.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <View
        style={{
          alignItems: 'center',
          gap: 10,
          bottom: 50
        }}>
        <Text style={styles.text}>Your Order Done Successfully</Text>
        <Text style={styles.text1}>You will get your order within 12 min</Text>
        <Text style={styles.text2}>thanks for using our services</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 40, gap: 20}}>
        <TouchableOpacity
          style={{
            width: 300,
            height: 50,
            borderColor: 'green',
            borderRadius: 15,
            borderWidth: 1.5,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'green', fontFamily: 'Poppins-SemiBold', fontSize: 16}}>
            Track Your Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{color: 'grey', fontFamily: 'Poppins-SemiBold', fontSize: 14}}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SuccessOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 600,
    height: 300,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    textAlign: 'center',
  },
  text1: {
    fontSize: 16.1,
    fontFamily: 'Poppins-Regular',
  },
  text2: {
    fontSize: 16.1,
    fontFamily: 'Poppins-Regular',
  },
});
