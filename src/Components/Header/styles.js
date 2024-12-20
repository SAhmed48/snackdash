import {StyleSheet} from 'react-native';
import {verticalScale, horizontalScale, fontScale} from '../../Utils/ScaleSize';

const styles = StyleSheet.create({
    topView: {
      width: '100%',
      height: verticalScale(85),
      backgroundColor: '#f6f6f6',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    deliverView: {
      marginLeft: verticalScale(30),
    },
    deliverText: {
      fontFamily: 'Poppins-Regular',
      fontSize: verticalScale(13),
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
      fontSize: fontScale(13),
    },
    toggleText: {
      color: 'black',
      fontSize: verticalScale(14),
      transform: [{rotate: '90deg'}],
    },
    bellIconStyle: {
      position: 'absolute',
      alignSelf: 'flex-end',
      right: horizontalScale(30),
      width: horizontalScale(45),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      height: verticalScale(45),
      backgroundColor: 'white',
    },
    notificationDot: {
      position: 'absolute',
      overflow: 'visible',
      top: 5,
      right: 8,
      backgroundColor: 'green',
      width: 15,
      height: 15,
      borderRadius: 40,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: fontScale(15),
      fontFamily: 'Poppins-Regular',
      color: 'black',
    },
    closeButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: 'green',
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  export default styles;