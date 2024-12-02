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
      <View style={{width: '100%', height: 70, backgroundColor: '#f6f6f6'}} />
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            marginTop: 35,
            width: 330,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
              color: 'black',
            }}>
            Price Range
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 14,
              color: 'black',
            }}>
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
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            marginTop: 30,
            width: 330,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
              color: 'black',
            }}>
            Discount
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 14,
              color: 'black',
            }}>
            {value}%
          </Text>
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
      <View style={{marginTop: 40}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: 330,
            }}>
            <Text style={{fontFamily: 'Poppins-Medium', fontSize: 13}}>
              Category
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              width: 350,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'grey',
                  fontSize: 12,
                }}>
                Fast Food
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'grey',
                  fontSize: 12,
                }}>
                Fast Food
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'grey',
                  fontSize: 12,
                }}>
                Fast Food
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{marginTop: 25}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: 330,
            }}>
            <Text style={{fontFamily: 'Poppins-Medium', fontSize: 13}}>
              Location
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              width: 330,
              gap: 10,
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              style={{
                width: 80,
                height: 40,
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'grey',
                  fontSize: 12,
                }}>
                1 Km
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 40,
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'grey',
                  fontSize: 12,
                }}>
                10 Km
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 40,
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'grey',
                  fontSize: 12,
                }}>
                10 Km
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{marginTop: 25}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: 330,
            }}>
            <Text style={{fontFamily: 'Poppins-Medium', fontSize: 13}}>
              Food
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              width: 330,
              height: 110,
              flexWrap: 'wrap',
              gap: 20,
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              style={{
                width: 80,
                height: 40,
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'grey',
                  fontSize: 12,
                }}>
                Pizza
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 40,
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'grey',
                  fontSize: 12,
                }}>
                Burger
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 110,
                height: 40,
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'grey',
                  fontSize: 12,
                }}>
                Main Dishes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 110,
                height: 40,
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'grey',
                  fontSize: 12,
                }}>
                Main Dishes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 110,
                height: 40,
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'grey',
                  fontSize: 12,
                }}>
                Main Dishes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <TouchableOpacity
          style={{
            width: 285,
            height: 42,
            backgroundColor: '#33b056',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 17,
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
  rangeTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
  },
  slider: {
    marginTop: 30,
    height: 5,
    width: '82%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
  },
  rail: {
    height: 6,
    width: '100%',
    backgroundColor: '#DBDBDB',
    borderRadius: 5,
  },
  railSelected: {
    height: 6,
    backgroundColor: '#33b056',
    borderRadius: 5,
  },
  stepper: {
    width: 20,
    height: 20,
    backgroundColor: '#33b056',
    position: 'absolute',
    top: -7,
    borderRadius: 9,
  },
  railFill: {
    height: 5,
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
    width: '87%',
    marginTop: 20,
  },
});
