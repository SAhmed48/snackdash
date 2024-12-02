import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialTopTab from '../../Navigation/MaterialTopNavigator';
import {useSelector} from 'react-redux';

const AddCart = () => {
  const [expanded, setExpanded] = React.useState(false);
  const mapDetails = useSelector(state => state.Reducer.mapDetails);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f6f6f6'} barStyle={'dark-content'} />
      <View style={styles.topView}>
        <View style={styles.deliverView}>
          <Text style={styles.deliverText}>Deliver to</Text>
          <View style={styles.mapsView}>
            <Image source={require('../../Assets/Images/location.png')} />
            <Text style={styles.mapsText}>
              {expanded ? mapDetails : `${mapDetails.substring(0, 20)}`}
            </Text>
            <TouchableOpacity onPress={toggleExpand}>
              <Text style={styles.toggleText}>{expanded ? '<' : '>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bellIconStyle}>
          <Feather name={'bell'} size={23} color={'grey'} />
        </View>
      </View>
      <MaterialTopTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    width: '100%',
    height: 80,
    backgroundColor: '#f6f6f6',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  deliverView: {
    marginLeft: 30,
  },
  deliverText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#a7a7a6',
  },
  mapsView: {
    flexDirection: 'row',
    width: 300,
    alignItems: 'center',
    gap: 10,
  },
  mapsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  toggleText: {
    color: 'black',
    fontSize: 15,
    transform: [{rotate: '90deg'}],
  },
  bellIconStyle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 30,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: 40,
    marginLeft: 30,
    backgroundColor: 'white',
  },
});

export default AddCart;
