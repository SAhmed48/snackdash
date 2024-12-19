import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { verticalScale, horizontalScale, fontScale } from '../../Utils/ScaleSize';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { emptyCart, setMapData } from '../../Redux/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [currentCartIndex, setCurrentCartIndex] = React.useState(0);

  const cartItems = useSelector(state => state.Reducer.cartItems);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getLocationUser();
  }, []);

  const getLocationUser = async () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          Geocoder.from(latitude, longitude)
            .then(json => {
              const formatted_Address = json.results[0].formatted_address;
              setLocation(formatted_Address);
              dispatch(setMapData(formatted_Address));
              AsyncStorage.setItem('location', formatted_Address);
            })
            .catch(err => {
              console.log('Geocoding error:', err);
            });
        },
        error => {
          console.log('Error getting location:', error.message);
        },
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 5000},
      );
    } catch (error) {
      console.log('Permission error:', error);
    }
  };

  const handleBellPress = React.useCallback(() => {
    if (cartItems.length > 0) {
      setShowModal(true);
    } else {
      ToastAndroid.show('Cart is empty!', ToastAndroid.SHORT);
    }
  }, [cartItems]);

  const closeModal = React.useCallback(() => {
    if (currentCartIndex < cartItems.length - 1) {
      setCurrentCartIndex(prev => prev + 1);
    } else {
      setShowModal(false);
      setCurrentCartIndex(0);
      dispatch(emptyCart());
    }
  }, [currentCartIndex, cartItems, dispatch]);

  return (
    <>
      <View style={styles.topView}>
        <View style={styles.deliverView}>
          <Text style={styles.deliverText}>Deliver to</Text>
          <View style={styles.mapsView}>
            <Image source={require('../../Assets/Images/location.png')} />
            {location && (
              <Text style={styles.mapsText}>
                {expanded ? location : `${location.substring(0, 20)}`}
              </Text>
            )}
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={styles.toggleText}>{expanded ? '<' : '>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.bellIconStyle}
          onPress={handleBellPress}>
          <Feather name={'bell'} size={23} color={'grey'} />
          {cartItems.length > 0 ? (
            <View style={styles.notificationDot} />
          ) : null}
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {cartItems[currentCartIndex]?.name ||
                'You have Viewed all your items'}
            </Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>
                {currentCartIndex < cartItems.length - 1 ? 'Next' : 'Close'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  topView: {
    width: '100%',
    height: verticalScale(85),
    backgroundColor: '#f6f6f6',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  deliverView: {
    marginLeft: verticalScale(30),
  },
  deliverText: {
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(13),
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
    fontSize: fontScale(13),
  },
  toggleText: {
    color: 'black',
    fontSize: verticalScale(14),
    transform: [{rotate: '90deg'}],
  },
  bellIconStyle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: horizontalScale(30),
    width: horizontalScale(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: verticalScale(45),
    backgroundColor: 'white',
  },
  notificationDot: {
    position: 'absolute',
    overflow: 'visible',
    top: 5,
    right: 8,
    backgroundColor: 'green',
    width: 15,
    height: 15,
    borderRadius: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: fontScale(15),
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default React.memo(Header);
