import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../Screens/Home';
import Favorits from '../../Screens/Favourites';
import Track from '../../Screens/Track';
import UserProfile from '../../Screens/Profile';
import Entypo from 'react-native-vector-icons/Entypo';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Special from '../../Screens/SpecialOffers';
import {useNavigation} from '@react-navigation/native';
import AddCart from '../../Screens/AddCart';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CheckOut from '../../Screens/CheckOut';
import Card from '../../Screens/AddCard';
import Settings from '../../Screens/Settings';
import Language from '../../Screens/Language';
import MyLocation from '../../Screens/MyLocation';
import {verticalScale} from '../../Utils/ScaleSize';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const setAddToCartDetails = useSelector(
    state => state.Reducer.setAddToCartDetails,
  );
  const getHeader = routeName => {
    if (['Home', 'Profile', 'Cart', 'Track'].includes(routeName)) {
      return () => <Header />;
    }
    return undefined;
  };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: 'white',
        headerShown: true,
        header: getHeader(route.name), // Pass the result of the function
        tabBarStyle: {
          height: verticalScale(70),
          display:
            route.name === 'Track'
              ? 'flex'
              : route.name === 'Check'
              ? 'flex'
              : null,
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? 'black' : 'grey',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 12,
              bottom: 6,
            }}>
            {route.name}
          </Text>
        ),
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelPosition: 'below-icon',
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Entypo
                name="home"
                size={27}
                color={focused ? '#33b056' : 'grey'}
              />
            </View>
          ),
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorits}
        options={{
          headerTransparent: true,
          headerShown: true,
          tabBarIcon: ({focused}) => (
            <Octicons
              name="heart-fill"
              size={25}
              color={focused ? '#33b056' : 'grey'}
            />
          ),
          headerLeft: () => (
            <View style={{marginLeft: 25}}>
              <Pressable
                onPress={() => navigation.navigate('Home')}
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                  borderColor: 'grey',
                }}>
                <Image
                  source={require('../../Assets/Images/right-arrow.png')}
                  style={{
                    width: 15,
                    height: 15,
                    transform: [{rotate: '180deg'}],
                  }}
                />
              </Pressable>
            </View>
          ),
          headerTitle: 'My Favourites',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={AddCart}
        options={{
          headerShown: true,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                width: 70,
                height: 70,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                bottom: 15,
                borderRadius: 50,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#33b056',
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {setAddToCartDetails.length > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: verticalScale(40),
                      overflow: 'visible',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 25,
                      borderRadius: 30,
                      backgroundColor: 'red',
                      height: 25,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        textAlign: 'center',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {setAddToCartDetails.length}
                    </Text>
                  </View>
                )}
                <FontAwesome
                  name={'shopping-basket'}
                  size={23}
                  color={'white'}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Track"
        component={Track}
        options={{
          // headerRight: () => (
          //   <View
          //     style={{
          //       marginRight: 40,
          //       alignItems: 'center',
          //       justifyContent: 'center',
          //       borderRadius: 30,
          //       height: 40,
          //       width: 40,
          //       backgroundColor: 'white',
          //     }}>
          //     <Feather name={'bell'} size={23} color={'grey'} />
          //   </View>
          // ),
          // headerLeft: () => (
          //   <View style={{marginLeft: 25}}>
          //     <Pressable
          //       onPress={() => navigation.navigate('Home')}
          //       style={styles.arrowBtnStyle}>
          //       <Image
          //         source={require('../../Assets/Images/right-arrow.png')}
          //         style={styles.arrowImageStyle}
          //       />
          //     </Pressable>
          //   </View>
          // ),
          // headerTitle: 'My Location',
          // headerTitleStyle: {
          //   fontFamily: 'Poppins-Medium',
          // },
          // headerTransparent: true,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="track-changes"
              size={25}
              color={focused ? 'green' : 'grey'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerShown: true,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="account"
              size={25}
              color={focused ? 'green' : 'grey'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Offer"
        component={Special}
        options={{
          headerShown: true,
          headerTransparent: true,
          tabBarButton: () => null,
          headerTitle: 'Special Offers',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Pressable
                onPress={() => navigation.navigate('Home')}
                style={styles.arrowBtnStyle}>
                <Image
                  source={require('../../Assets/Images/right-arrow.png')}
                  style={styles.arrowImageStyle}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Check"
        component={CheckOut}
        options={({route}) => ({
          headerTransparent: true,
          headerTitle: 'CheckOut',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
          },
          tabBarButton: () => {
            return null;
          },
          headerLeft: () => (
            <View style={{marginLeft: 5, marginHorizontal: 0}}>
              <Pressable
                onPress={() => navigation.navigate('Cart')}
                style={styles.arrowBtnStyle}>
                <Image
                  source={require('../../Assets/Images/right-arrow.png')}
                  style={styles.arrowImageStyle}
                />
              </Pressable>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Card"
        component={Card}
        options={{
          headerTransparent: true,
          headerTitle: 'Add Card',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
          },
          tabBarButton: () => {
            return null;
          },
          headerLeft: () => (
            <View style={{marginLeft: 5, marginHorizontal: 0}}>
              <Pressable
                onPress={() => navigation.navigate('Check')}
                style={styles.arrowBtnStyle}>
                <Image
                  source={require('../../Assets/Images/right-arrow.png')}
                  style={styles.arrowImageStyle}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarButton: () => null,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
          },
          headerLeft: () => (
            <View style={{marginLeft: 5, marginHorizontal: 0}}>
              <Pressable
                onPress={() => navigation.navigate('Profile')}
                style={styles.arrowBtnStyle}>
                <Image
                  source={require('../../Assets/Images/right-arrow.png')}
                  style={styles.arrowImageStyle}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="language"
        component={Language}
        options={{
          headerTitle: 'Language',
          tabBarButton: () => null,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
          },
          headerLeft: () => (
            <View style={{marginLeft: 5, marginHorizontal: 0}}>
              <Pressable
                onPress={() => navigation.navigate('Profile')}
                style={styles.arrowBtnStyle}>
                <Image
                  source={require('../../Assets/Images/right-arrow.png')}
                  style={styles.arrowImageStyle}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Coordinates"
        component={MyLocation}
        options={{
          headerTitle: 'My Location',
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
          },
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
          },
          headerLeft: () => (
            <View style={{marginLeft: 5, marginHorizontal: 0}}>
              <Pressable
                onPress={() => navigation.navigate('Profile')}
                style={styles.arrowBtnStyle}>
                <Image
                  source={require('../../Assets/Images/right-arrow.png')}
                  style={styles.arrowImageStyle}
                />
              </Pressable>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  arrowBtnStyle: {
    width: 28,
    height: 28,
    marginHorizontal: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: 'grey',
  },
  arrowImageStyle: {
    width: 15,
    height: 15,
    transform: [{rotate: '180deg'}],
  },
});

export default TabNavigator;
