import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {verticalScale} from '../../Utils/ScaleSize';
import {
  removeItemCart,
  setItemTotal,
  incrementCount,
  decrementCount,
} from '../../Redux/Action';
import styles from './styles';
import Images from '../../Constants/Images';

const Cart = () => {
  const [currentTime, setCurrentTime] = React.useState(Date.now());
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [deliveryFees, setDeliveryFees] = React.useState(0);
  const [item, setItem] = React.useState(0);
  const setAddToCartDetails = useSelector(
    state => state.Reducer.setAddToCartDetails,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    calculateTotalPrice();
  }, [setAddToCartDetails]);

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 60000);
      return () => clearInterval(interval);
    }, []),
  );

  const calculateTotalPrice = () => {
    const total = setAddToCartDetails.reduce(
      (sum, item) => sum + item.count * item.price,
      0,
    );
    setItem(total);
    setDeliveryFees(total > 0 ? 30 : 0);
    setTotalPrice(total + (total > 0 ? 30 : 0));
  };

  const getItemTotal = () => {
    const data = {
      itemTotal: item,
      deliveryCharges: deliveryFees,
      total: totalPrice,
    };
    dispatch(setItemTotal(data));
    console.log(data);
    navigation.navigate('Check');
  };

  const calculateElapsedTime = (timestamp, id) => {
    const timeElapsed = Math.floor((currentTime - timestamp) / 60000);
    const timeId =
      timeElapsed < 60
        ? `${timeElapsed} min`
        : `${Math.floor(timeElapsed / 60)} hr`;
    return timeId;
  };

  const updateCountHandler = (id, operation) => {
    if (operation === 'increment') {
      dispatch(incrementCount(id));
    } else if (operation === 'decrement') {
      dispatch(decrementCount(id));
    }
  };

  const onDelete = id => {
    dispatch(removeItemCart(id));
    ToastAndroid.show('Item Deleted', ToastAndroid.SHORT);
  };

  const renderItem = ({item}) => {
    const timeDisplay = calculateElapsedTime(item.timeStamp, item.id);
    return (
      <View
        style={{alignItems: 'center', marginTop: verticalScale(20)}}
        key={item.id}>
        <Swipeable
          renderRightActions={() => rightSwipeActions(item.id)}
          overshootRight={false}
          overshootLeft={false}
          friction={2}
          rightThreshold={40}>
          <View style={styles.itemContainer}>
            <View style={styles.itemContainerInside}>
              <MaterialIcons name={'access-time'} size={16} color={'green'} />
              <Text style={styles.itemContainerTimeText}>{timeDisplay}</Text>
            </View>
            <View style={styles.itemImageView}>
              <View style={styles.itemFoods}>
                <Image
                  source={require('../../Assets/Images/miniZing.png')}
                  style={styles.itemImageStyle}
                />
                <View style={styles.foodNamePos}>
                  <Text style={styles.foodNameStyle}>{item.name}</Text>
                  <Text style={styles.foodBurger}>Burger King</Text>
                  <Text style={styles.foodPriceStyle}>
                    {item.price * item.count}{' '}
                    <Text style={styles.foodPKR}>PKR</Text>
                  </Text>
                </View>
                <View style={styles.incrementView}>
                  <View style={styles.incrementViewStyle}>
                    <TouchableOpacity
                      onPress={() => updateCountHandler(item.id, 'decrement')}
                      style={styles.incrementBtnStyle}>
                      <Text style={styles.incrementTextStyle}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.countTextStyle}>{item.count}</Text>
                    <TouchableOpacity
                      onPress={() => updateCountHandler(item.id, 'increment')}
                      style={styles.incrementBtnStyle2}>
                      <Text style={styles.incrementTextStyle2}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
    );
  };

  const rightSwipeActions = id => {
    return (
      <View style={styles.rightSwipeActionsView}>
        <Pressable onPress={() => onDelete(id)}>
          <AntDesign name="delete" size={30} color={'#feffff'} />
        </Pressable>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        {setAddToCartDetails.length > 0 ? (
          <>
            <FlatList
              data={setAddToCartDetails}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <View style={styles.receipetStyle}>
              <View style={styles.receiptBorderStyle}>
                <View style={styles.itemsTotal}>
                  <Text style={styles.itemsTotalText}>Item Total</Text>
                  <Text style={styles.itemsNumberTotal}>{item} PKR</Text>
                </View>
                <View style={styles.itemsTotal}>
                  <Text style={styles.itemsTotalText}>Delivery fees</Text>
                  <Text style={styles.itemsNumberTotal}>
                    {deliveryFees} PKR
                  </Text>
                </View>
                <View style={styles.itemSeprator}>
                  <View style={styles.itemSepratorStyle} />
                </View>
                <View>
                  <View style={styles.itemsTotal}>
                    <Text style={styles.TotalText}>Total</Text>
                    <Text style={styles.totalPriceStyle}>
                      {totalPrice}{' '}
                      <Text style={{fontSize: verticalScale(15)}}>PKR</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.checkoutBtnView}>
              <TouchableOpacity
                onPress={getItemTotal}
                style={styles.checkoutBtnStyle}>
                <Text style={styles.checkoutTextStyle}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyCartView}>
            <Image source={Images.emptyCart} />
            <View style={styles.emptyCart}>
              <Text style={styles.cartEmptyText}>Cart Empty</Text>
              <Text style={styles.dontFoods}>
                You don't have any foods in cart at this time
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Cart;