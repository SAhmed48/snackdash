import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {horizontalScale, verticalScale} from '../../Utils/ScaleSize';

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
  return (
    <View style={styles.container}>
      {historyData.map((innerArray, index) => (
        <View key={index} style={styles.itemContainer}>
          {innerArray.map(item => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemText}>Name: {item.name}</Text>
              <Text style={styles.itemText}>Price: ${item.price}</Text>
              <Text style={styles.itemText}>Count: {item.count}</Text>
              <Text style={styles.itemText}>
                Timestamp: {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      ))}
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
  item: {
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
});

export default History;
