import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../Utils/ScaleSize";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    placeHolderTextStyle: {
      fontFamily: 'Poppins-Medium',
      color: 'grey',
      fontSize: verticalScale(13),
      top: verticalScale(10),
    },
    iconPosition: {
      position: 'absolute',
      left: horizontalScale(10),
      top: '50%',
    },
    headerStyle: {
      width: '100%',
      height: verticalScale(65),
      backgroundColor: '#f6f6f6',
    },
    creditCardImageView: {
      alignItems: 'center',
      marginTop: verticalScale(15),
    },
    creditImageStyle: {
      width: horizontalScale(350),
      height: verticalScale(190),
    },
    cardNumberTextStyle: {
      position: 'absolute',
      top: verticalScale(55),
      left: horizontalScale(20),
      fontSize: verticalScale(16),
      fontFamily: 'Poppins-Regular',
      color: 'white',
    },
    expiryTextView: {
      position: 'absolute',
      bottom: verticalScale(30),
      left: -8,
    },
    inputView: {
      alignItems: 'center',
    },
    inputWidth: {
      gap: verticalScale(10),
      width: horizontalScale(345),
    },
    inputWidthStyle: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: horizontalScale(345),
      marginTop: verticalScale(10),
    },
    inputTextStyleFlex: {
      marginTop: verticalScale(5),
      padding: 10,
      paddingHorizontal: horizontalScale(50),
      fontFamily: 'Poppins-Regular',
      fontSize: verticalScale(14),
      color: 'black',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'grey',
      width: horizontalScale(172),
      height: verticalScale(46),
      borderRadius: 10,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
    },
    inputTextStyle: {
      marginTop: verticalScale(5),
      padding: 10,
      paddingHorizontal: horizontalScale(50),
      fontSize: verticalScale(14),
      color: 'black',
      fontFamily: 'Poppins-Regular',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'grey',
      width: horizontalScale(345),
      height: verticalScale(46),
      borderRadius: 10,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      textAlignVertical: 'center',
    },
    paymentMethodView: {
      marginTop: verticalScale(20),
    },
    paymentMethodText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(16),
    },
    paymentMethodOptions: {
      flexDirection: 'row',
      gap: horizontalScale(20),
      marginTop: verticalScale(5),
    },
    paymentMethodBtnStyle: {
      width: horizontalScale(80),
      height: verticalScale(40),
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paymentMethodImageStyle: {
      width: horizontalScale(35),
      height: verticalScale(20),
    },
    paymentMethodImagePayPalStyle: {
      width: horizontalScale(50),
      height: verticalScale(50),
    },
    forFasterTextView: {
      alignItems: 'center',
      marginTop: verticalScale(30),
    },
    forFasterTextWidth: {
      width: horizontalScale(345),
      height: verticalScale(50),
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    forFasterTextInsideWidth: {
      width: horizontalScale(255),
    },
    forFasterTextStyle: {
      fontFamily: 'Poppins-Medium',
      color: 'black',
      fontSize: verticalScale(12),
    },
    confirmBtnStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: horizontalScale(310),
      height: verticalScale(48),
      backgroundColor: '#33b056',
      borderRadius: 20,
    },
    confirmBtnTextStyle: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(16),
      color: 'white',
    },
  });

  export default styles;