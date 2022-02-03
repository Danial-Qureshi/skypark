import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Modal, Text, View} from 'react-native';
import globals from '../../common/globals';
import ButtonComponent from '../ButtonComponent';

const mapStateToProps = ({user, app}) => ({
  app,
  user,
});

import {payment} from '../../redux/user/operations';
import {toast} from '../../Omni';

@connect(mapStateToProps, {payment})
class PhoneVerifyModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      description: '',
    };
  }

  resendOtp() {
    obj = {
      basketId: 'b83d49f1-a9fb-430e-868d-348ab9890498',
      paymentMethod: 'Bank Account',
      price: 245000,
    };
    this.props.payment(this.props.user.accessToken, obj).then(data => {
      if (data) {
        console.log(data);
        toast('Payment Sucessfull');
        this.props.onSucess();
      }
    });
  }

  render() {
    const data = this.props.data;

    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        onRequestClose={this.props.SetVisibilty}
        visible={this.props.Visibility}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            paddingHorizontal: 30,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              paddingVertical: 20,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                marginTop: 10,
                color: globals.theme_color,
                textAlign: 'center',
                fontSize: 16,
              }}>
              Phone verification!
            </Text>
            <Text
              style={{
                marginVertical: 10,
                color: globals.theme_color,
                textAlign: 'center',
                marginHorizontal: 15,
                fontSize: 12,
              }}>
              Your wallet is not verified you can't place order without wallet
              verification click the button to verify
            </Text>

            <View style={{justifyContent: 'center'}}>
              <ButtonComponent
                onPress={() => {
                  this.resendOtp();
                }}
                extrastyle={{
                  width: '80%',
                  alignSelf: 'center',
                  marginBottom: 20,
                  borderRadius: 40,
                  backgroundColor: globals.theme_color,
                }}
                title={'Verify Wallet'}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default PhoneVerifyModal;
