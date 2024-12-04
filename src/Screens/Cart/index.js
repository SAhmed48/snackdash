import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
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
import {horizontalScale, verticalScale} from '../../Utils/ScaleSize';
import {removeItemCart, setItemTotal} from '../../Redux/Action';
import {SET_ADD_TO_CART_DETAILS} from '../../Constants/SetData';

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
    arrayItems();
  }, [setAddToCartDetails]);

  const arrayItems = () => {
    if (setAddToCartDetails && Object.keys(setAddToCartDetails).length > 0) {
      const uniqueItems = new Set();
      uniqueItems.add(setAddToCartDetails);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 60000);
      return () => clearInterval(interval);
    }),
  );

  React.useEffect(() => {
    calculateTotalPrice();
  }, [setAddToCartDetails]);

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
    if (id) {
      setAddToCartDetails.map(item => {
        if (item.id === id) return {...item, timestamp: Date.now()};
      });
    }
    return id ? timeId : null;
  };

  const updateCount = (id, operation) => {
    dispatch({
      type: SET_ADD_TO_CART_DETAILS,
      payload: {
        id,
        countChange: operation === 'increment' ? 1 : 'decrement' ? -1 : null,
      },
    });
  };

  const onDelete = id => {
    dispatch(removeItemCart(id));
    ToastAndroid.show('Item Deleted', ToastAndroid.SHORT);
  };

  const renderItem = ({item, index}) => {
    const timeDisplay = calculateElapsedTime(item.timestamp, item.id);
    return (
      <View
        style={{alignItems: 'center', marginTop: verticalScale(20)}}
        key={index}>
        <Swipeable
          renderRightActions={() => rightSwipeActions(item.id)}
          overshootRight={false}
          overshootLeft={false}
          friction={2}
          rightThreshold={40}>
          <View style={styles.itemContainer}>
            <View
              style={{
                zIndex: 5,
                alignSelf: 'flex-end',
                marginRight: horizontalScale(20),
                gap: horizontalScale(5),
                top: verticalScale(20),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcons name={'access-time'} size={16} color={'green'} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: verticalScale(12),
                }}>
                {timeDisplay}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  overflow: 'visible',
                  width: horizontalScale(320),
                  zIndex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../Assets/Images/miniZing.png')}
                  style={{
                    width: horizontalScale(80),
                    height: verticalScale(80),
                  }}
                />
                <View style={{marginLeft: horizontalScale(15)}}>
                  <Text style={{fontFamily: 'Poppins-Medium', fontSize: 15}}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      fontSize: verticalScale(14),
                      color: 'grey',
                    }}>
                    Burger King
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: verticalScale(15),
                      color: '#029a26',
                    }}>
                    {item.price * item.count}{' '}
                    {<Text style={{fontSize: verticalScale(12)}}>PKR</Text>}
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: 'flex-end',
                    marginLeft: horizontalScale(50),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#f8f8f8',
                      alignItems: 'center',
                      width: horizontalScale(90),
                      borderRadius: 40,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => updateCount(item.id, 'decrement')}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: horizontalScale(30),
                        height: verticalScale(30),
                        backgroundColor: '#e6f5ed',
                        borderRadius: 30,
                      }}>
                      <Text
                        style={{
                          fontSize: verticalScale(20),
                          fontFamily: 'Poppins-Medium',
                          color: '#2dae51',
                        }}>
                        -
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        fontSize: verticalScale(15),
                      }}>
                      {item.count}
                    </Text>
                    <TouchableOpacity
                      onPress={() => updateCount(item.id, 'increment')}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: horizontalScale(30),
                        height: verticalScale(30),
                        backgroundColor: '#33b056',
                        borderRadius: 30,
                      }}>
                      <Text
                        style={{
                          fontSize: verticalScale(20),
                          fontFamily: 'Poppins-Medium',
                          color: 'white',
                        }}>
                        +
                      </Text>
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
      <View
        style={{
          backgroundColor: '#feb32e',
          height: verticalScale(120),
          width: horizontalScale(60),
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          borderTopRightRadius: 20,
          borderBottomEndRadius: 20,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}>
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
              keyExtractor={(item, index) => `${item.id}-${index}`}
            />
            <View
              style={{
                justifyContent: 'flex-end',
                flex: 1,
                alignItems: 'center',
                bottom: verticalScale(90),
              }}>
              <View
                style={{
                  width: horizontalScale(360),
                  height: verticalScale(140),
                  backgroundColor: '#f7f7f7',
                  borderRadius: 15,
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: 'grey',
                  borderStyle: 'dashed',
                }}>
                <View
                  style={{
                    width: horizontalScale(320),
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginTop: verticalScale(10),
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: verticalScale(15),
                      color: 'grey',
                    }}>
                    Item Total
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: verticalScale(15),
                    }}>
                    {item} PKR
                  </Text>
                </View>
                <View
                  style={{
                    width: horizontalScale(320),
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginTop: verticalScale(10),
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: verticalScale(15),
                      color: 'grey',
                    }}>
                    Delivery fees
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: verticalScale(15),
                    }}>
                    {deliveryFees} PKR
                  </Text>
                </View>
                <View style={{marginTop: verticalScale(10)}}>
                  <View
                    style={{
                      width: horizontalScale(325),
                      height: 2,
                      backgroundColor: '#dbdbdc',
                    }}
                  />
                </View>
                <View>
                  <View
                    style={{
                      width: horizontalScale(320),
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      marginTop: verticalScale(10),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: verticalScale(18),
                      }}>
                      Total
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: verticalScale(18),
                        color: '#029a26',
                      }}>
                      {totalPrice}{' '}
                      {<Text style={{fontSize: verticalScale(15)}}>PKR</Text>}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center', bottom: verticalScale(50)}}>
              <TouchableOpacity
                onPress={getItemTotal}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: horizontalScale(300),
                  height: verticalScale(50),
                  backgroundColor: '#029a26',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: 'white',
                    fontSize: verticalScale(17),
                  }}>
                  Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Image source={require('../../Assets/Images/cartEmpty.png')} />
            <View style={{marginTop: 50}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 25,
                }}>
                Cart Empty
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                }}>
                You don't have any foods in cart at this time
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfffe',
  },
  itemContainer: {
    marginVertical: verticalScale(5),
    backgroundColor: 'white',
    borderColor: 'grey',
    width: horizontalScale(350),
    height: verticalScale(120),
    borderRadius: 20,
    borderColor: 'whitesmoke',
    shadowColor: 'black',
    borderWidth: 1,
  },
});

export default Cart;
