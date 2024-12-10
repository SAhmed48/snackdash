import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    HalfContainer: {
      width: '100%',
      height: 250,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      backgroundColor: '#33b056',
      alignItems: 'center',
    },
    imageStyle: {
      width: 210,
      height: 210,
    },
    formContainerView: {
      alignItems: 'center',
      bottom: 70,
    },
    formContainer1: {
      borderRadius: 10,
      width: 325,
      height: 325,
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
    forgotContainerView: {
      alignItems: 'center',
      marginTop: 25,
    },
    resetTextStyle: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 22,
    },
    resetTextView: {
      alignItems: 'center',
      marginTop: 5,
    },
    resetTextEnter: {
      color: '#B2B2B2',
      fontSize: 13,
      marginTop: 10,
      width: 270,
      textAlign: 'center',
      fontFamily: 'Poppins-Regular',
    },
    inputTextView: {
      alignItems: 'center',
      marginTop: 35,
    },
    InputTextView: {
      gap: 20,
      alignItems: 'center',
    },
    InputText: {
      padding: 5,
      paddingHorizontal: 45,
      fontFamily: 'Poppins-Regular',
      lineHeight: 20,
      fontSize: 13,
      color: 'black',
      width: 270,
      height: 45,
      borderWidth: 1.5,
      borderColor: '#f0f0f0',
      backgroundColor: 'white',
      borderRadius: 25,
      textAlignVertical: 'center',
    },
    sendBtnView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: -20,
    },
    sendBtnStyle: {
      width: 120,
      height: 45,
      backgroundColor: '#33b056',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
    },
    sendBtnText: {
      fontFamily: 'Poppins-Medium',
      fontSize: 15,
      color: 'white',
    },
    backArrow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    backToText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
    },
    logInText: {
      color: 'green',
      textDecorationLine: 'underline',
      fontFamily: 'Poppins-Medium',
    },
  });

  export default styles;