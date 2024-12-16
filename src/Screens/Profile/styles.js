import { StyleSheet } from "react-native";
import { verticalScale, horizontalScale, fontScale } from "../../Utils/ScaleSize";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileView: {
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  profileInsideView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  itemContainer: {
    width: horizontalScale(100),
    height: verticalScale(100),
  },
  profileFlexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageStyle: {
    width: horizontalScale(90),
    height: verticalScale(90),
  },
  profileNameView: {
    flexDirection: 'row',
    width: horizontalScale(240),
    justifyContent: 'space-between',
  },
  profileTextName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: fontScale(18),
  },
  profileLocationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontScale(14),
    color: 'grey',
  },
  profileEditStyle: {
    backgroundColor: '#f4f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(50),
    borderRadius: 30,
    height: verticalScale(50),
  },
  ItemSeparatorComponent: {
    height: 1,
    backgroundColor: '#f0f0f0',
    width: horizontalScale(350),
    marginTop: verticalScale(10),
  },
  profileSection: {
    marginLeft: horizontalScale(45),
    position: 'absolute',
    width: horizontalScale(317),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  profileSectionFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileSectionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontScale(14),
    color: 'grey',
  },
  logOutView: {
    width: horizontalScale(350),
    flexDirection: 'row',
    alignItems: 'center',
  },
  logOutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontScale(14),
    color: 'black',
    marginLeft: horizontalScale(12),
  },
});

export default styles;
