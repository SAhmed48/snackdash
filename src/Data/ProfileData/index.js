import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const getIcons = (Library, name, size, color) => (
    <Library name={name} size={size} color={color} />
  );

const ProfileData = [
    {
      id: 1,
      text: 'Manage Profile',
      icon: () =>
        getIcons(MaterialCommunityIcons, 'account-circle-outline', 24, 'grey'),
    },
    {
      id: 2,
      text: 'Payments',
      icon: () => getIcons(Octicons, 'credit-card', 25, 'grey'),
    },
    {
      id: 3,
      text: 'My Location',
      icon: () => getIcons(Octicons, 'location', 25, 'grey'),
    },
    {
      id: 4,
      text: 'Settings',
      icon: () => getIcons(Feather, 'settings', 25, 'grey'),
    },
    {
      id: 5,
      text: 'Language',
      icon: () => getIcons(FontAwesome, 'language', 25, 'grey'),
    },
    {
      id: 6,
      text: 'Support',
      icon: () => getIcons(MaterialIcons, 'contact-support', 25, 'grey'),
    },
    {
      id: 7,
      text: 'Dark Mode',
      icon: () => getIcons(MaterialIcons, 'dark-mode', 25, 'grey'),
    },
  ];

  export default ProfileData;
  