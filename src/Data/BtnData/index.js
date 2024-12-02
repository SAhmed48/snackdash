import Images from '../../Constants/Images';
import styles from '../../Screens/Auth/SignIn/styles';

const AuthenticatedBtnData = [
  {
    id: 1,
    title: 'Login',
    buttonStyle: styles.button1,
    selectedStyle: styles.selected1,
  },
  {
    id: 2,
    title: 'Sign Up',
    buttonStyle: styles.button2,
    selectedStyle: styles.selected2,
  },
];

const socialBtnData = [
  {
    id: 1,
    image: Images.Google,
  },
  {
    id: 2,
    image: Images.Facebook,
  },
  {
    id: 3,
    image: Images.Google,
  },
];

const socialBtnDataSign = [
  {
    id: 1,
    image: Images.Facebook,
    title: 'Sign Up with Facebook',
  },
  {
    id: 2,
    image: Images.Google,
    title: 'Sign Up with Google',
  }
];

export {socialBtnData, AuthenticatedBtnData, socialBtnDataSign};
