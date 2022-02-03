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
import {login} from '../../redux/operations';
import I18n from 'react-native-i18n';
import {TextInput} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';

const mapStateToProps = ({user, app}) => ({
  user,
  app,
});

@connect(mapStateToProps, {login})
class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '03152520336',
      password: '03322981699',
      token: null,
    };
  }

  validation() {
    var check = false;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.phone === '') {
      alert('Enter Phone Number');
    } else if (this.state.phone.length !== 11) {
      alert('Enter password');
    } else if (this.state.password === '') {
      alert('Enter password');
    } else {
      check = true;
    }
    return check;
  }

  loginFunction() {
    if (this.validation()) {
      var params = {
        password: this.state.password,
        username: this.state.phone,
      };
      this.props.navigation.replace('HomeScreen');
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: globals.theme_color,
              fontSize: 28,
              marginHorizontal: 20,
              marginTop: 40,
              marginBottom: 10,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            {I18n.t('SIGNIN')}
          </Text>
          <Text
            style={{
              color: globals.theme_color,
              fontSize: 16,
              alignSelf: 'center',
            }}>
            {'Add your details to login'}
          </Text>

          <ScrollView style={{flex: 1, marginTop: 20, marginHorizontal: 20}}>
            <TextInput
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
              keyboardType={'phone-pad'}
              placeholder={'Enter your Phone Number'}
              label="Phone #"
              value={this.state.phone}
              mode={'outlined'}
              theme={{colors: {primary: globals.theme_color}}}
              onChangeText={text => this.setState({phone: text})}
            />

            <TextInput
              style={{marginVertical: 10}}
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
              value={this.state.password}
              mode={'outlined'}
              theme={{colors: {primary: globals.theme_color}}}
              onChangeText={text => this.setState({password: text})}
            />

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ForgetPassword');
              }}
              style={{marginBottom: 10, alignItems: 'flex-end'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  marginRight: 5,
                }}>
                {I18n.t('forgot password')}
              </Text>
            </TouchableOpacity>

            {this.props.user.isFetching ? (
              <ActivityIndicator size={'large'} color={'red'} />
            ) : null}

            <ButtonComponent
              onPress={() => {
                this.loginFunction();
              }}
              extrastyle={{
                width: '90%',
                alignSelf: 'center',
                marginVertical: 40,
                borderRadius: 40,
                backgroundColor: globals.theme_color,
              }}
              title={I18n.t('SIGNIN')}
            />

            <Text
              style={{
                alignSelf: 'center',
                color: globals.theme_color,
                fontWeight: 'bold',
              }}>
              {'or Login With'}
            </Text>

            <ButtonComponent
              onPress={() => {}}
              extrastyle={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 40,
                borderRadius: 40,
                backgroundColor: globals.facebook_color,
              }}
              title={'Login With Facebook'}>
              <Image
                style={{alignSelf: 'center', marginHorizontal: 10}}
                resizeMode={'contain'}
                source={require('../../Images/facebook.png')}
              />
            </ButtonComponent>
            <ButtonComponent
              onPress={() => {}}
              extrastyle={{
                width: '90%',
                alignSelf: 'center',
                marginVertical: 20,
                borderRadius: 40,
                backgroundColor: globals.gmail_color,
              }}
              extraTextStyle={{fontWeight: 'bold'}}
              title={'Login With Google'}>
              <Image
                style={{alignSelf: 'center', marginHorizontal: 10}}
                resizeMode={'contain'}
                source={require('../../Images/gmail.png')}
              />
            </ButtonComponent>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text>{I18n.t('doyounotanhaveanccount?')}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SignUpScreen');
                }}>
                <Text
                  style={{
                    color: globals.theme_color,
                    fontWeight: 'bold',
                  }}>
                  {I18n.t('SignUp')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
