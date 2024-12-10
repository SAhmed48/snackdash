import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from 'react-native';
import Images from '../../../Constants/Images';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import styles from './styles';

const Forgot = () => {
  const [email, setEmail] = React.useState('');
  const onReset = async () => {
    const data = {
      email: email,
    };
    data.email === '' ? alert('Please enter your email') : null;
    const response = await firebase.auth().sendPasswordResetEmail(data.email);
    if (response) {
      ToastAndroid.show(
        'Password reset link sent to your email',
        ToastAndroid.SHORT,
      );
    }
    return response;
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.HalfContainer}>
        <Image source={Images.SplashLogo} style={styles.imageStyle} />
      </View>
      <View style={styles.formContainerView}>
        <View style={styles.formContainer1}>
          <View style={styles.forgotContainerView}>
            <Text style={styles.resetTextStyle}>Reset Password</Text>
          </View>
          <View style={styles.resetTextView}>
            <Text style={styles.resetTextEnter}>
              Enter your E-mail or phone and we'll{'\n'}send you a link to get
              back into{'\n'}your account
            </Text>
          </View>
          <View style={styles.inputTextView}>
            <TextInput
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="Email / Phone Number"
              style={styles.InputText}
              placeholderTextColor={'#d8d8d8'}
            />
          </View>
          <View style={styles.sendBtnView}>
            <TouchableOpacity onPress={onReset} style={styles.sendBtnStyle}>
              <Text style={styles.sendBtnText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.backArrow}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={Images.Arrow} />
        </Pressable>
        <Text style={styles.backToText}>
          Back to{' '}
          {
            <Text onPress={() => navigation.goBack()} style={styles.logInText}>
              Log In
            </Text>
          }{' '}
          Page?
        </Text>
      </View>
    </SafeAreaView>
  );
};


export default Forgot;