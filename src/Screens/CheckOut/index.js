import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import styles from './styles';

const CheckOut = () => {
  const [checked, setChecked] = React.useState('first');
  const mapDetails = useSelector(state => state.Reducer.mapDetails);
  const navigation = useNavigation();
  const itemTotal = useSelector(state => state.Reducer.itemTotal);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f6f6f6" barStyle="dark-content" />
      <View style={styles.topView} />
      <View>
        <View style={styles.topAddressView}>
          <View style={styles.addressWidthStyle}>
            <View style={styles.addressVerticalStyle}>
              <Text style={styles.addressTextStyle}>Delivery Address</Text>
            </View>
            <View style={styles.fullAddressView}>
              <View style={styles.fullFlexDirection}>
                <SimpleLineIcons
                  name={'location-pin'}
                  size={26}
                  color={'green'}
                  style={styles.locationIconPosition}
                />
                {mapDetails && (
                  <>
                    <View style={styles.mapDetailsView}>
                      <Text style={styles.mapDetailsText}>
                        {mapDetails ? `${mapDetails.substring(0, 20)}` : null}
                      </Text>
                      <View style={styles.mapDetailsFullWidth}>
                        <Text
                          style={
                            styles.mapDetailsFullText
                          }>{`${mapDetails.substring(20)}`}</Text>
                      </View>
                      <View style={styles.mapChangeAddressView}>
                        <Text style={styles.mapChangeAddressText}>Change</Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.promoCodeView}>
          <View style={styles.promoCodeWidth}>
            <View>
              <Text style={styles.promoCodeTextStyle}>Promo Code ?</Text>
            </View>
            <View style={styles.promoCodeFlexDirection}>
              <TextInput
                placeholder="Enter Promo"
                style={styles.inputTextStyle}
              />
              <TouchableOpacity style={styles.promoAddBtnStyle}>
                <Text style={styles.promoAddTextStyle}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.paymentView}>
          <View style={styles.paymentWidth}>
            <View>
              <Text style={styles.paymentTextStyle}>Pay With</Text>
            </View>
            <View style={styles.paymentRadioView}>
              <View style={styles.paymentRadioFlex}>
                <RadioButton
                  value={'first'}
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
                <Text style={styles.paymentTextStyle}>Debit / Credit Card</Text>
              </View>
              <View style={styles.paymentRadioFlex}>
                <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                  theme={{colors: {primary: 'green'}}}
                />
                <Text style={styles.paymentTextStyle}>Cash On Delivery</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.itemsTotal}>
          <View style={styles.itemsTotalContainer}>
            <View style={styles.itemsTotalView}>
              <Text style={styles.itemsText}>Item Total</Text>
              <Text style={styles.itemsPriceTotal}>{itemTotal.itemTotal} PKR</Text>
            </View>
            <View style={styles.itemsTotalView}>
              <Text style={styles.itemsText}>Delivery fees</Text>
              <Text style={styles.itemsPriceTotal}>
                {itemTotal.deliveryCharges} PKR
              </Text>
            </View>
            <View style={styles.itemSeprator}>
              <View style={styles.itemSepratorStyle} />
            </View>
            <View>
              <View style={styles.itemsTotalView}>
                <Text style={styles.itemsTotalText}>Total</Text>
                <Text style={styles.itemsTotalPrice}>
                  {itemTotal.total} {<Text style={{fontSize: 15}}>PKR</Text>}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.confirmBtnView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Card')}
            style={styles.confirmBtnStyle}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckOut;