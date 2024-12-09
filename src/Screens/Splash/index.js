import {SafeAreaView, StyleSheet, Image, StatusBar} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Images from '../../Constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    const handleNavigation = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        if (!hasSeenOnboarding) {
          navigation.reset({
            index: 0,
            routes: [{name: 'OnBoarding'}],
          });
          return;
        }
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Tab'}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }
      } catch (error) {
        console.log('Error:', error);
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    };

    handleNavigation();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#36ba5a'} />
      <Image source={Images.SplashLogo} style={styles.imageStyle} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#36ba5a',
  },
  imageStyle: {
    width: 300,
    height: 300,
  },
});

export default Splash;