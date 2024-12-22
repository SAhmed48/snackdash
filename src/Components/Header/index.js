import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ToastAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {emptyCart, setMapData} from '../../Redux/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

Geocoder.init('AIzaSyAnCBabQvD0I74Kqtq6iKedPp_FiidK2dA');

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

export default React.memo(Header);