import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken(
  'sk.eyJ1IjoibXVoYW1tYWRhbGkxOCIsImEiOiJjbTRmbGJ1N2wxNHNvMmtzODl6bG0xNXlxIn0.nPL3nNTRhRks0gFuvIeu-Q',
);

const MyLocation = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState([0, 0]);

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoordinates([longitude, latitude]); // Mapbox uses [longitude, latitude]
        Geocoder.from(latitude, longitude)
          .then(json => {
            const formattedAddress = json.results[0].formatted_address;
            setLocation(formattedAddress);
          })
          .catch(error => console.log(error));
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 10000,
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f6f6f6'} />
      <View style={styles.topView} />
      <View style={{flex: 1}}>
        <Mapbox.MapView style={{flex: 1}} rotateEnabled={true}>
          <Mapbox.Camera
            animationMode="flyTo"
            animationDuration={2000}
            zoomLevel={14}
            centerCoordinate={coordinates}
          />
          <Mapbox.UserLocation visible={true} />
          <Mapbox.PointAnnotation
            id="user-location-marker"
            coordinate={coordinates} // Dynamic user location
          />
        </Mapbox.MapView>
        <Text>{location}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    width: '100%',
    height: 65,
    backgroundColor: '#f6f6f6',
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

export default MyLocation;
