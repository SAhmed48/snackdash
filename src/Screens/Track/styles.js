import { StyleSheet } from "react-native";
import { verticalScale, horizontalScale, fontScale } from "../../Utils/ScaleSize";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    flexContainer: {
      flex: 1,
    },
    mapContainer: {
      flex: 1,
    },
    bottomSheetView: {
      width: horizontalScale(380),
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    bottomSheetStyle: {
      borderRadius: 30,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 10,
    },
    onWayText: {
      fontSize: fontScale(20),
      fontFamily: 'Poppins-Bold',
    },
    timeDeliverView: {
      width: horizontalScale(100),
      height: verticalScale(40),
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#faf4fa',
      alignItems: 'center',
      justifyContent: 'center',
    },
    timeDeliverFlex: {
      flexDirection: 'row',
      alignItems: 'center',
      width: horizontalScale(75),
      justifyContent: 'space-between',
    },
    minTextStyle: {
      fontFamily: 'Poppins-Regular',
      fontSize: fontScale(13.5),
      top: verticalScale(2),
    },
    progressView: {
      flexDirection: 'row',
      width: horizontalScale(390),
      justifyContent: 'space-around',
    },
    progressContainer: {
      marginTop: verticalScale(20),
      width: horizontalScale(110),
    },
    progressBar: {
      height: verticalScale(5),
      borderRadius: 5,
      marginTop: verticalScale(8),
    },
    progressText: {
      textAlign: 'center',
      fontFamily: 'Poppins-Regular',
      fontSize: fontScale(15),
      color: 'green',
    },
    riderView: {
      alignItems: 'center',
      marginTop: verticalScale(40),
    },
    riderFlexView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: horizontalScale(370),
    },
    profilePicStyle: {
      width: horizontalScale(60),
      height: verticalScale(60),
    },
    deliveryViewStyle: {
      flexDirection: 'row',
      width: horizontalScale(290),
      justifyContent: 'space-between',
    },
    deliveryText: {
      fontFamily: 'Poppins-Regular',
      fontSize: fontScale(13),
      color: 'grey',
    },
    riderNameText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: fontScale(17),
    },
    contactViewFlex: {
      flexDirection: 'row',
      gap: horizontalScale(15),
    },
    messageIconView: {
      backgroundColor: '#f4f4f6',
      alignItems: 'center',
      justifyContent: 'center',
      width: horizontalScale(45),
      borderRadius: 30,
      height: verticalScale(45),
    },
    itemSeparator: {
      width: horizontalScale(340),
      alignItems: 'center',
      borderWidth: 0.9,
      borderColor: '#fbf6fb',
      marginTop: verticalScale(15),
    },
    addressView: {
      alignItems: 'center',
      marginTop: verticalScale(20),
    },
    deliverView: {
      width: horizontalScale(350),
    },
    deliverText: {
      fontFamily: 'Poppins-Regular',
      fontSize: verticalScale(14),
      color: '#a7a7a6',
    },
    mapsView: {
      flexDirection: 'row',
      width: horizontalScale(300),
      alignItems: 'center',
      gap: horizontalScale(10),
    },
    mapsText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: fontScale(14),
    },
  });

  export default styles;