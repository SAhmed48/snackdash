import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

// Reference dimensions based on a standard design
const guidelineBaseWidth = 428;
const guidelineBaseHeight = 926;

/**
 * Scales a size horizontally based on screen width.
 * @param {number} size - The design size.
 * @returns {number} The scaled size.
 */
const horizontalScale = size => (width / guidelineBaseWidth) * size;

/**
 * Scales a size vertically based on screen height.
 * @param {number} size - The design size.
 * @returns {number} The scaled size.
 */
const verticalScale = size => (height / guidelineBaseHeight) * size;

/**
 * Scales a size uniformly based on the smaller dimension.
 * Good for fonts or elements that should scale proportionally.
 * @param {number} size - The design size.
 * @returns {number} The scaled size.
 */
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

/**
 * Scales font sizes, ensuring text looks proportional on all devices.
 * @param {number} size - The base font size.
 * @returns {number} The scaled font size.
 */
const fontScale = size => {
  const scale = Math.min(width / guidelineBaseWidth, height / guidelineBaseHeight);
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

export {horizontalScale, verticalScale, moderateScale, fontScale};