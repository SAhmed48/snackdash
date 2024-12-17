import { verticalScale, horizontalScale, fontScale } from "../../Utils/ScaleSize";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
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
    fontSize: fontScale(15),
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
    alignItems: 'center',
    width: horizontalScale(90),
    borderRadius: 40,
    justifyContent: 'space-between',
  },
  reorderText: {
    color: 'green',
    fontSize: fontScale(14),
    fontFamily: 'Poppins-Medium',
  },
});

export default styles;
