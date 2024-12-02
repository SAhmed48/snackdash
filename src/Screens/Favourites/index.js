import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Images from '../../Constants/Images';
import styles from './styles';

const Favorits = () => {
  const [data, setData] = React.useState([]);
  const selectedDetails = useSelector(state => state.Reducer.selectedDetails);
  React.useEffect(() => {
    if (selectedDetails && Object.keys(selectedDetails).length > 0) {
      const uniqueItems = Array.from(
        new Set(selectedDetails.map(item => JSON.stringify(item))),
      ).map(item => JSON.parse(item));
      setData(uniqueItems);
      console.log(uniqueItems);
    }
  }, [selectedDetails]);

  return (
    <View style={styles.container}>
      <View style={styles.topView} />
      <View style={styles.favouriteView}>
        <FlatList
          data={data}
          keyExtractor={index => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View style={styles.favoriteContainerView} key={index}>
                <View style={styles.favouriteContainer}>
                  <Pressable style={styles.heartIconView}>
                    <EvilIcons name="heart" size={24} color={'green'} />
                  </Pressable>
                  <Image
                    source={Images.burger}
                    style={styles.burgerImageStyle}
                  />
                  <Text style={styles.itemTextStyle}>{item}</Text>
                  <Text style={styles.burgerText}>Burger King</Text>
                  <View style={styles.priceView}>
                    <View style={styles.priceStyleView}>
                      <Text style={styles.priceText}>33.00 EGP</Text>
                      <TouchableOpacity style={styles.btnPlusStyle}>
                        <Text style={styles.plusText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default Favorits;