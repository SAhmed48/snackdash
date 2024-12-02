import {StyleSheet} from 'react-native';
import { verticalScale, horizontalScale } from '../../../Utils/ScaleSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  HalfContainer: {
    width: '100%',
    height: verticalScale(260),
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#33b056',
    alignItems: 'center',
  },
  imageStyle: {
    width: horizontalScale(210),
    height: verticalScale(210),
  },
  formContainerView: {
    alignItems: 'center',
    bottom: verticalScale(70),
  },
  formContainer1: {
    borderRadius: 10,
    width: horizontalScale(330),
    height: verticalScale(500),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  formContainer2: {
    borderRadius: 10,
    width: horizontalScale(330),
    height: verticalScale(540),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  loginSignUpContainerView: {
    alignItems: 'center',
    marginTop: verticalScale(25),
  },
  loginSignUpContainer: {
    flexDirection: 'row',
    width: horizontalScale(190),
    height: verticalScale(40),
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  button1: {
    width: horizontalScale(95),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  button2: {
    width: horizontalScale(95),
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  selected1: {
    backgroundColor: '#33b056',
  },
  selected2: {
    backgroundColor: '#33b056',
  },
  text: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(14),
  },
  selectedText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(14),
  },
  LoginContainerView: {
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  LoginContainer: {
    width: horizontalScale(270),
  },
  InputTextView: {
    marginTop: verticalScale(5),
    gap: verticalScale(18),
    alignItems: 'center',
  },
  InputText: {
    padding: 5,
    paddingLeft: horizontalScale(70),
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    fontSize: 13,
    color: 'black',
    width: horizontalScale(280),
    height: verticalScale(45),
    borderWidth: 1.5,
    borderColor: '#f0f0f0',
    backgroundColor: 'white',
    borderRadius: 25,
    textAlignVertical: 'center',
  },
  loginWithView: {
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  loginWithText: {
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(12),
    color: '#767676',
  },
  socialoginView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: verticalScale(25),
    marginTop: verticalScale(20),
  },
  dontHaveAccountView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: horizontalScale(5),
    marginTop: verticalScale(25),
  },
  dontHaveAccountText: {
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(12),
    color: '#767676',
  },
  registerBtnText: {
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(12),
  },
  loginBtnView: {
    alignItems: 'center',
    marginTop: verticalScale(65),
  },
  socialSignBtnStyle: {
    width: horizontalScale(270),
    height: 45,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  facebookBtnText: {
    marginHorizontal: horizontalScale(40),
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(13),
  },
  googleBtnText: {
    marginHorizontal: horizontalScale(40),
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(13),
  },
  alreadyHaveAccountView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: horizontalScale(5),
    marginTop: verticalScale(25),
  },
  alreadyHaveAccountText: {
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(12),
    color: '#767676',
  },
  signInText: {
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(12),
  },
  sigInBtnView: {
    alignItems: 'center',
    marginTop: verticalScale(60),
  },
  signInBtnStyle: {
    width: verticalScale(130),
    height: horizontalScale(45),
    backgroundColor: '#33b056',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  signInBtnText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: verticalScale(15),
  },
  ForgotView: {
    alignItems: 'flex-end',
    marginTop: verticalScale(20),
  },
});

export default styles;