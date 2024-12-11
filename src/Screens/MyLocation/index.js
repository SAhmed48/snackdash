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
import MapboxGL from '@rnmapbox/maps';
import Octicons from 'react-native-vector-icons/Octicons';
import {fontScale, horizontalScale, verticalScale} from '../../Utils/ScaleSize';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import Feather from 'react-native-vector-icons/Feather';
import Config from 'react-native-config';

const MapBoxToken = Config.MAPBOX_TOKEN;
const GoogleMapApi = Config.GOOGLE_MAP_API2

MapboxGL.setAccessToken(MapBoxToken)
MapboxGL.setTelemetryEnabled(false);
Geocoder.init(GoogleMapApi);


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
        <MapboxGL.MapView
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
        </MapboxGL.MapView>
        <View
          style={{
            alignItems: 'center',
            marginTop: verticalScale(40),
            zIndex: 1,
            flex: 1,
          }}>
          <GooglePlacesAutocomplete
            placeholder="Find Your Location"
            fetchDetails={true}
            styles={{
              container: styles.addressContainer,
              textInput: styles.inputText,
            }}
            query={{
              key: GoogleMapApi,
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
          <View
            style={{
              position: 'absolute',
              left: horizontalScale(65),
              top: verticalScale(8),
            }}>
            <Feather name={'search'} size={25} color={'#31af54'} />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-end',
            bottom: verticalScale(40),
          }}>
          <View
            style={{
              width: horizontalScale(360),
              height: verticalScale(180),
              backgroundColor: 'white',
              borderRadius: 15,
              elevation: 10,
            }}>
            <View
              style={{
                marginLeft: horizontalScale(15),
                marginTop: verticalScale(20),
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'grey',
                  fontSize: fontScale(13),
                }}>
                Your Location
              </Text>
            </View>
            <View style={{marginLeft: 20, marginTop: 8}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: horizontalScale(320),
                  gap: horizontalScale(20),
                  flexWrap: 'wrap',
                }}>
                <Octicons name={'location'} size={25} color={'green'} />
                <Text
                  style={{
                    width: 260,
                    fontFamily: 'Poppins-Medium',
                    color: 'black',
                    fontSize: fontScale(13),
                  }}>
                  {location}
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#33b056',
                  width: horizontalScale(270),
                  height: verticalScale(40),
                  borderRadius: 14,
                }}>
                <Text style={{fontFamily: 'Poppins-Medium', color: 'white'}}>
                  Set Location
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    height: verticalScale(65),
    backgroundColor: '#f6f6f6',
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: 'black',
  },
  mapContainer: {
    flex: 1,
  },
  addressContainer: {
    width: horizontalScale(350),
  },
  inputText: {
    paddingVertical: 10,
    paddingHorizontal: horizontalScale(70),
    fontFamily: 'Poppins-Regular',
    fontSize: fontScale(15),
    lineHeight: fontScale(18), // Ensure consistent spacing
    backgroundColor: 'white',
    color: 'black',
    width: horizontalScale(330),
    height: verticalScale(45),
    borderRadius: 30,
    elevation: 10,
    textAlignVertical: 'center', // Center aligns text vertically
    includeFontPadding: false, //
  },
});

export default MyLocation;
