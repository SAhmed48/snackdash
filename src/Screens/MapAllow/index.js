import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import Button from '../../Components/Button/OnBoardingButton';
import Images from '../../Constants/Images';
import data from '../../Data/MapTextData';
import styles from './styles';
import Geocoder from 'react-native-geocoding';
import {useDispatch} from 'react-redux';
import {setMapData} from '../../Redux/Action';

const MapAllow = () => {
  const [location, setLocation] = React.useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLocationTurnOn = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Sahlah',
          message: 'Sahlah wants to know your location',
          buttonNeutral: 'Ask Me Later',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            Geocoder.from(latitude, longitude).then(json => {
              const formatted_Address = json.results[0].formatted_address;
              setLocation(formatted_Address);
              dispatch(setMapData(formatted_Address));
              console.log(formatted_Address);
            });
            console.log('User position:', position);
          },
          error => {
            console.log('Error getting location:', error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        navigation.navigate('Login');
      } else {
        console.log('Location Permission Denied');
      }
    } catch (error) {
      console.log('Permission error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.imagePosition}>
        <Image source={Images.Map} />
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.TextPosition}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      ))}
      <View style={styles.btnPosition}>
        <Button Name="Yes, turn it on" onPress={onLocationTurnOn} />
        <TouchableOpacity>
          <Text style={{fontFamily: 'Poppins-Medium'}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MapAllow;
