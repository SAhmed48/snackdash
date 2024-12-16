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
import {verticalScale} from '../../Utils/ScaleSize';
import {useSelector} from 'react-redux';
import useInputData from '../../Data/TextInput';
import styles from './styles';

const Settings = () => {
  const [profilePic, setProfilePic] = React.useState(null);
  const authData = useSelector(state => state.Reducer.authData);
  const {profileSettingsInput} = useInputData();
  React.useEffect(() => {
    console.log(authData);
  }, [authData]);
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
        <Text style={styles.profileNameStyle}>
          Hi {authData ? authData.name : 'User'}
        </Text>
      </View>
      {renderItemFeilds(profileSettingsInput)}
      <View style={{alignItems: 'center', marginTop: verticalScale(40)}}>
        <TouchableOpacity
          onPress={() => console.log(authData)}
          style={styles.btnStyle}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;