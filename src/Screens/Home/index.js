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
} from 'react-native';
import React, {useRef, useState} from 'react';
import Geocoder from 'react-native-geocoding';
import {initializeApp} from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import {setAddToCartData, setData} from '../../Redux/Action';
import {useVoiceNavigation} from 'react-native-voice-command';
import styles from './styles';
import Images from '../../Constants/Images';
import Feather from 'react-native-vector-icons/Feather';
import {ImageData, data} from '../../Data/FoodCategory';

initializeApp({
  apiKey: 'AIzaSyA6JrpMneO5H2iWxO8KQCtCHXvwOWz7mOI',
  projectId: 'sahlah-edb6f',
  messagingSenderId: '1043161679400	',
  appId: '1:1043161679400:android:6dc15daf753902fba0171d',
});

Geocoder.init('AIzaSyAnCBabQvD0I74Kqtq6iKedPp_FiidK2dA');
const Home = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [database, setDataBase] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [firebaseData, setFireBaseData] = React.useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const mapDetails = useSelector(state => state.Reducer.mapDetails);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    getDataBase();
    const interval = 3000;
    const autoPlay = setInterval(() => {
      fadeOutAndIn();
      setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
    }, interval);
    return () => clearInterval(autoPlay);
  }, [visible]);

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
      const docId = visible ? 'b831VbyXKQ9XY1WvTKOA' : 'GNSIDLG6nUvU93WVqOrS';
      const document = await firestore().collection('Food').doc(docId).get();
      const data = document.data();
      const info = document.data();
      setDataBase(data);
      setFireBaseData(info)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDetails = details => {
    dispatch(setData(details));
    console.log(details);
  };

  const getAddToCartDetails = data => {
    dispatch(setAddToCartData(data));
    console.log(data);
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
        <View style={styles.topRatedFoodItems} key={index}>
          <View style={styles.topRatedFoodContainerInside}>
            <Image source={Images.zinger} style={styles.topRatedImageStyle} />
          </View>
          <View style={styles.ratedTextView}>
            <Text style={styles.ratedTextStyle}>{item}</Text>
          </View>
          <View style={styles.priceBtnSelectView}>
            <TouchableOpacity
              style={styles.priceBtnSelectStyle}
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
      <View style={styles.topView}>
        <View style={styles.deliverView}>
          <Text style={styles.deliverText}>Deliver to</Text>
          <View style={styles.mapsView}>
            <Image source={require('../../Assets/Images/location.png')} />
            {mapDetails && (
              <Text style={styles.mapsText}>
                {expanded ? mapDetails : `${mapDetails.substring(0, 20)}`}
              </Text>
            )}
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={styles.toggleText}>{expanded ? '<' : '>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bellIconStyle}>
          <Feather name={'bell'} size={23} color={'grey'} />
        </View>
      </View>
      <View style={styles.inputFilterView}>
        <View style={styles.inputFilterInsideView}>
          <TextInput placeholder="Seach food" style={styles.inputTextStyle} />
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
              <>
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
              </>
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
            {database && (
              <FlatList
                data={database.FastFood}
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
              {database && (
                <FlatList
                  data={firebaseData.Food}
                  renderItem={renderItem}
                  keyExtractor={index => index.toString()}
                  numColumns={3}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
