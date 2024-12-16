import { StyleSheet } from "react-native";
import { verticalScale, fontScale, horizontalScale } from "../../Utils/ScaleSize";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    width: '100%',
    height: verticalScale(65),
    backgroundColor: '#f6f6f6',
  },
  profilePicView: {
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  profileImageStyle: {
    width: horizontalScale(120),
    height: verticalScale(120),
    borderRadius: 60,
  },
  inputView: {
    alignItems: 'center',
  },
  profileNameStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: verticalScale(21),
  },
  inputTextView: {
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  placeHolderTextView: {
    top: verticalScale(10),
    flexDirection: 'row',
    width: horizontalScale(320),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeHolderTextStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: verticalScale(13.5),
    color: 'black',
    zIndex: 5,
  },
  editIconStyle: {
    top: verticalScale(15),
    zIndex: 5,
  },
  inputTextStyle: {
    padding: 0,
    paddingHorizontal: horizontalScale(5),
    overflow: 'visible',
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(14),
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    width: horizontalScale(330),
    height: verticalScale(40),
    borderRadius: 10,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(300),
    height: verticalScale(48),
    backgroundColor: '#33b056',
    borderRadius: 30,
  },
  btnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: fontScale(17),
    color: 'white',
  },
});

export default styles;
