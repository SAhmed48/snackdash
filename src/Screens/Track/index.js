import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Text} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@rnmapbox/maps';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Config from 'react-native-config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const MapBoxToken = Config.MAPBOX_TOKEN;
const GoogleMapApi = Config.GOOGLE_MAP_API2;

MapboxGL.setAccessToken(MapBoxToken);
MapboxGL.setTelemetryEnabled(false);
Geocoder.init(GoogleMapApi);

const Track = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [riderCoordinates, setRiderCoordinates] = useState([0, 0]);
  const [routeCoordinates, setRouteCoordinates] = useState(null);

  const bottomSheetRef = useRef(null);
  const cameraRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

  useEffect(() => {
    getAddress();
    if (coordinates[0] !== 0 && riderCoordinates[0] !== 0) {
      calculateDistance(
        coordinates[1],
        coordinates[0],
        riderCoordinates[1],
        riderCoordinates[0],
      );
      getRoute(coordinates, riderCoordinates); // Show the direction
    }
  }, [coordinates, riderCoordinates]);

  const getAddress = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoordinates([longitude, latitude]);

        const distanceInKm = 3.2;
        const earthRadius = 6371; // Earth's radius in kilometers
        const bearing = Math.PI / 4; // 45 degrees in radians (northeast direction)

        const newLat =
          latitude +
          (distanceInKm / earthRadius) * (180 / Math.PI) * Math.cos(bearing);
        const newLng =
          longitude +
          ((distanceInKm / earthRadius) * (180 / Math.PI) * Math.sin(bearing)) /
            Math.cos(latitude * (Math.PI / 180));

        setRiderCoordinates([newLng, newLat]);

        Geocoder.from(latitude, longitude)
          .then(json => {
            const formattedAddress =
              json.results[0]?.formatted_address || 'Unknown Address';
            setLocation(formattedAddress);
          })
          .catch(error => console.error('Geocoding Error:', error));
      },
      error => console.error('Geolocation Error:', error),
      {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 10000,
      },
    );
  }, []);

  const getRoute = useCallback(async (origin, destination) => {
    // try {
    //   const response = await axios.get(
    //     `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${MapBoxToken}`,
    //   );
    //   // Check for a successful response status
    //   if (response.status !== 200) {
    //     console.error(
    //       'Failed to fetch route:',
    //       response.status,
    //       response.statusText,
    //     );
    //     return;
    //   }
    //   const data = response.data; // Axios auto-parses JSON
    //   console.log('Route data:', data);

    //   if (!data.routes || data.routes.length === 0) {
    //     console.error('No routes found in response');
    //     return;
    //   }
    //   const coordinates = data.routes[0]?.geometry.coordinates || [];
    //   if (coordinates.length === 0) {
    //     console.error('No coordinates in the route');
    //     return;
    //   }
    //   setRouteCoordinates(coordinates); // Simply set the route coordinates to render
    // } catch (error) {
    //   console.error(
    //     'Error fetching route:',
    //     error?.response?.data || error.message,
    //   );
    // }
  }, []);

  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000; // Distance in meters
  }, []);

  return (
    <GestureHandlerRootView style={styles.flexContainer}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#f6f6f6'} />
        <View style={StyleSheet.absoluteFillObject}>
          <MapboxGL.MapView
            style={styles.mapContainer}
            styleURL="mapbox://styles/mapbox/navigation-day-v1"
            zoomEnabled
            rotateEnabled
            logoEnabled={false}>
            <MapboxGL.Camera
              ref={cameraRef}
              animationMode="flyTo"
              animationDuration={2000}
              zoomLevel={15}
              pitch={60}
              centerCoordinate={coordinates}
            />
            <MapboxGL.UserLocation visible />
            <MapboxGL.PointAnnotation
              id="user-location"
              coordinate={coordinates}
            />
            <MapboxGL.PointAnnotation
              id="rider-location"
              coordinate={riderCoordinates}
            />
            {routeCoordinates && (
              <MapboxGL.ShapeSource
                id="routeSource"
                shape={{
                  type: 'LineString',
                  geometry: {type: 'LineString', coordinates: routeCoordinates},
                }}>
                <MapboxGL.LineLayer
                  id="routeLine"
                  style={styles.routeLineStyle}
                />
              </MapboxGL.ShapeSource>
            )}
          </MapboxGL.MapView>
        </View>
        <View style={styles.flexContainer}>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            backgroundStyle={styles.bottomSheetStyle}>
            <BottomSheetView style={styles.flexContainer}>
              <View style={styles.sheetContent}>
                <Text style={styles.headerText}>On the Way</Text>
                <View style={styles.timerContainer}>
                  <MaterialCommunityIcons
                    name="clock"
                    color="#33b056"
                    size={22}
                  />
                  <Text style={styles.timerText}>10 min</Text>
                </View>
              </View>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexContainer: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  // bottomSheetStyle: {
  //   borderRadius: 30,
  //   shadowColor: 'black',
  //   shadowOffset: {width: 0, height: 2},
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 10,
  // },
  // // sheetContent: {
  // //   alignItems: 'center',
  // // },
  // // headerText: {
  // //   fontSize: fontScale(20),
  // //   fontFamily: 'Poppins-Bold',
  // // },
  // // timerContainer: {
  // //   flexDirection: 'row',
  // //   alignItems: 'center',
  // //   justifyContent: 'space-between',
  // //   width: horizontalScale(100),
  // //   height: verticalScale(40),
  // //   borderRadius: 30,
  // //   borderWidth: 1,
  // //   borderColor: '#faf4fa',
  // //   paddingHorizontal: horizontalScale(10),
  // // },
  // // timerText: {
  // //   fontFamily: 'Poppins-Regular',
  // //   fontSize: fontScale(13.5),
  // // },
  // // routeLineStyle: {
  // //   lineWidth: 4,
  // //   lineColor: '#1db7dd',
  // // },
});

export default Track;
