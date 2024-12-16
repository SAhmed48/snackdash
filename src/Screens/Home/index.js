import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  FlatList,
  Pressable,
  ToastAndroid,
  DeviceEventEmitter,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Geocoder from 'react-native-geocoding';
import {initializeApp} from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch} from 'react-redux';
import {setAddToCartData, setData} from '../../Redux/Action';
import styles from './styles';
import Images from '../../Constants/Images';
import Feather from 'react-native-vector-icons/Feather';
import {ImageData, data} from '../../Data/FoodCategory';
import database from '@react-native-firebase/database';

initializeApp({
  apiKey: 'AIzaSyA6JrpMneO5H2iWxO8KQCtCHXvwOWz7mOI',
  projectId: 'sahlah-edb6f',
  messagingSenderId: '1043161679400',
  appId: '1:1043161679400:android:6dc15daf753902fba0171d',
});

Geocoder.init('AIzaSyAnCBabQvD0I74Kqtq6iKedPp_FiidK2dA');

const Home = () => {
  const [information, setInformation] = useState(null);
  const [visible, setVisible] = useState(false);
  const [firebaseData, setFireBaseData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    getDataBase();
    const interval = 20000;
    const autoPlay = setInterval(() => {
      fadeOutAndIn();
      setCurrentIndex(prevState => (prevState + 1) % data.length);
    }, interval);
    return () => {
      clearInterval(autoPlay);
    };
  }, [visible, firebaseData, currentIndex]);

  const fadeOutAndIn = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getDataBase = async () => {
    try {
      const snapshot = await database().ref('/').once('value');
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataArray = Object.entries(data).map(([key, value]) => ({
          id: key.trim(),
          name: value,
        }));
        setFireBaseData(dataArray);
        const docId = 'b831VbyXKQ9XY1WvTKOA';
        const document = await firestore().collection('Food').doc(docId).get();
        if (document.exists) {
          setInformation(document.data());
        } else {
          console.warn(`Document with ID ${docId} does not exist.`);
          setInformation(null);
        }
      }
    } catch (error) {
      console.error('Error fetching database:', error);
      setInformation(null);
      setFireBaseData(null);
    }
  };

  const getDetails = details => {
    dispatch(setData(details));
  };

  const getAddToCartDetails = async data => {
    const cartItem = {
      id: data.id,
      name: data.name,
      price: 20,
      count: 1,
      timeStamp: Date.now(),
    };
    console.log(cartItem);
    dispatch(setAddToCartData(cartItem));
    const foodData = {name: data, price: 20};
    await firestore()
      .collection('SelectedFood')
      .doc('vhrtZyT6VdlotscaYY4y')
      .set(
        {
          items: firestore.FieldValue.arrayUnion(foodData),
        },
        {merge: true},
      );

    ToastAndroid.show('Item Added to Cart', ToastAndroid.SHORT);
    DeviceEventEmitter.emit('cart', index);
  };

  const renderData = ({item, index}) => {
    return (
      <View style={styles.foodItemsView}>
        <View style={styles.foodItemsStyle} key={index}>
          <Pressable
            onPress={() => getDetails(item)}
            style={styles.heartIconStyle}>
            <EvilIcons name="heart" size={24} color={'green'} />
          </Pressable>
          <Image source={Images.zinger} style={styles.imageBurgerStyle} />
          <Text style={styles.foodNameItemsText}>{item}</Text>
          <Text style={styles.foodBurgerText}>Burger King</Text>
          <View style={styles.priceIncrementView}>
            <View style={styles.priceIncrementDirection}>
              <Text style={styles.priceText}>{Number(32)} PKR</Text>
              <TouchableOpacity style={styles.plusBtnStyle}>
                <Text style={styles.plusBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.topRatedFoodView}>
        <View style={styles.topRatedFoodItems} keys={index}>
          <View style={styles.topRatedFoodContainerInside}>
            <Image source={Images.zinger} style={styles.topRatedImageStyle} />
          </View>
          <View style={styles.ratedTextView}>
            <Text style={styles.ratedTextStyle}>{item.name}</Text>
          </View>
          <View style={styles.priceBtnSelectView}>
            <TouchableOpacity
              style={[styles.priceBtnSelectStyle]}
              onPress={() => getAddToCartDetails(item)}>
              <Text style={styles.priceBtnSelectText}>20 PKR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f6f6f6'} barStyle={'dark-content'} />
      <View style={styles.inputFilterView}>
        <View style={styles.inputFilterInsideView}>
          <TextInput placeholder="Search food" style={styles.inputTextStyle} />
          <View style={{position: 'absolute', top: '20%', left: 20}}>
            <Feather name={'search'} size={25} color={'#31af54'} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Filter')}
            style={styles.filterBtnStyle}>
            <Image
              source={require('../../Assets/Images/control.png')}
              style={styles.filterImageStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.foodCateogoryView}>
        <View style={styles.foodCategoryDirectionView}>
          {ImageData.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.foodCateogoryView}
                onPress={() => {
                  item.id ? setVisible(true) : null;
                  console.log(item.id);
                }}>
                <Image
                  source={item.image}
                  style={styles.foodCategoryImageStyle}
                />
                <Text style={styles.foodCategoryText}>{item.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.lineBreakView} />
      </View>
      {visible ? (
        <View>
          <View style={styles.foodItemsView}>
            <View style={styles.specialOfferStyle}>
              <View
                style={{alignSelf: 'center', position: 'absolute', left: 10}}>
                <Pressable
                  onPress={() => setVisible(false)}
                  style={styles.backBtnStyle}>
                  <Image
                    source={require('../../Assets/Images/right-arrow.png')}
                    style={styles.backImageStyle}
                  />
                </Pressable>
              </View>
              <View>
                <Text style={styles.foodCategoryContent}>Fast Food</Text>
              </View>
            </View>
          </View>
          <View style={styles.foodItemsView}>
            {information && (
              <FlatList
                data={information.FastFood}
                renderItem={renderData}
                numColumns={2}
                keyExtractor={index => index.toString()}
              />
            )}
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.specialOfferView}>
            <View style={styles.specialOfferContainer}>
              <Text style={styles.specialOfferText}>Special Offers</Text>
              <Text style={styles.seeAllText}>See All</Text>
            </View>
          </View>
          <Pressable onPress={() => navigation.navigate('Offer')}>
            <View style={styles.specialDealView}>
              <View style={styles.animatedViewImage}>
                <Animated.Image
                  source={
                    data[currentIndex].img
                      ? data[currentIndex].img
                      : {uri: data[currentIndex].img}
                  }
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    opacity: fadeAnim,
                  }}
                />
              </View>
            </View>
          </Pressable>
          <View style={styles.indicatorView}>
            {data.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicatorStyleView,
                  {opacity: index === currentIndex ? 1 : 0.5},
                ]}
              />
            ))}
          </View>
          <View style={styles.topRatedView}>
            <View style={styles.topRatedDirection}>
              <Text style={styles.topRatedText}>Top Rated</Text>
              <Text style={styles.seeAllText}>See All</Text>
            </View>
          </View>
          <View>
            <View style={styles.foodItemsView}>
              {firebaseData ? (
                <FlatList
                  data={firebaseData}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  numColumns={3}
                />
              ) : (
                <View style={{marginTop: 60}}>
                  <ActivityIndicator color={'green'} size={40} />
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
export default Home;