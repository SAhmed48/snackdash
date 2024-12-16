import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {horizontalScale, verticalScale, fontScale} from '../../Utils/ScaleSize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
            <Text style={styles.itemContainerTimeText}></Text>
          </View>
          <View style={styles.itemImageView}>
            <View style={styles.itemFoods}>
              <Image
                source={require('../../Assets/Images/miniZing.png')}
                style={styles.itemImageStyle}
              />
              <View style={styles.foodNamePos}>
                <Text style={styles.foodNameStyle}>{item.name}</Text>
                <Text style={styles.foodBurger}>Burger King</Text>
                <Text style={styles.foodPriceStyle}>
                  {item.price}
                  <Text style={styles.foodPKR}>PKR</Text>
                </Text>
              </View>
              <View style={styles.incrementView}></View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

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
});

export default History;
