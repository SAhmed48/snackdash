import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
// import MapboxGL from '@rnmapbox/maps';
import Octicons from 'react-native-vector-icons/Octicons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';

// MapboxGL.setAccessToken('sk.eyJ1IjoibXVoYW1tYWRhbGkxOCIsImEiOiJjbTRmbGJ1N2wxNHNvMmtzODl6bG0xNXlxIn0.nPL3nNTRhRks0gFuvIeu-Q');
// MapboxGL.setTelemetryEnabled(false);
Geocoder.init('AIzaSyAnCBabQvD0I74Kqtq6iKedPp_FiidK2dA');

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
        setCoordinates([longitude, latitude]);
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
      <View style={styles.mapContainer}>
        {/* <MapboxGL.MapView
          style={StyleSheet.absoluteFillObject}
          zoomEnabled={true}
          styleURL="mapbox://styles/mapbox/navigation-day-v1"
          rotateEnabled={true}
          logoEnabled={false}>
          <MapboxGL.Camera
            animationMode="flyTo"
            animationDuration={2000}
            zoomLevel={15}
            pitch={60}
            centerCoordinate={coordinates}
          />
          <MapboxGL.UserLocation visible={true} />
          <MapboxGL.PointAnnotation
            id="user-location-marker"
            coordinate={coordinates}
          />
        </MapboxGL.MapView> */}
        <View style={styles.googlePlacesView}>
          <GooglePlacesAutocomplete
            placeholder="Find Your Location"
            fetchDetails={true}
            styles={{
              container: styles.addressContainer,
              textInput: styles.inputText,
            }}
            query={{
              key: '',
              language: 'en',
            }}
            onFail={error => console.log(error)}
            requestUrl={{
              url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json', // Corrected URL
              useOnPlatform: 'web',
            }}
            onPress={(data, details) => {
              console.log(data.description);
              console.log(details.location);
            }}
          />
          <View style={styles.searchIcon}>
            <Feather name={'search'} size={25} color={'#31af54'} />
          </View>
        </View>
        <View style={styles.locationView}>
          <View style={styles.locationInsideView}>
            <View style={styles.locationTextView}>
              <Text style={styles.locationTextStyle}>Your Location</Text>
            </View>
            <View style={styles.locationIconView}>
              <View style={styles.locationTextIconView}>
                <Octicons name={'location'} size={25} color={'green'} />
                <Text style={styles.locationText}>{location}</Text>
              </View>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity style={styles.btnStyle}>
                <Text style={styles.btnText}>Set Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyLocation;