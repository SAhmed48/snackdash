import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import Images from '../../Constants/Images';
import {verticalScale, horizontalScale} from '../../Utils/ScaleSize';
import {useSelector} from 'react-redux';
import useInputData from '../../Data/TextInput';

const Settings = () => {
  const [profilePic, setProfilePic] = React.useState(null);
  const authData = useSelector(state => state.Reducer.authData);
  const {profileSettingsInput} = useInputData();
  React.useEffect(() => {
    console.log(authData)
  }, [authData])
  const pickImage = async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 1,
      },
      response => {
        if (response?.assets && response.assets.length > 0) {
          setProfilePic(response.assets[0].uri);
        }
      },
    );
  };
  const renderItemFeilds = profileSettingsInput => {
    return profileSettingsInput.map(({feild, keyBoardType}) => {
      return (
        <View style={styles.inputTextView} key={feild}>
          <View style={styles.placeHolderTextView}>
            <Text style={styles.placeHolderTextStyle}>{feild}</Text>
            <View style={styles.editIconStyle}>
              <Feather name={'edit-2'} size={20} color={'grey'} />
            </View>
          </View>
          <View>
            <TextInput
              placeholder={feild}
              style={styles.inputTextStyle}
              keyboardType={keyBoardType}
            />
          </View>
        </View>
      );
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f6f6f6'} barStyle={'dark-content'} />
      <View style={styles.topView} />
      <View style={styles.profilePicView}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profilePic ? {uri: profilePic} : Images.profilePic}
            style={styles.profileImageStyle}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.profileNameStyle}>Hi {authData.name}!</Text>
      </View>
      {renderItemFeilds(profileSettingsInput)}
      <View style={{alignItems: 'center', marginTop: verticalScale(40)}}>
        <TouchableOpacity
          onPress={() => console.log(authData)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: horizontalScale(300),
            height: verticalScale(48),
            backgroundColor: '#33b056',
            borderRadius: 30,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: verticalScale(17),
              color: 'white',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
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
    height: verticalScale(65),
    backgroundColor: '#f6f6f6',
  },
  profilePicView: {
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  profileImageStyle: {
    width: horizontalScale(120),
    height: verticalScale(120),
    borderRadius: 60,
  },
  inputView: {
    alignItems: 'center',
  },
  profileNameStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: verticalScale(21),
  },
  inputTextView: {
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  placeHolderTextView: {
    top: verticalScale(10),
    flexDirection: 'row',
    width: horizontalScale(320),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeHolderTextStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: verticalScale(13.5),
    color: 'black',
    zIndex: 5,
  },
  editIconStyle: {
    top: verticalScale(15),
    zIndex: 5,
  },
  inputTextStyle: {
    padding: 0,
    paddingHorizontal: horizontalScale(5),
    overflow: 'visible',
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(14),
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    width: horizontalScale(330),
    height: verticalScale(40),
    borderRadius: 10,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
});

export default Settings;
