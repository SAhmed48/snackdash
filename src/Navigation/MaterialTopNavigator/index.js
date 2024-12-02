import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Cart from '../../Screens/Cart';
import History from '../../Screens/History';

const MaterialTopTab = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          shadowColor: 'white',
          width: 365,
          alignSelf: 'center',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#66c581',
          height: 2.5,
        },
        tabBarLabelStyle: {
          color: 'black',
          fontSize: 12,
          fontFamily: 'Poppins-Regular',
        },
        swipeEnabled: false
      }}>
      <Tab.Screen name="AddCart" component={Cart} options={{
        tabBarLabel: 'Add to Cart',
        
      }}/>
      <Tab.Screen name="CartHistory" component={History} />
    </Tab.Navigator>
  );
};

export default MaterialTopTab;

