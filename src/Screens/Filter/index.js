import {
  View,
  Text,
  PanResponder,
  Animated,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState, useRef, useCallback} from 'react';
import Slider from 'rn-range-slider';
import {fontScale, horizontalScale, verticalScale} from '../../Utils/ScaleSize';
import {CategoryData, foodData, locationData} from '../../Data/BtnData';
import {useNavigation} from '@react-navigation/native';

const RenderThumb = () => <View style={styles.thumb} />;
const RenderRail = () => <View style={styles.rail} />;
const RenderRailSelected = () => <View style={styles.railSelected} />;
const RenderLabel = ({text}) => (
  <View style={styles.labelContainer}>
    <Text style={styles.labelText}>{text}</Text>
  </View>
);
const RenderNotch = () => <View style={styles.notch} />;

const Filter = () => {
  const [sliderDimensions, setSliderDimensions] = useState({
    width: 0,
    left: 0,
    right: 0,
  });
  const [value, setValue] = useState(0);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const stepperAnim = useRef(new Animated.Value(0)).current;
  const railFillAnim = useRef(new Animated.Value(0)).current;

  const stepperResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, {moveX}) => {
      const clampedMoveX = Math.min(
        Math.max(moveX, sliderDimensions.left),
        sliderDimensions.right,
      );
      const dx = clampedMoveX - sliderDimensions.left;
      stepperAnim.setValue(dx);
      railFillAnim.setValue(dx);
      const newValue = Math.round((dx / sliderDimensions.width) * 100);
      setValue(newValue);
    },
  });

  const renderThumb = useCallback(() => <RenderThumb />, []);
  const renderRail = useCallback(() => <RenderRail />, []);
  const renderRailSelected = useCallback(() => <RenderRailSelected />, []);
  const renderLabel = useCallback(value => <RenderLabel text={value} />, []);
  const renderNotch = useCallback(() => <RenderNotch />, []);

  const handleValueChange = useCallback((lowValue, highValue) => {
    setLow(lowValue);
    setHigh(highValue);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f6f6f6'} barStyle={'dark-content'} />
      <View style={styles.topView} />
      <View style={styles.priceRangeView}>
        <View style={styles.priceNumberView}>
          <Text style={styles.priceRangeText}>Price Range</Text>
          <Text style={styles.priceNumberText}>
            ${low} - ${high}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Slider
          style={styles.rangeSlider}
          min={0}
          max={4000}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
        />
      </View>
      <View style={styles.dicountView}>
        <View style={styles.discountPercentageView}>
          <Text style={styles.priceRangeText}>Discount</Text>
          <Text style={styles.priceNumberText}>{value}%</Text>
        </View>
      </View>
      <View
        style={styles.slider}
        onLayout={evt => {
          const {width, x} = evt.nativeEvent.layout;
          setSliderDimensions({
            width: width,
            left: x,
            right: x + width,
          });
        }}>
        <View style={styles.rail}>
          <Animated.View style={[styles.railFill, {width: railFillAnim}]} />
        </View>
        <Animated.View
          {...stepperResponder.panHandlers}
          style={[
            styles.stepper,
            {
              transform: [{translateX: stepperAnim}],
            },
          ]}
        />
      </View>
      <View style={styles.CategoryView}>
        <View style={styles.CategoryCenterView}>
          <View style={styles.CategoryWidth}>
            <Text style={styles.CategoryTextStyle}>Category</Text>
          </View>
        </View>
        <View style={styles.CategoryInsideView}>
          <View style={styles.CategoryFlexView}>
            {CategoryData.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  setSelectedItem(
                    item.title === selectedItem ? null : item.title,
                  )
                }
                key={index}
                style={{
                  width: horizontalScale(100),
                  height: verticalScale(40),
                  backgroundColor:
                    selectedItem === item.title ? '#33b056' : '#f6f6f6',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: selectedItem === item.title ? 'white' : 'grey',
                    fontSize: fontScale(12),
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={{marginTop: verticalScale(30)}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: horizontalScale(330),
            }}>
            <Text
              style={{fontFamily: 'Poppins-Medium', fontSize: fontScale(14)}}>
              Location
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: verticalScale(15)}}>
          <View
            style={{
              flexDirection: 'row',
              width: horizontalScale(330),
              gap: horizontalScale(20),
              justifyContent: 'flex-start',
            }}>
            {locationData.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  setSelectedLocation(
                    item.id === selectedLocation ? null : item.id,
                  )
                }
                key={index}
                style={{
                  width: horizontalScale(80),
                  height: verticalScale(40),
                  backgroundColor:
                    selectedLocation === item.id ? '#33b056' : '#f6f6f6',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: selectedLocation === item.id ? 'white' : 'grey',
                    fontSize: fontScale(12),
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={{marginTop: verticalScale(30)}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: horizontalScale(330),
            }}>
            <Text
              style={{fontFamily: 'Poppins-Medium', fontSize: fontScale(14)}}>
              Food
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: verticalScale(10)}}>
          <View
            style={{
              flexDirection: 'row',
              width: horizontalScale(330),
              height: verticalScale(110),
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: horizontalScale(15),
              justifyContent: 'flex-start',
            }}>
            {foodData.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  setSelectedFood(item.id === selectedFood ? null : item.id)
                }
                key={index}
                style={{
                  width: horizontalScale(100),
                  height: verticalScale(50),
                  backgroundColor:
                    selectedFood === item.id ? '#33b056' : '#f6f6f6',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: selectedFood === item.id ? 'white' : 'grey',
                    fontSize: fontScale(13),
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: verticalScale(70)}}>
        <TouchableOpacity
          onPress={() => {
            const data = {
              low,
              high,
              value,
              selectedItem,
              selectedLocation,
              selectedFood,
            };
            console.log(data);
          }}
          style={{
            width: horizontalScale(300),
            height: verticalScale(50),
            backgroundColor: '#33b056',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: fontScale(18),
              color: 'white',
            }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    width: '100%',
    height: verticalScale(65),
    backgroundColor: '#f6f6f6',
  },
  priceRangeView: {
    alignItems: 'center',
  },
  priceNumberView: {
    marginTop: verticalScale(35),
    width: horizontalScale(330),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  priceRangeText: {
    fontSize: fontScale(14),
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  priceNumberText: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontScale(14),
    color: 'black',
  },
  rangeTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
  },
  slider: {
    marginTop: verticalScale(35),
    height: verticalScale(5),
    width: horizontalScale(330),
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
  },
  rail: {
    height: verticalScale(6),
    width: '100%',
    backgroundColor: '#DBDBDB',
    borderRadius: 5,
  },
  railSelected: {
    height: verticalScale(6),
    backgroundColor: '#33b056',
    borderRadius: 5,
  },
  stepper: {
    width: horizontalScale(20),
    height: verticalScale(20),
    backgroundColor: '#33b056',
    position: 'absolute',
    top: verticalScale(-7),
    borderRadius: 9,
  },
  railFill: {
    height: verticalScale(6),
    backgroundColor: '#33b056',
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 10,
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: '#33b056',
    borderRadius: 9,
    elevation: 10,
    shadowColor: '#33b056',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  labelContainer: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#33b056',
    borderRadius: 5,
  },
  labelText: {
    fontSize: 14,
  },
  notch: {
    width: 8,
    height: 8,
    backgroundColor: '#33b056',
    borderRadius: 8,
  },
  rangeSlider: {
    width: horizontalScale(340),
    marginTop: 20,
  },
  dicountView: {
    alignItems: 'center',
  },
  discountPercentageView: {
    marginTop: verticalScale(35),
    width: horizontalScale(330),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  CategoryView: {
    marginTop: verticalScale(40),
  },
  CategoryCenterView: {
    alignItems: 'center',
  },
  CategoryWidth: {
    width: horizontalScale(330),
  },
  CategoryTextStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontScale(14),
  },
  CategoryInsideView: {
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  CategoryFlexView: {
    flexDirection: 'row',
    width: horizontalScale(350),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
