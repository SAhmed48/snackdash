import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../Utils/ScaleSize";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9f8',
    },
    topView: {
      width: '100%',
      height: verticalScale(60),
      backgroundColor: '#f6f6f6',
    },
    topAddressView: {
      alignItems: 'center',
    },
    addressWidthStyle: {
      width: horizontalScale(360),
      height: verticalScale(120),
    },
    addressVerticalStyle: {
      marginTop: verticalScale(20),
    },
    addressTextStyle: {
      color: 'black',
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(15),
    },
    fullAddressView: {
      color: 'black',
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(15),
    },
    fullFlexDirection: {
      marginTop: verticalScale(5),
      flexDirection: 'row',
      width: horizontalScale(350),
      height: verticalScale(125),
      elevation: 1,
      justifyContent: 'center',
      shadowColor: 'black',
      backgroundColor: 'white',
      borderRadius: 15,
    },
    locationIconPosition: {
      marginTop: verticalScale(20),
    },
    mapDetailsView: {
      marginLeft: horizontalScale(15),
      marginTop: verticalScale(20),
    },
    mapDetailsText: {
      color: 'black',
      fontFamily: 'Poppins-SemiBold',
    },
    mapDetailsFullWidth: {
      width: horizontalScale(270),
    },
    mapDetailsFullText: {
      fontSize: verticalScale(13),
      fontFamily: 'Poppins-Medium',
      color: 'grey',
    },
    mapChangeAddressView: {
      alignItems: 'flex-end',
    },
    mapChangeAddressText: {
      fontFamily: 'Poppins-Medium',
      marginTop: verticalScale(5),
      color: 'green',
    },
    promoCodeView: {
      alignItems: 'center',
      marginTop: verticalScale(80),
    },
    promoCodeWidth: {
      width: horizontalScale(360),
      height: verticalScale(100),
    },
    promoCodeTextStyle: {
      fontFamily: 'Poppins-SemiBold',
      color: 'black',
      fontSize: verticalScale(15),
    },
    promoCodeFlexDirection: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: verticalScale(10),
    },
    inputTextStyle: {
      padding: 10,
      paddingHorizontal: horizontalScale(20),
      fontFamily: 'Poppins-Regular',
      lineHeight: 10,
      fontSize: verticalScale(15),
      backgroundColor: '#f8f8f8',
      color: 'black',
      width: horizontalScale(280),
      height: verticalScale(50),
      borderRadius: 10,
      elevation: 5,
      shadowColor: 'black',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      textAlignVertical: 'center',
    },
    promoAddBtnStyle: {
      width: horizontalScale(80),
      height: verticalScale(50),
      backgroundColor: '#33b056',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    promoAddTextStyle: {
      fontFamily: 'Poppins-SemiBold',
      color: 'white',
      fontSize: verticalScale(15),
    },
    paymentView: {
      alignItems: 'center',
      marginTop: verticalScale(15),
    },
    paymentWidth: {
      width: horizontalScale(360),
    },
    paymentTextStyle: {
      fontFamily: 'Poppins-SemiBold',
      color: 'black',
      fontSize: verticalScale(15),
    },
    paymentRadioView: {
      marginLeft: horizontalScale(10),
      gap: verticalScale(5),
      marginTop: verticalScale(15),
    },
    paymentRadioFlex: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paymentTextStyle: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(15),
    },
    itemsTotal: {
      alignItems: 'center',
      marginTop: verticalScale(30),
    },
    itemsTotalContainer: {
      width: horizontalScale(360),
      height: verticalScale(140),
      backgroundColor: '#f7f7f7',
      borderRadius: 15,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'grey',
      borderStyle: 'dashed',
    },
    itemsTotalView: {
      width: horizontalScale(320),
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: verticalScale(10),
    },
    itemsText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(15),
      color: 'grey',
    },
    itemsPriceTotal: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(15),
    },
    itemSeprator: {
      marginTop: verticalScale(10),
    },
    itemSepratorStyle: {
      height: 1,
      backgroundColor: 'grey',
      width: horizontalScale(320),
    },
    itemsTotalText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(18),
    },
    itemsTotalPrice: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(18),
      color: '#029a26',
    },
    confirmBtnView: {
      alignItems: 'center',
      marginTop: verticalScale(50),
    },
    confirmBtnStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: horizontalScale(300),
      height: verticalScale(50),
      backgroundColor: '#33b056',
      borderRadius: 20,
    },
    confirmText: {
      fontFamily: 'Poppins-SemiBold',
      color: 'white',
      fontSize: verticalScale(16),
    },
  });

  export default styles;