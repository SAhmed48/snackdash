import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from 'react-native';
import Images from '../../../Constants/Images';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';

const Forgot = () => {
  const [email, setEmail] = React.useState('');
  const onReset = async() => {
    const data = {
      email: email,
    }
    data.email === '' ? alert('Please enter your email') : null;
    const response = await firebase.auth().sendPasswordResetEmail(data.email);
    if(response){
      ToastAndroid.show('Password reset link sent to your email', ToastAndroid.SHORT);
    }
    return response;
  }
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.HalfContainer}>
        <Image source={Images.SplashLogo} style={styles.imageStyle} />
      </View>
      <View style={styles.formContainerView}>
        <View style={styles.formContainer1}>
          <View style={{alignItems: 'center', marginTop: 25}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 22}}>
              Reset Password
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 5}}>
            <Text
              style={{
                color: '#B2B2B2',
                fontSize: 13,
                marginTop: 10,
                width: 270,
                textAlign: 'center',
                fontFamily: 'Poppins-Regular',
              }}>
              Enter your E-mail or phone and we'll{'\n'}send you a link to get
              back into{'\n'}your account
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 35}}>
            <TextInput
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="Email / Phone Number"
              style={styles.InputText}
              placeholderTextColor={'#d8d8d8'}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginBottom: -20,
            }}>
            <TouchableOpacity
              onPress={onReset}
              style={{
                width: 120,
                height: 45,
                backgroundColor: '#33b056',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 15,
                  color: 'white',
                }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={Images.Arrow} />
        </Pressable>
        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
          Back to{' '}
          {
            <Text
              onPress={() => navigation.goBack()}
              style={{
                color: 'green',
                textDecorationLine: 'underline',
                fontFamily: 'Poppins-Medium',
              }}>
              Log In
            </Text>
          }{' '}
          Page?
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  HalfContainer: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#33b056',
    alignItems: 'center',
  },
  imageStyle: {
    width: 210,
    height: 210,
  },
  formContainerView: {
    alignItems: 'center',
    bottom: 70,
  },
  formContainer1: {
    borderRadius: 10,
    width: 325,
    height: 325,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  InputTextView: {
    gap: 20,
    alignItems: 'center',
  },
  InputText: {
    padding: 5,
    paddingHorizontal: 45,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    fontSize: 13,
    color: 'black',
    width: 270,
    height: 45,
    borderWidth: 1.5,
    borderColor: '#f0f0f0',
    backgroundColor: 'white',
    borderRadius: 25,
    textAlignVertical: 'center',
  },
});

export default Forgot;
