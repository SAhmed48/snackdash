import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  Animated,
  Image,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@rnmapbox/maps';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {horizontalScale} from '../../Utils/ScaleSize';
import {ProgressBar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Images from '../../Constants/Images';
import styles from './styles';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoibXVoYW1tYWRhbGkxOCIsImEiOiJjbTRmbGJ1N2wxNHNvMmtzODl6bG0xNXlxIn0.nPL3nNTRhRks0gFuvIeu-Q',
);
MapboxGL.setTelemetryEnabled(false);
Geocoder.init('AIzaSyAnCBabQvD0I74Kqtq6iKedPp_FiidK2dA');

const Track = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [riderCoordinates, setRiderCoordinates] = useState([0, 0]);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [sheet, setSheet] = useState(false);

  const bottomSheetRef = useRef(null);
  const cameraRef = useRef(null);
  const snapPoints = useMemo(() => ['47%'], []);
  const progress1 = useRef(new Animated.Value(0)).current;
  const progress2 = useRef(new Animated.Value(0)).current;
  const progress3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getAddress();
    if (coordinates[0] !== 0 && riderCoordinates[0] !== 0) {
      calculateDistance(
        coordinates[1],
        coordinates[0],
        riderCoordinates[1],
        riderCoordinates[0],
      );
      getRoute(coordinates, riderCoordinates);
    }
    startAnimation(progress1, () => {
      startAnimation(progress2, () => {
        startAnimation(progress3);
      });
    });
    if (routeCoordinates) {
      fitToRoute(routeCoordinates);
    }
    setSheet(true);
  }, [coordinates, riderCoordinates, routeCoordinates]);

  const startAnimation = (progress, onComplete) => {
    if (isNaN(progress._value)) {
      console.error('Invalid progress value:', progress._value);
      return;
    }
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      if (onComplete) {
        onComplete();
      }
    });
  };

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

  const fitToRoute = routeCoords => {
    const lats = routeCoords.map(coord => coord[1]);
    const lngs = routeCoords.map(coord => coord[0]);

    const north = Math.max(...lats);
    const south = Math.min(...lats);
    const east = Math.max(...lngs);
    const west = Math.min(...lngs);

    cameraRef.current?.setCamera({
      bounds: {
        ne: [east, north],
        sw: [west, south],
      },
      padding: 50, // Optional padding
      animationDuration: 1000,
    });
  };

  const getRoute = useCallback(async (origin, destination) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=sk.eyJ1IjoibXVoYW1tYWRhbGkxOCIsImEiOiJjbTRmbGJ1N2wxNHNvMmtzODl6bG0xNXlxIn0.nPL3nNTRhRks0gFuvIeu-Q`,
      );
      if (response.status !== 200) {
        console.error(
          'Failed to fetch route:',
          response.status,
          response.statusText,
        );
        return;
      }
      const data = response.data; // Axios auto-parses JSON
      if (!data.routes || data.routes.length === 0) {
        console.error('No routes found in response');
        return;
      }
      const coordinates = data.routes[0]?.geometry.coordinates || [];
      if (coordinates.length === 0) {
        console.error('No coordinates in the route');
        return;
      }
      setRouteCoordinates(coordinates); // Simply set the route coordinates to render
    } catch (error) {
      console.error(
        'Error fetching route:',
        error?.response?.data || error.message,
      );
    }
  }, []);

  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
      console.error('Invalid inputs for distance calculation');
      return 0;
    }
    const R = 6371;
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
    const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000;
    return isNaN(distance) ? 0 : distance; // Ensure valid distance
  }, []);

  return (
    <GestureHandlerRootView style={styles.flexContainer}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#f6f6f6'} />
        <View style={StyleSheet.absoluteFillObject}>
          <MapboxGL.MapView
            style={styles.mapContainer}
            styleURL="mapbox://styles/mapbox/navigation-night-v1"
            zoomEnabled
            rotateEnabled
            logoEnabled={false}>
            <MapboxGL.Camera
              ref={cameraRef}
              animationMode="flyTo"
              animationDuration={2000}
              zoomLevel={14}
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
                  type: 'Feature',
                  geometry: {type: 'LineString', coordinates: routeCoordinates},
                }}>
                <MapboxGL.LineLayer
                  id="routeLine"
                  style={{lineColor: 'white', lineWidth: 3}}
                />
              </MapboxGL.ShapeSource>
            )}
          </MapboxGL.MapView>
        </View>
        {sheet && (
          <View style={{flex: 1}}>
            <BottomSheet
              style={styles.bottomSheet}
              backgroundStyle={{
                borderRadius: 30,
              }}
              ref={bottomSheetRef}
              snapPoints={snapPoints}>
              <BottomSheetView style={{flex: 1}}>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.bottomSheetView}>
                    <Text style={styles.onWayText}>On the Way</Text>
                    <View style={styles.timeDeliverView}>
                      <View style={styles.timeDeliverFlex}>
                        <MaterialCommunityIcons
                          name={'clock'}
                          color={'#33b056'}
                          size={22}
                        />
                        <Text style={styles.minTextStyle}>10 min</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <View style={styles.progressView}>
                      <Animated.View style={styles.progressContainer}>
                        <Text style={styles.progressText}>Order Placed</Text>
                        <ProgressBar
                          progress={10}
                          color="#4caf50"
                          style={styles.progressBar}
                        />
                      </Animated.View>
                      <Animated.View style={styles.progressContainer}>
                        <Text style={styles.progressText}>On the Way</Text>
                        <ProgressBar
                          progress={10}
                          color="#4caf50"
                          style={styles.progressBar}
                          indeterminate
                        />
                      </Animated.View>
                      <Animated.View style={styles.progressContainer}>
                        <Text style={styles.progressText}>Delivered</Text>
                        <ProgressBar
                          progress={10}
                          color="#4caf50"
                          style={styles.progressBar}
                          indeterminate={true}
                        />
                      </Animated.View>
                    </View>
                  </View>
                  <View style={styles.riderView}>
                    <View style={styles.riderFlexView}>
                      <Image
                        source={Images.profilePic}
                        style={styles.profilePicStyle}
                      />
                      <View style={{marginLeft: horizontalScale(10)}}>
                        <View style={styles.deliveryViewStyle}>
                          <View>
                            <Text style={styles.deliveryText}>
                              Your Delivery Hero
                            </Text>
                            <Text style={styles.riderNameText}>
                              Muhammad Ali
                            </Text>
                          </View>
                          <View style={styles.contactViewFlex}>
                            <View style={styles.messageIconView}>
                              <MaterialCommunityIcons
                                name={'message-processing'}
                                size={22}
                                color={'green'}
                              />
                            </View>
                            <View style={styles.messageIconView}>
                              <FontAwesome
                                name={'phone'}
                                size={22}
                                color={'green'}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.itemSeparator} />
                  <View style={styles.addressView}>
                    <View style={styles.deliverView}>
                      <Text style={styles.deliverText}>Deliver to</Text>
                      <View style={styles.mapsView}>
                        <Image source={Images.location} />
                        {location && (
                          <Text style={styles.mapsText}>
                            {location.substring(0, 25)}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </BottomSheetView>
            </BottomSheet>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Track;
