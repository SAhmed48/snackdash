import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/StackNavigator';
import {Provider} from 'react-redux';
import {Store} from './src/Redux/Store';

const App = () => {
  React.useEffect(() => {
   const errorDetection = () => {
    ErrorUtils.setGlobalHandler((error, isFatal) => {
      console.log('error', error);
      console.log('isFatal', isFatal);
    })
   }
   errorDetection();
  }, []);
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
