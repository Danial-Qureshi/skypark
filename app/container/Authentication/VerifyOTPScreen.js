import React, {Component} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globals from '../../common/globals';
import {connect} from 'react-redux';
import ButtonComponent from '../../Components/ButtonComponent';
import {
  verifyOtp,
  verifyOtpFP,
  resendOtp,
  resendOtpFP,
} from '../../redux/operations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTPTextInput from 'react-native-otp-textinput';

const mapStateToProps = ({user, app}) => ({
  user,
  app,
});

@connect(mapStateToProps, {verifyOtp, verifyOtpFP, resendOtp, resendOtpFP})
class VerifyOTPScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      isPassword: this.props?.route?.params?.isPassword ?? false,
    };
  }

  validation() {
    var check = false;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.code === '') {
      alert('Enter OTP');
    } else {
      check = true;
    }
    return check;
  }

  resendOtp() {
    if (!this.state.isPassword) {
      let params = {
        type: 'customer',
      };
      this.props.resendOtp(params, this.props.user.accessToken);
    } else {
      let params = {
        type: 'forgotPassword',
        otp_id: this.props.user.otp_id,
      };
      this.props.resendOtp(params);
    }
  }

  setTimer() {
    this.interval = setInterval(
      () => this.setState(prevState => ({counter: prevState.counter - 1})),
      1000,
    );
  }

  componentDidMount() {
    this.setTimer();
    console.log(this.props.user.otp_id);
  }

  componentDidUpdate() {
    if (this.state.counter < 1) {
      clearInterval(this.interval);
    }
  }

  verifyOtp() {
    if (!this.state.isPassword) {
      if (this.validation()) {
        let params = {
          code: this.state.code,
          otp_id: this.props.user.otp_id,
          type: 'customer',
        };
        this.props.verifyOtp(params, this.props.user.accessToken).then(data => {
          if (data) {
            this.props.navigation.replace('HomeScreen');
          }
        });
      }
    } else {
      if (this.validation()) {
        let params = {
          code: this.state.code,
          otp_id: this.props.user.otp_id,
          // merchant_id: globals.merchant_id,
          phone: this.props?.route?.params?.phone,
        };
        this.props.verifyOtpFP(params).then(data => {
          if (data) {
            this.props.navigation.replace('ResetPasswordScreen', {
              data: {
                otp_code: this.state.code,
                otp_id: this.props.user.otp_id,
                phone: params.phone,
              },
            });
          }
        });
      }
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1}}>
          <View>
            <Ionicons
              name={'chevron-back'}
              size={30}
              color={globals.theme_color}
              style={{margin: 10}}
              onPress={() => {
                this.props.navigation.pop();
              }}
            />

            <Text
              style={{
                color: globals.theme_color,
                fontSize: 28,
                marginHorizontal: 30,
                marginTop: 10,
                marginBottom: 10,
                fontWeight: 'bold',
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              {'We have sent you an OTP to your mobile'}
            </Text>
            <Text
              style={{
                color: globals.theme_color,
                fontSize: 16,
                alignSelf: 'center',
              }}>
              {'Please check your mobile number'}
            </Text>
          </View>
          <View style={{flex: 1, marginVertical: 10, marginHorizontal: 20}}>
            <OTPTextInput
              handleTextChange={text => {
                this.setState({code: text});
              }}
              inputType={'password'}
              defaultValue={this.state.code}
              tintColor={globals.theme_color}
              textInputStyle={{
                borderBottomWidth: 1,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: 'grey',
              }}
              inputCount={4}
            />

            {this.props.user.isFetching ? (
              <ActivityIndicator size={'large'} color={'red'} />
            ) : null}

            <ButtonComponent
              onPress={() => {
                //this.loginFunction();
                this.verifyOtp();
              }}
              extrastyle={{
                width: '90%',
                alignSelf: 'center',
                marginVertical: 20,
                borderRadius: 40,
                backgroundColor: globals.theme_color,
              }}
              title={'Send'}
            />

            <TouchableOpacity
              onPress={() => {
                this.resendOtp();
              }}
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                }}>
                Didn't receive OTP?
              </Text>
              <Text
                style={{
                  color: globals.theme_color,
                }}>
                {' '}
                Click Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default VerifyOTPScreen;
