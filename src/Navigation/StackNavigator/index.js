import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../../Screens/Splash';
import OnBoarding from '../../Screens/OnBoarding';
import MapAllow from '../../Screens/MapAllow';
import SignIn from '../../Screens/Auth/SignIn';
import Forgot from '../../Screens/Auth/ForgotPassword';
import TabNavigator from '../BottomNavigator';
import Filter from '../../Screens/Filter';
import {Pressable, View, Image, StyleSheet} from 'react-native';
import SuccessOrder from '../../Screens/SuccessOrder';
import { useNavigation } from '@react-navigation/native';

const Navigation = () => {
  const Stack = createStackNavigator(); 
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName={'Splash'}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MapAllow"
        component={MapAllow}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: 'Filter',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
          },
          headerLeft: () => (
            <View>
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
      <Stack.Screen
        name="OrderSuccess"
        component={SuccessOrder}
        options={{
          headerTransparent: true,
          headerTitle: 'Checkout',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
          },
          headerLeft: () => (
            <View style={{marginLeft: 5, marginHorizontal: 10}}>
              <Pressable
                onPress={() => navigation.navigate('Card')}
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
    </Stack.Navigator>
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

export default Navigation;