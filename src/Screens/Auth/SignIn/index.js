import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Images from '../../../Constants/Images';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {
  AuthenticatedBtnData,
  socialBtnData,
  socialBtnDataSign,
} from '../../../Data/BtnData';
import styles from './styles';
import useInputData from '../../../Data/TextInput';
import ForgotBtn from '../../../Components/Button/ForgotPassword';
import LoginBtn from '../../../Components/Button/LoginBtn';
import SocialBtn from '../../../Components/Button/SocialBtn';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {horizontalScale} from '../../../Utils/ScaleSize';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthCredential} from '../../../Redux/Action';

const SignIn = () => {
  const [username, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [selected, setSelected] = React.useState(1);
  const [focusedField, setFocusedField] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const {InputData, InputDetails} = useInputData();
  const dispatch = useDispatch();

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1043161679400-s95di5nu55sskm8icmmfroeeho02lfet.apps.googleusercontent.com',
    });
  }, []);

  const handleFocus = field => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const onSignIn = async () => {
    setLoading(true);
    if (username === '' || email === '' || password === '') {
      Alert.alert('Please Enter all Fields');
      setLoading(false);
      return;
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
        username,
      );
      console.log(userCredential);
      ToastAndroid.showWithGravity(
        'User Registered Successfully',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      const data = {
        name: username,
        emailSend: email,
        code: password,
      };
      dispatch(setAuthCredential(data));
      console.log(data);
      navigation.navigate('Tab');
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
      setLoading(false);
    }
  };

  const handleInputChange = field => text => {
    if (field === 'Username') setUserName(text);
    else if (field === 'Email Address') setEmail(text);
    else if (field === 'Password') setPassword(text);
  };

  const getIcon = (field, isFocused) => {
    const color = isFocused ? '#33b056' : 'black';
    switch (field) {
      case 'Username':
        return (
          <MaterialCommunityIcons
            name="account-outline"
            size={20}
            color={color}
            style={{left: 5}}
          />
        );
      case 'Email Address':
        return (
          <Fontisto name="email" size={19} color={color} style={{left: 5}} />
        );
      case 'Password':
        return (
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            color={color}
            style={{left: 5}}
          />
        );
      default:
        return null;
    }
  };

  const onPressSocial = id => {
    id === 1 ? onGoogleSignIn() : id === 2 ? onFacebookLogIn() : null;
  };

  const onPressSocialSign = id => {
    id === 1 ? onFacebookButtonPress() : id === 2 ? onGoogleRegister() : null;
  };

  const onFacebookLogIn = async () => {
    try {
      const {isCancelled} = await LoginManager.logInWithPermissions(['email']);
      if (isCancelled) return console.log('Login cancelled');
      const {accessToken} = await AccessToken.getCurrentAccessToken();
      if (!accessToken) return console.log('Failed to get access token');
      await auth().signInWithCredential(
        auth.FacebookAuthProvider.credential(accessToken),
      );
      navigation.navigate('Tab');
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', error.message);
    }
  };

  const onGoogleRegister = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = (await GoogleSignin.signIn()).data;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };

  const onGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = (await GoogleSignin.signIn()).data;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const result = await auth().signInWithCredential(googleCredential);
      console.log(googleCredential);
      console.log(result.user.displayName);
      const data = {
        name: result.user.displayName,
      };
      dispatch(setAuthCredential(data));
      navigation.navigate('Tab');
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const onLogIn = () => {
    setLoading(true);
    if (email === '' || password === '') {
      Alert.alert('Please Enter all Fields');
      setLoading(false);
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password, username)
      .then(async userCredential => {
        const user = userCredential.user;

        if (!user.displayName) {
          const displayName = username; // Replace with dynamic logic if needed
          await user.updateProfile({
            displayName: displayName,
          });
          console.log('Display name set to:', displayName);
        }
        ToastAndroid.showWithGravity(
          'User Logged in Successfully',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );

        console.log('User Info:', user);
        dispatch(setAuthCredential());
        navigation.navigate('Tab');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderInputFields = inputData => {
    return inputData.map(({feild, ref, keyBoardType, nextRef}) => {
      const isFocused = focusedField === feild;
      return (
        <View key={feild} style={{position: 'relative'}}>
          <TextInput
            ref={ref}
            returnKeyType={
              feild === 'Email Address'
                ? 'next'
                : feild === 'Username'
                ? 'next'
                : 'done'
            }
            keyboardType={keyBoardType}
            style={[
              styles.InputText,
              {borderColor: isFocused ? '#33b056' : '#f0f0f0'},
            ]}
            onChangeText={handleInputChange(feild)}
            placeholder={feild}
            value={
              feild === 'Email Address'
                ? email
                : feild === 'Username'
                ? username
                : password
            }
            onSubmitEditing={() => nextRef?.current?.focus()}
            placeholderTextColor={isFocused ? '#33b056' : '#d8d8d8'}
            onFocus={() => handleFocus(feild)}
            onBlur={handleBlur}
            secureTextEntry={feild === 'Password'}
          />
          <View
            style={{
              position: 'absolute',
              left: horizontalScale(15),
              top: '25%',
            }}>
            {getIcon(feild, isFocused)}
          </View>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.HalfContainer}>
        <Image source={Images.SplashLogo} style={styles.imageStyle} />
      </View>
      <View style={styles.formContainerView}>
        <View
          style={[
            styles.formContainer1,
            selected === 2 && styles.formContainer2,
          ]}>
          <View style={styles.loginSignUpContainerView}>
            <View
              style={[
                styles.loginSignUpContainer,
                {backgroundColor: selected === 1 ? '#33b056' : '#f2f2f2'},
              ]}>
              {AuthenticatedBtnData.map(
                ({id, title, buttonStyle, selectedStyle}) => (
                  <TouchableOpacity
                    onPress={() => setSelected(id)}
                    key={id}
                    style={[buttonStyle, selected === id && selectedStyle]}>
                    <Text
                      style={[
                        selected === id ? styles.selectedText : styles.text,
                      ]}>
                      {title}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </View>
          {selected === 1 && (
            <>
              <View style={styles.LoginContainerView}>
                <View style={styles.LoginContainer}>
                  <View style={styles.InputTextView}>
                    {renderInputFields(InputData)}
                  </View>
                  <View style={styles.ForgotView}>
                    <ForgotBtn
                      onPress={() => navigation.navigate('Forgot')}
                      title={'Forgot Password ?'}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.loginWithView}>
                <Text style={styles.loginWithText}>or login with</Text>
              </View>
              <View style={styles.socialoginView}>
                {socialBtnData.map((item, index) => (
                  <View key={index}>
                    <SocialBtn
                      source={item.image}
                      onPress={() => onPressSocial(item.id)}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.dontHaveAccountView}>
                <Text style={styles.dontHaveAccountText}>
                  Don't have an account?
                </Text>
                <Text
                  onPress={() => setSelected(2)}
                  style={styles.registerBtnText}>
                  Register Now
                </Text>
              </View>
              <View style={styles.loginBtnView}>
                <LoginBtn
                  onPress={onLogIn}
                  title={
                    loading ? (
                      <ActivityIndicator color={'white'} size={25} />
                    ) : (
                      'LOGIN'
                    )
                  }
                />
              </View>
            </>
          )}
          {selected === 2 && (
            <>
              <View style={styles.LoginContainerView}>
                <View style={styles.LoginContainer}>
                  <View style={styles.InputTextView}>
                    {renderInputFields(InputDetails)}
                    {socialBtnDataSign.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => onPressSocialSign(item.id)}
                        key={index}
                        style={styles.socialSignBtnStyle}>
                        <Image source={item.image} />
                        <Text
                          style={
                            item.id === 1
                              ? styles.facebookBtnText
                              : styles.googleBtnText
                          }>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.alreadyHaveAccountView}>
                <Text style={styles.alreadyHaveAccountText}>
                  Already have an account?
                </Text>
                <Text onPress={() => setSelected(1)} style={styles.signInText}>
                  Login Now
                </Text>
              </View>
              <View style={styles.sigInBtnView}>
                <TouchableOpacity
                  onPress={onSignIn}
                  style={styles.signInBtnStyle}>
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.signInBtnText}>SIGN IN</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(SignIn);
