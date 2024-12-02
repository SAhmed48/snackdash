import {
    View,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    TextInput,
    Text,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
  import Geocoder from 'react-native-geocoding';
  import Geolocation from '@react-native-community/geolocation';
  import Octicons from 'react-native-vector-icons/Octicons';
  
  const MyLocation = () => {
    const [location, setLocation] = React.useState('');
    const [initialRegion, setInitialRegion] = React.useState(null);
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
  
    React.useEffect(() => {
      getAddress();
    }, []);
  
    const getDelta = (lat, lon, distance)  =>{
      const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  
      const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
      const longitudeDelta =
        distance /
        (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));
  
      setLatitude(lat);
      setLongitude(lon);
      console.log(
        '\nlatitude:\t',
        latitude,
        '\nlongitude\t',
        longitude,
        '\nlatitudeDelta\t',
        latitudeDelta,
        '\nlongitudeDelta\t',
        longitudeDelta,
      );
      var result = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      };
      setInitialRegion(result);
    }
  
    const getAddress = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          Geocoder.from(latitude, longitude)
            .then(json => {
              const formatted_Address = json.results[0].formatted_address;
              setLocation(formatted_Address);
            })
            .catch(error => console.log(error));
          getDelta(
            position.coords.latitude,
            position.coords.longitude,
            position.coords.accuracy,
          );
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
          <MapView
            initialRegion={initialRegion}
            onRegionChange={region => setInitialRegion(region)}
            maxZoomLevel={20}
            scrollEnabled={true}
            showsCompass={true}
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFillObject}
            showsUserLocation={true}
            zoomEnabled={true}
          />
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TextInput
              placeholder="Find Your Location"
              style={styles.inputText}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'flex-end',
              bottom: 30,
            }}>
            <View
              style={{
                width: 350,
                height: 165,
                backgroundColor: 'white',
                borderRadius: 15,
                elevation: 10,
              }}>
              <View style={{marginLeft: 15, marginTop: 20}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'grey',
                    fontSize: 13,
                  }}>
                  Your Location
                </Text>
              </View>
              <View style={{marginLeft: 20, marginTop: 8}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 300,
                    gap: 20,
                    flexWrap: 'wrap',
                  }}>
                  <Octicons name={'location'} size={25} color={'green'} />
                  <Text
                    style={{
                      width: 250,
                      fontFamily: 'Poppins-Medium',
                      color: 'black',
                      fontSize: 12,
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
                    width: 270,
                    height: 38,
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
      height: 65,
      backgroundColor: '#f6f6f6',
      alignItems: 'flex-start',
      justifyContent: 'center',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    inputText: {
      padding: 5,
      paddingHorizontal: 70,
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      backgroundColor: 'white',
      color: 'black',
      width: 320,
      height: 40,
      borderRadius: 30,
      elevation: 10,
      textAlignVertical: 'center',
    },
  });
  
  export default MyLocation;