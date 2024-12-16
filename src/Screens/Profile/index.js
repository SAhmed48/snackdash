import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  Pressable,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import ProfileData from '../../Data/ProfileData';
import Images from '../../Constants/Images';
import {horizontalScale, verticalScale} from '../../Utils/ScaleSize';

const UserProfile = () => {
  const mapDetails = useSelector(state => state.Reducer.mapDetails);
  const navigation = useNavigation();

  const memoizedProfileData = useMemo(() => ProfileData, []);

  const handleLogout = async () => {
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
  };

  const renderItem = useCallback(
    ({item, index}) => (
      <View key={index} style={{marginTop: verticalScale(18)}}>
        <Pressable
          onPress={() => {
            if (item.id === 4) {
              navigation.navigate('Settings');
            } else if (item.id === 5) {
              navigation.navigate('language');
            } else if (item.id === 3) {
              navigation.navigate('Coordinates');
            }
          }}>
          <View style={styles.profileSectionFlex}>
            {item.icon()}
            <View style={styles.profileSection}>
              <Text style={styles.profileSectionText}>{item.text}</Text>
              <MaterialIcons
                name={'keyboard-arrow-right'}
                size={30}
                color={'grey'}
              />
            </View>
          </View>
        </Pressable>
      </View>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f6f6f6'} barStyle={'dark-content'} />
      <View style={styles.profileView}>
        <View style={styles.itemContainer}>
          <View style={styles.profileInsideView}>
            <View style={styles.profileFlexView}>
              <Image
                source={Images.profilePic}
                style={styles.profileImageStyle}
              />
              <View style={{marginLeft: horizontalScale(20)}}>
                <View style={styles.profileNameView}>
                  <View>
                    <Text style={styles.profileTextName}>Ayman Atta</Text>
                    <Text style={styles.profileLocationText}>
                      {mapDetails.substring(0, 20)}
                    </Text>
                  </View>
                  <View style={styles.profileEditStyle}>
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
          data={memoizedProfileData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={styles.ItemSeparatorComponent} />
          )}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.ItemSeparatorComponent} />
      </View>
      <View style={{alignItems: 'center', marginTop: verticalScale(30)}}>
        <View style={styles.logOutView}>
          <MaterialCommunityIcons name={'logout'} size={30} color={'#31af54'} />
          <Text onPress={handleLogout} style={styles.logOutText}>
            Logout
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;