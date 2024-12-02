import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    width: '100%',
    height: 60,
    backgroundColor: '#f6f6f6',
  },
  favouriteView: {
    alignItems: 'center',
    marginTop: 30,
  },
  favoriteContainerView: {
    alignItems: 'center',
  },
  favouriteContainer: {
    width: 160,
    height: 195,
    backgroundColor: '#fffdf4',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: '#d1f6d2',
  },
  heartIconView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 5,
    top: 5,
  },
  burgerImageStyle: {
    width: 80,
    height: 80,
    marginTop: 10,
  },
  itemTextStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginTop: 5,
  },
  burgerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'grey',
  },
  priceView: {
    marginTop: 10,
  },
  priceStyleView: {
    width: 135,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'green',
  },
  btnPlusStyle: {
    width: 27,
    height: 27,
    backgroundColor: '#31af54',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  plusText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
});

export default styles;