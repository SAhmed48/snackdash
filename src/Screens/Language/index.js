import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Images from '../../Constants/Images';
import {Checkbox} from 'react-native-paper';
import { verticalScale, horizontalScale } from '../../Utils/ScaleSize';

const Language = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f6f6f6'} barStyle={'dark-content'} />
      <View style={{width: '100%', height: verticalScale(65), backgroundColor: '#f6f6f6'}} />
      <View style={{alignItems: 'center', marginTop: verticalScale(80)}}>
        <Image source={Images.language} />
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: verticalScale(18),
            color: 'black',
            marginTop: verticalScale(60),
          }}>
          Please Choose Your Language
        </Text>
      </View>
      <View>
        <View style={{alignItems: 'center', marginTop: verticalScale(40)}}>
          <Pressable
            style={{
              width: horizontalScale(290),
              height: verticalScale(50),
              alignItems: 'center',
              backgroundColor: 'white',
              elevation: 1,
            }}>
            <View
              style={{
                width: horizontalScale(250),
                height: verticalScale(50),
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: verticalScale(14),
                  color: checked ? '#3ab25b' : 'black',
                }}>
                English
              </Text>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
                color="#3ab25b"
              />
            </View>
          </Pressable>
          <Pressable
            style={{
              width: horizontalScale(290),
              height: verticalScale(50),
              alignItems: 'center',
              backgroundColor: 'white',
              borderWidth: 1,
              elevation: 1,
              borderColor: '#f8f8f8',
              borderBottomWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
            }}>
            <View
              style={{
                width: horizontalScale(250),
                height: verticalScale(50),
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: verticalScale(14)}}>
                Arabic 
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: verticalScale(50)}}>
        <TouchableOpacity>
          <View
            style={{
              width: horizontalScale(290),
              height: verticalScale(50),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#3ab25b',
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: verticalScale(17),
                color: 'white',
              }}>
              Done
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default Language;