import { StyleSheet } from "react-native";
import { verticalScale, horizontalScale, fontScale } from "../../Utils/ScaleSize";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    width: '100%',
    height: verticalScale(65),
    backgroundColor: '#f6f6f6',
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: 'black',
  },
  mapContainer: {
    flex: 1,
  },
  addressContainer: {
    width: horizontalScale(350),
  },
  inputText: {
    paddingVertical: 10,
    paddingHorizontal: horizontalScale(70),
    fontFamily: 'Poppins-Regular',
    fontSize: fontScale(15),
    lineHeight: fontScale(18), // Ensure consistent spacing
    backgroundColor: 'white',
    color: 'black',
    width: horizontalScale(330),
    height: verticalScale(45),
    borderRadius: 30,
    elevation: 10,
    textAlignVertical: 'center', // Center aligns text vertically
    includeFontPadding: false, //
  },
  googlePlacesView: {
    alignItems: 'center',
    marginTop: verticalScale(40),
    zIndex: 1,
    flex: 1,
  },
  searchIcon: {
    position: 'absolute',
    left: horizontalScale(65),
    top: verticalScale(8),
  },
  locationView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    bottom: verticalScale(40),
  },
  locationInsideView: {
    width: horizontalScale(360),
    height: verticalScale(180),
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
  },
  locationTextView: {
    marginLeft: horizontalScale(15),
    marginTop: verticalScale(20),
  },
  locationTextStyle: {
    fontFamily: 'Poppins-Regular',
    color: 'grey',
    fontSize: fontScale(13),
  },
  locationIconView: {
    marginLeft: horizontalScale(20),
    marginTop: verticalScale(8),
  },
  locationTextIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: horizontalScale(320),
    gap: horizontalScale(20),
    flexWrap: 'wrap',
  },
  locationText: {
    width: horizontalScale(265),
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: fontScale(13),
  },
  btnView: {
    alignItems: 'center',
    marginTop: horizontalScale(20),
  },
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#33b056',
    width: horizontalScale(270),
    height: verticalScale(40),
    borderRadius: 14,
  },
  btnText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
});

export default styles;
