import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import ProfileData from '../../Data/ProfileData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {fontScale, horizontalScale, verticalScale} from '../../Utils/ScaleSize';

const UserProfile = () => {
  const [expanded, setExpanded] = React.useState(false);
  const mapDetails = useSelector(state => state.Reducer.mapDetails);
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={{marginTop: verticalScale(18)}}>
        <Pressable
          onPress={() =>
            item.id === 4
              ? navigation.navigate('Settings')
              : item.id === 5
              ? navigation.navigate('language')
              : item.id === 3
              ? navigation.navigate('Coordinates')
              : null
          }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {item.icon()}
            <View
              style={{
                marginLeft: horizontalScale(45),
                position: 'absolute',
                width: horizontalScale(317),
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: fontScale(14),
                  color: 'grey',
                }}>
                {item.text}
              </Text>
              <Pressable
                onPress={() =>
                  item.id === 4
                    ? navigation.navigate('Settings')
                    : item.id === 5
                    ? navigation.navigate('language')
                    : item.id === 3
                    ? navigation.navigate('Coordinates')
                    : null
                }>
                <MaterialIcons
                  name={'keyboard-arrow-right'}
                  size={30}
                  color={'grey'}
                />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
      <View style={{alignItems: 'center', marginTop: verticalScale(30)}}>
        <View style={styles.itemContainer}>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../Assets/Images/profilepic.png')}
                style={{width: horizontalScale(90), height: verticalScale(90)}}
              />
              <View style={{marginLeft: horizontalScale(20)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: horizontalScale(240),
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: fontScale(18),
                      }}>
                      Ayman Atta
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: fontScale(14),
                        color: 'grey',
                      }}>
                      {mapDetails.substring(0, 20)}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#f4f4f6',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: horizontalScale(50),
                      borderRadius: 30,
                      height: verticalScale(50),
                    }}>
                    <MaterialIcons name={'edit'} size={20} color={'black'} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <FlatList
          data={ProfileData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: '#f0f0f0',
                width: horizontalScale(350),
                marginTop: verticalScale(10),
              }}
            />
          )}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            height: 1,
            backgroundColor: '#f0f0f0',
            width: horizontalScale(350),
            marginTop: verticalScale(10),
          }}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: verticalScale(30)}}>
        <View
          style={{
            width: horizontalScale(350),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons name={'logout'} size={30} color={'#31af54'} />
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: fontScale(14),
              color: 'black',
              marginLeft: horizontalScale(12),
            }}>
            Logout
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: horizontalScale(100),
    height: verticalScale(100),
  },
  topView: {
    width: '100%',
    height: verticalScale(80),
    backgroundColor: '#f6f6f6',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  deliverView: {
    marginLeft: horizontalScale(30),
  },
  deliverText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#a7a7a6',
  },
  mapsView: {
    flexDirection: 'row',
    width: horizontalScale(300),
    alignItems: 'center',
    gap: horizontalScale(10),
  },
  mapsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: fontScale(13),
  },
  toggleText: {
    color: 'black',
    fontSize: fontScale(15),
    transform: [{rotate: '90deg'}],
  },
  bellIconStyle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: horizontalScale(30),
    width: horizontalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: 40,
    marginLeft: horizontalScale(30),
    backgroundColor: 'white',
  },
});

export default UserProfile;
