import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import useInputData from '../../Data/TextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../Constants/Images';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { setHistoryData } from '../../Redux/Action';

const payment = [
  {
    id: 1,
    image: Images.masterCard,
  },
  {
    id: 2,
    image: Images.payPal,
  },
];

const Card = () => {
  const [cardName, setCardName] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [ccv, setCVV] = React.useState('');
  const [isEnable, setIsEnable] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState(null);
  const {InputCardDetails, InputCardInformation} = useInputData();
  const handleFocus = feild => () => setFocusedField(feild);
  const handleBlur = () => setFocusedField(null);
  const navigation = useNavigation();
  const setAddToCartDetails = useSelector(state => state.Reducer.setAddToCartDetails)
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(setAddToCartDetails)
  }, [setAddToCartDetails])

  const handleInputFeild = feild => text => {
    if (feild === 'Card Holder') setCardName(text);
    else if (feild === 'Card Number') setCardNumber(text);
    else if (feild === 'Expiry Date') setExpiryDate(text);
    else if (feild === 'CVV') setCVV(text);
  };

  const val = value => {
    if (value === 'Card Holder') cardName;
    else if (value === 'Card Number') cardNumber;
    else if (value === 'Expiry Date') expiryDate;
    else if (value === 'CVV') ccv;
  };

  const getIcon = (feild, isFocused) => {
    const color = isFocused ? '#33b056' : 'grey';
    switch (feild) {
      case 'Card Holder':
        return (
          <MaterialCommunityIcons name={'account'} size={24} color={color} />
        );
      case 'Card Number':
        return <Octicons name={'credit-card'} size={24} color={color} />;
      case 'Expiry Date':
        return <SimpleLineIcons name={'calendar'} size={23} color={color} />;
      case 'CVV':
        return <SimpleLineIcons name={'lock'} size={24} color={color} />;
      default:
        break;
    }
  };

  const renderInputFeilds = inputData => {
    return inputData.map(({feild, ref, keyBoardType, nextRef}) => {
      const isFocused = focusedField === feild;
      return (
        <View key={feild} style={{position: 'relative'}}>
          <Text style={styles.placeHolderTextStyle}>{feild}</Text>
          <TextInput
            ref={ref}
            returnKeyType={
              feild === 'Card Holder Name'
                ? 'next'
                : feild === 'Card Number'
                ? 'next'
                : null
            }
            keyboardType={keyBoardType}
            onChangeText={handleInputFeild(feild)}
            placeholder={feild}
            value={val(feild)}
            onSubmitEditing={() => nextRef?.current?.focus()}
            onBlur={handleBlur}
            onFocus={handleFocus(feild)}
            secureTextEntry={feild === 'CVV'}
            style={[
              styles.inputTextStyle,
              {borderColor: isFocused ? '#33b056' : '#f0f0f0'},
            ]}
          />
          <View style={styles.iconPosition}>{getIcon(feild, isFocused)}</View>
        </View>
      );
    });
  };

  const InputFeild = inputData => {
    return inputData.map(({feild, ref, keyBoardType, nextRef}) => {
      const isFocused = focusedField === feild;
      return (
        <View key={feild} style={{position: 'relative'}}>
          <Text style={styles.placeHolderTextStyle}>{feild}</Text>
          <TextInput
            ref={ref}
            returnKeyType={
              feild === 'Expiry Date' ? 'next' : feild === 'CVV' ? 'done' : null
            }
            keyboardType={keyBoardType}
            placeholder={feild}
            onSubmitEditing={() => nextRef?.current?.focus()}
            onFocus={handleFocus(feild)}
            onBlur={handleBlur}
            style={[
              styles.inputTextStyleFlex,
              {borderColor: isFocused ? '#33b056' : '#f0f0f0'},
            ]}
          />
          <View style={styles.iconPosition}>{getIcon(feild, isFocused)}</View>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f6f6f6" barStyle="dark-content" />
      <View style={styles.headerStyle} />
      <View>
        <View style={styles.creditCardImageView}>
          <View>
            <Image source={Images.creditCard} style={styles.creditImageStyle} />
            <Text style={styles.cardNumberTextStyle}>{cardNumber}</Text>
          </View>
          <View>
            <Text style={styles.expiryTextView}></Text>
          </View>
        </View>
        <View style={styles.inputView}>
          <View style={styles.inputWidth}>
            {renderInputFeilds(InputCardDetails)}
          </View>
          <View>
            <View style={styles.inputWidthStyle}>
              {InputFeild(InputCardInformation)}
            </View>
          </View>
        </View>
        <View style={styles.inputView}>
          <View style={styles.inputWidth}>
            <View style={styles.paymentMethodView}>
              <Text style={styles.paymentMethodText}>Payment Method</Text>
            </View>
            <View style={styles.paymentMethodOptions}>
              {payment.map((item, index) => (
                <Pressable key={index} style={styles.paymentMethodBtnStyle}>
                  <Image
                    source={item.image}
                    style={[
                      styles.paymentMethodImageStyle,
                      item.id === 2 && styles.paymentMethodImagePayPalStyle,
                    ]}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.forFasterTextView}>
          <View style={styles.forFasterTextWidth}>
            <View style={styles.forFasterTextInsideWidth}>
              <Text style={styles.forFasterTextStyle}>
                For Faster and more secure checkout save your card details
              </Text>
            </View>
            <View>
              <Switch
                onValueChange={() => setIsEnable(!isEnable)}
                value={isEnable}
                trackColor={{false: 'grey', true: '#33b056'}}
                thumbColor={isEnable ? 'white' : 'white'}
                style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
              />
            </View>
          </View>
        </View>
        <View style={[styles.inputView, {marginTop: 30}]}>
          <TouchableOpacity
            style={styles.confirmBtnStyle}
            onPress={async () => {
              dispatch(setHistoryData(setAddToCartDetails))
              console.log('dispatched', setAddToCartDetails)
              navigation.navigate('OrderSuccess');
            }}>
            <Text style={styles.confirmBtnTextStyle}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Card;