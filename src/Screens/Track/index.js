import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@rnmapbox/maps';
import {fontScale, horizontalScale, verticalScale} from '../../Utils/ScaleSize';
import 'react-native-get-random-values';
import BottomSheet from '@gorhom/bottom-sheet';
import Config from 'react-native-config';

const MapBoxToken = Config.MAPBOX_TOKEN;
const GoogleMapApi = Config.GOOGLE_MAP_API2;

MapboxGL.setAccessToken(MapBoxToken);
MapboxGL.setTelemetryEnabled(false);
Geocoder.init(GoogleMapApi);

const Track = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState([0, 0]);

  const snapPoints = React.useMemo(() => ['95%'], []);
  const sheetRef = React.useRef(null);

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
      </View>
      <BottomSheet snapPoints={snapPoints} ref={sheetRef} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

export default Track;
