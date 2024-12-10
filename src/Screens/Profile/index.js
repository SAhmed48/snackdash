import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import ProfileData from '../../Data/ProfileData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {fontScale, horizontalScale, verticalScale} from '../../Utils/ScaleSize';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {
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
            onPress={async () => {
              try {
                await auth().signOut();
                await AsyncStorage.removeItem('userToken');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                });
                ToastAndroid.show('Logout Successfully', ToastAndroid.SHORT);
              } catch (error) {
                console.log('Error:', error);
              }
            }}
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
});

export default UserProfile;
