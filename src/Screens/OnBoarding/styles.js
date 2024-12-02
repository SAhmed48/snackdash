import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const indicatorWidth = 10;
const indicatorSpacing = 10;

export const styles = StyleSheet.create({
  imageStyle: {
    height: 240,
    width,
    resizeMode: 'contain',
    marginTop: 120,
  },
  textPosition: {
    alignItems: 'center',
    marginTop: 65,
  },
  subtitle: {
    color: 'black',
    fontSize: 15,
    marginTop: 10,
    width: 270,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  footer: {
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  footerDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  animationIndicator: {
    width,
    height: indicatorWidth,
    marginHorizontal: indicatorSpacing / 2,
    borderRadius: indicatorWidth / 2,
  },
  indicatorStyle: {
    width: '100%',
    height: '100%',
    borderRadius: indicatorWidth / 2,
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 6,
    borderRadius: 50,
  },
  continueBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5cce76',
    width: 300,
    height: 45,
    borderRadius: 22,
  },
  continueBtnText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  skipBtn: {
    position: 'absolute',
    top: 17,
    right: 25,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  skipBtnText: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  btn: {
    height: 50,
    width: 300,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
