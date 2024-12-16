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
import Config from 'react-native-config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {horizontalScale, fontScale, verticalScale} from '../../Utils/ScaleSize';
import {ProgressBar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
        `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${MapBoxToken}`,
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
                  <View
                    style={{
                      width: horizontalScale(380),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        fontSize: fontScale(20),
                        fontFamily: 'Poppins-Bold',
                      }}>
                      On the Way
                    </Text>
                    <View
                      style={{
                        width: horizontalScale(100),
                        height: verticalScale(40),
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: '#faf4fa',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: horizontalScale(75),
                          justifyContent: 'space-between',
                        }}>
                        <MaterialCommunityIcons
                          name={'clock'}
                          color={'#33b056'}
                          size={22}
                        />
                        <Text
                          style={{
                            fontFamily: 'Poppins-Regular',
                            fontSize: fontScale(13.5),
                            top: verticalScale(2),
                          }}>
                          10 min
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: horizontalScale(390),
                        justifyContent: 'space-around',
                      }}>
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
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: verticalScale(40),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: horizontalScale(370),
                      }}>
                      <Image
                        source={require('../../Assets/Images/profilepic.png')}
                        style={{
                          width: horizontalScale(60),
                          height: verticalScale(60),
                        }}
                      />
                      <View style={{marginLeft: horizontalScale(10)}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: horizontalScale(290),
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text
                              style={{
                                fontFamily: 'Poppins-Regular',
                                fontSize: fontScale(13),
                                color: 'grey',
                              }}>
                              Your Delivery Hero
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: fontScale(17),
                              }}>
                              Muhammad Ali
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: horizontalScale(15),
                            }}>
                            <View
                              style={{
                                backgroundColor: '#f4f4f6',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: horizontalScale(45),
                                borderRadius: 30,
                                height: verticalScale(45),
                              }}>
                              <MaterialCommunityIcons
                                name={'message-processing'}
                                size={22}
                                color={'green'}
                              />
                            </View>
                            <View
                              style={{
                                backgroundColor: '#f4f4f6',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: horizontalScale(45),
                                borderRadius: 30,
                                height: verticalScale(45),
                              }}>
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
                  <View
                    style={{
                      width: horizontalScale(340),
                      alignItems: 'center',
                      borderWidth: 0.9,
                      borderColor: '#fbf6fb',
                      marginTop: verticalScale(15),
                    }}
                  />
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: verticalScale(20),
                    }}>
                    <View style={styles.deliverView}>
                      <Text style={styles.deliverText}>Deliver to</Text>
                      <View style={styles.mapsView}>
                        <Image
                          source={require('../../Assets/Images/location.png')}
                        />
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
  bottomSheetStyle: {
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  progressContainer: {
    marginTop: verticalScale(20),
    width: horizontalScale(110),
  },
  progressBar: {
    height: verticalScale(5),
    borderRadius: 5,
    marginTop: verticalScale(8),
  },
  progressText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: fontScale(15),
    color: 'green',
  },
  deliverView: {
    width: horizontalScale(350),
  },
  deliverText: {
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(14),
    color: '#a7a7a6',
  },
  mapsView: {
    flexDirection: 'row',
    width: horizontalScale(300),
    alignItems: 'center',
    gap: horizontalScale(10),
  },
  mapsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: fontScale(14),
  },
});

export default Track;
