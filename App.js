import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/StackNavigator';
import {Provider} from 'react-redux';
import {Store} from './src/Redux/Store';
import {AppState} from 'react-native';

const App = () => {
  // const appState = React.useRef(AppState.currentState);
  // React.useEffect(() => {
  //   const handleAppStateChange = nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!');
  //     }
  //     appState.current = nextAppState;
  //   };
  //   const subscription = AppState.addEventListener(
  //     'change',
  //     handleAppStateChange,
  //   );
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
