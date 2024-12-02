import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imagePosition: {
    marginTop: 90,
    alignItems: 'center',
  },
  TextPosition: {
    alignItems: 'center',
  },
  title: {
    top: 10,
    color: 'black',
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    bottom: 20,
    color: 'black',
    fontSize: 15,
    width: 280,
    textAlign: 'center',
    lineHeight: 23,
    letterSpacing: 0.4,
    fontFamily: 'Poppins-Regular',
  },
  btnPosition: {
    alignItems: 'center',
    marginTop: 50,
    gap: 30,
  },
});

export default styles;