import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globals from '../../common/globals';
import {connect} from 'react-redux';
import ButtonComponent from '../../Components/ButtonComponent';
import {register} from '../../redux/operations';
import I18n from 'react-native-i18n';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

const mapStateToProps = ({user, app}) => ({
  user,
  app,
});

@connect(mapStateToProps, {register})
class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '03152520336',
      name: 'Daniyal Amjad',
      email: 'd@gmail.com',
      password: 'password',
      cPassword: 'password',
      token: null,
    };
  }

  validation() {
    var check = false;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email === '') {
      alert('Enter Email Address');
    } else if (reg.test(this.state.email.replace(/\s/g, '')) !== true) {
      alert('Enter Valid Email Address');
    } else if (this.state.name === '') {
      alert('Enter name');
    } else if (this.state.phone === '') {
      alert('Enter phone number');
    } else if (this.state.phone.length !== 11) {
      alert('Enter valid phone number start with 0');
    } else if (this.state.password === '') {
      alert('Enter password');
    } else if (this.state.password.length < 8) {
      alert('Password must be of 8 characters');
    } else if (this.state.cPassword !== this.state.password) {
      alert('Password mismatched');
    } else {
      check = true;
    }
    return check;
  }

  signUp() {
    if (this.validation()) {
      var params = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        app_version: DeviceInfo.getVersion(),
        password_confirmation: this.state.cPassword,
        fcm_token: this.state.token ?? 'ssss',
        source: 'MARN',
      };
      this.props.navigation.navigate('VerifyOTPScreen');
    }
  }

  componentDidMount() {
    console.log(DeviceInfo.getVersion());
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
                marginHorizontal: 20,
                marginTop: 10,
                marginBottom: 10,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {'Sign Up'}
            </Text>
            <Text
              style={{
                color: globals.theme_color,
                fontSize: 16,
                alignSelf: 'center',
              }}>
              {'Add your details to sign up'}
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{backgroundColor: '#fff'}}
            style={{flex: 1, marginVertical: 10, marginHorizontal: 20}}>
            <TextInput
              keyboardType={'phone-pad'}
              left={
                <TextInput.Icon
                  name={() => (
                    <Image
                      resizeMode={'cover'}
                      source={require('../../Images/phone.png')}
                    />
                  )}
                />
              }
              placeholder={'Enter your Phone Number'}
              label="Phone #"
              style={{backgroundColor: '#fff', marginVertical: 10}}
              value={this.state.phone}
              mode={'outlined'}
              theme={{colors: {primary: globals.theme_color}}}
              onChangeText={text => {
                this.setState({phone: text});
              }}
            />
            <TextInput
              left={
                <TextInput.Icon
                  name={() => (
                    <Image
                      resizeMode={'cover'}
                      source={require('../../Images/user.png')}
                    />
                  )}
                />
              }
              placeholder={'Enter your Full Name'}
              label="Full Name"
              value={this.state.name}
              mode={'outlined'}
              style={{backgroundColor: '#fff', marginVertical: 10}}
              theme={{colors: {primary: globals.theme_color}}}
              onChangeText={text => this.setState({name: text})}
            />
            <TextInput
              left={
                <TextInput.Icon
                  name={() => (
                    <Image
                      resizeMode={'cover'}
                      source={require('../../Images/email.png')}
                    />
                  )}
                />
              }
              placeholder={'Enter your Email ID'}
              label="Email ID"
              value={this.state.email}
              mode={'outlined'}
              style={{backgroundColor: '#fff', marginVertical: 10}}
              theme={{colors: {primary: globals.theme_color}}}
              onChangeText={text => this.setState({email: text})}
            />
            <TextInput
              left={
                <TextInput.Icon
                  name={() => (
                    <Image
                      resizeMode={'cover'}
                      source={require('../../Images/password.png')}
                    />
                  )}
                />
              }
              placeholder={'Enter your Password'}
              secureTextEntry={true}
              label="Enter Password"
              style={{backgroundColor: '#fff', marginVertical: 10}}
              value={this.state.password}
              mode={'outlined'}
              theme={{colors: {primary: globals.theme_color}}}
              onChangeText={text => this.setState({password: text})}
            />

            <TextInput
              left={
                <TextInput.Icon
                  name={() => (
                    <Image
                      resizeMode={'cover'}
                      source={require('../../Images/password.png')}
                    />
                  )}
                />
              }
              placeholder={'Re-Enter your Password'}
              secureTextEntry={true}
              label="Confirm Password"
              style={{backgroundColor: '#fff', marginVertical: 10}}
              value={this.state.cPassword}
              mode={'outlined'}
              theme={{colors: {primary: globals.theme_color}}}
              onChangeText={text => this.setState({cPassword: text})}
            />

            {this.props.user.isFetching ? (
              <ActivityIndicator size={'large'} color={'red'} />
            ) : null}

            <ButtonComponent
              onPress={() => {
                this.signUp();
              }}
              extrastyle={{
                width: '90%',
                alignSelf: 'center',
                marginVertical: 20,
                borderRadius: 40,
                backgroundColor: globals.theme_color,
              }}
              title={'Sign Up'}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text>{'Already have an account? '}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('LoginScreen');
                }}>
                <Text
                  style={{
                    color: globals.theme_color,
                    fontWeight: 'bold',
                  }}>
                  {I18n.t('SIGNIN')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default SignUpScreen;
