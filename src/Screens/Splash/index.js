import {SafeAreaView, StyleSheet, Image, StatusBar} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Images from '../../Constants/Images';

const Splash = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OnBoarding');
    }, 2000);
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
