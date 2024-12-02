import {View, SafeAreaView, StatusBar, Image} from 'react-native';
import React from 'react';
import Images from '../../Constants/Images';
import { horizontalScale, verticalScale } from '../../Utils/ScaleSize';

const SpecialDealOffer = [
  {
    id: 1,
    image: Images.specialOffer,
  },
  {
    id: 2,
    image: Images.deal2,
  },
  {
    id: 3,
    image: Images.deal1,
  },
  {
    id: 4,
    image: Images.deal3,
  },
];

const Special = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#f6f6f6'} barStyle={'dark-content'} />
      <View style={{width: '100%', height: verticalScale(65), backgroundColor: '#f6f6f6'}} />
      <View style={{marginTop: verticalScale(20), alignItems: 'center', gap: verticalScale(10)}}>
        {SpecialDealOffer.map((item, index) => (
          <Image
            key={index}
            source={item.image}
            style={{width: horizontalScale(365), height: verticalScale(160)}}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Special;