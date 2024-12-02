import Images from '../../Constants/Images';

const ImageData = [
  {
    id: 1,
    image: require('../../Assets/Images/fastfood.png'),
    text: 'Fast Food',
  },
  {
    id: 2,
    image: require('../../Assets/Images/seafood.png'),
    text: 'Sea Food',
  },
  {
    id: 3,
    image: require('../../Assets/Images/maindishes.png'),
    text: 'Main Dishes',
  },
  {
    id: 4,
    image: require('../../Assets/Images/dessert.png'),
    text: 'Dessert',
  },
];

const data = [
  {
    img: Images.deal2,
  },
  {
    img: Images.deal3,
  },
  {
    img: Images.deal1
  }
];

export {
  ImageData, data
};
