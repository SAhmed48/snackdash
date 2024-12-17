import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {verticalScale} from '../../Utils/ScaleSize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Images from '../../Constants/Images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const History = () => {
  const historyData = useSelector(state => state.Reducer.historyData);

  React.useEffect(() => {
    console.log(historyData);
  }, [historyData]);
  if (!historyData || historyData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No history available</Text>
      </View>
    );
  }

  const renderItem = ({item}) => {
    return (
      <View
        style={{alignItems: 'center', marginTop: verticalScale(20)}}
        key={item.id}>
        <View style={styles.itemContainer}>
          <View style={styles.itemContainerInside}>
            <MaterialIcons name={'access-time'} size={16} color={'green'} />
            <Text style={styles.itemContainerTimeText}>{date}</Text>
          </View>
          <View style={styles.itemImageView}>
            <View style={styles.itemFoods}>
              <Image source={Images.miniZing} style={styles.itemImageStyle} />
              <View style={styles.foodNamePos}>
                <Text style={styles.foodNameStyle}>{item.name}</Text>
                <Text style={styles.foodBurger}>Burger King</Text>
                <Text style={styles.foodPriceStyle}>
                  {item.price}
                  <Text style={styles.foodPKR}> PKR</Text>
                </Text>
              </View>
              <View style={styles.incrementView}>
                <View style={styles.incrementViewStyle}>
                  <MaterialCommunityIcons name = {'reload'} size = {25} color = {'green'}/>
                  <Text style = {styles.reorderText}>Reorder</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const arrayInnerData = historyData.flat();
  const date = new Date().toLocaleDateString('en-US').replace(/\//g, '.');

  return (
    <View style={styles.container}>
      <FlatList
        data={arrayInnerData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default History;