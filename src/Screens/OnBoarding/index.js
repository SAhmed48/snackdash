import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import slides from '../../Data/OnBoardingData';
import Button from '../../Components/Button/OnBoardingButton';

const {width, height} = Dimensions.get('window');

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image source={item?.image} style={styles.imageStyle} />
      <View style={styles.textPosition}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: currentSlideIndex,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentSlideIndex]);

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skipToLastSlide = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    const indicatorWidth = 10;
    return (
      <View style={styles.footer}>
        <View style={styles.footerDirection}>
          {slides.map((_, index) => {
            const width = animation.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [
                indicatorWidth,
                indicatorWidth * 3.5,
                indicatorWidth,
              ],
              extrapolate: 'clamp',
            });
            const opacity = animation.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={[styles.animationIndicator, {opacity, width}]}>
                <LinearGradient
                  colors={['#63dc80', '#3db65e']}
                  angle={90}
                  useAngle={true}
                  style={styles.indicatorStyle}
                />
              </Animated.View>
            );
          })}
        </View>
        <View style={{alignItems: 'flex-end', marginBottom: 70}}>
          {currentSlideIndex === slides.length - 1 ? (
            <View>
             <Button Name='Get Started' onPress={() => navigation.navigate('MapAllow')}/>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
             <Button Name='Continue' onPress={goToNextSlide}/>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <View>
        {currentSlideIndex !== slides.length - 1 ? (
          <TouchableOpacity
            onPress={skipToLastSlide}
            style={styles.skipBtn}>
            <Text
              style={styles.skipBtnText}>
              Skip
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <StatusBar backgroundColor={'white'} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnboardingScreen;