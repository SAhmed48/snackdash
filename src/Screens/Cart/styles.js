import { StyleSheet } from "react-native";
import { fontScale, horizontalScale, verticalScale } from "../../Utils/ScaleSize";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fdfffe',
    },
    itemContainerView: {
      alignItems: 'center',
      marginTop: verticalScale(20),
    },
    itemContainer: {
      marginVertical: verticalScale(5),
      backgroundColor: 'white',
      borderColor: 'grey',
      width: horizontalScale(350),
      height: verticalScale(120),
      borderRadius: 20,
      borderColor: 'whitesmoke',
      shadowColor: 'black',
      borderWidth: 1,
    },
    itemContainerInside: {
      zIndex: 5,
      alignSelf: 'flex-end',
      marginRight: horizontalScale(20),
      gap: horizontalScale(5),
      top: verticalScale(20),
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemContainerTimeText: {
      fontFamily: 'Poppins-Regular',
      fontSize: verticalScale(12),
    },
    itemImageView: {
      alignItems: 'center',
    },
    itemFoods: {
      overflow: 'visible',
      width: horizontalScale(320),
      zIndex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemImageStyle: {
      width: horizontalScale(80),
      height: verticalScale(80),
    },
    foodNamePos: {
      marginLeft: horizontalScale(15),
    },
    foodNameStyle: {
      fontFamily: 'Poppins-Medium',
      fontSize: 15,
    },
    foodBurger: {
      fontFamily: 'Poppins-Medium',
      fontSize: verticalScale(14),
      color: 'grey',
    },
    foodPriceStyle: {
      fontFamily: 'Poppins-Bold',
      fontSize: verticalScale(15),
      color: '#029a26',
    },
    foodPKR: {
      fontSize: verticalScale(12),
    },
    incrementView: {
      alignSelf: 'flex-end',
      marginLeft: horizontalScale(50),
    },
    incrementViewStyle: {
      flexDirection: 'row',
      backgroundColor: '#f8f8f8',
      alignItems: 'center',
      width: horizontalScale(90),
      borderRadius: 40,
      justifyContent: 'space-between',
    },
    incrementBtnStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: horizontalScale(30),
      height: verticalScale(30),
      backgroundColor: '#e6f5ed',
      borderRadius: 30,
    },
    incrementTextStyle: {
      fontSize: verticalScale(20),
      fontFamily: 'Poppins-Medium',
      color: '#2dae51',
    },
    countTextStyle: {
      fontFamily: 'Poppins-Medium',
      fontSize: verticalScale(15),
    },
    incrementBtnStyle2: {
      alignItems: 'center',
      justifyContent: 'center',
      width: horizontalScale(30),
      height: verticalScale(30),
      backgroundColor: '#33b056',
      borderRadius: 30,
    },
    incrementTextStyle2: {
      fontSize: verticalScale(20),
      fontFamily: 'Poppins-Medium',
      color: '#e6f5ed',
    },
    rightSwipeActionsView: {
      backgroundColor: '#feb32e',
      height: verticalScale(120),
      width: horizontalScale(60),
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 20,
      borderBottomEndRadius: 20,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    receipetStyle: {
      justifyContent: 'flex-end',
      flex: 1,
      alignItems: 'center',
      bottom: verticalScale(90),
    },
    receiptBorderStyle: {
      width: horizontalScale(360),
      height: verticalScale(140),
      backgroundColor: '#f7f7f7',
      borderRadius: 15,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'grey',
      borderStyle: 'dashed',
    },
    itemsTotal: {
      width: horizontalScale(320),
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: verticalScale(10),
    },
    itemsTotalText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(15),
      color: 'grey',
    },
    itemsNumberTotal: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(15),
      color: 'grey',
    },
    itemSeprator: {
      marginTop: verticalScale(10),
    },
    itemSepratorStyle: {
      width: horizontalScale(325),
      height: 2,
      backgroundColor: '#dbdbdc',
    },
    TotalText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(18),
    },
    totalPriceStyle: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: verticalScale(18),
      color: '#029a26',
    },
    checkoutBtnView: {
      alignItems: 'center',
      bottom: verticalScale(50),
    },
    checkoutBtnStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: horizontalScale(300),
      height: verticalScale(50),
      backgroundColor: '#029a26',
      borderRadius: 20,
    },
    checkoutTextStyle: {
      fontFamily: 'Poppins-SemiBold',
      color: 'white',
      fontSize: verticalScale(17),
    },
    emptyCartView: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    emptyCart: {
      marginTop: verticalScale(50),
    },
    cartEmptyText: {
      textAlign: 'center',
      fontFamily: 'Poppins-SemiBold',
      fontSize: fontScale(25),
    },
    dontFoods: {
      textAlign: 'center',
      fontFamily: 'Poppins-Medium',
      fontSize: fontScale(15),
    },
  });