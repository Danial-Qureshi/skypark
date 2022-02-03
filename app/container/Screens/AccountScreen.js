import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import globals from '../../common/globals';
import TextWithIcon from '../../Components/TextWithIcon';
import LogoutModal from '../../Components/Modal/LogoutModal';
import {logout} from '../../redux/user/operations';

const mapStateToProps = ({app, user}) => {
  return {
    app,
    user,
    email: user.emailUser,
  };
};

@connect(mapStateToProps, {logout})
export default class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisble: false,
    };
  }

  componentDidMount() {}

  render() {
    const {userInfo} = this.props.user;

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text
          style={{
            color: globals.theme_color,
            fontSize: 24,
            marginTop: 30,
            alignSelf: 'center',
            fontWeight: 'bold',
          }}>
          {/* Hello {userInfo.firstname + ' ' + userInfo.lastname} ! */}
          Hello {'Daniyal' + ' ' + 'Amjad'} !
        </Text>
        <LogoutModal
          isVisible={this.state.modalVisble}
          onPressNo={() => {
            this.setState({modalVisble: false});
          }}
          onPressYes={() => {
            this.props.navigation.replace('Splash');
            this.props.logout();
          }}
          setVisibility={() => {
            this.setState({modalVisble: false});
          }}
        />

        <ScrollView style={{flex: 1, marginVertical: 10}}>
          <View
            style={{
              paddingHorizontal: 15,
              borderRadius: 5,
              marginVertical: 10,
            }}>
            <TextWithIcon
              onPress={() => {
                this.props.navigation.navigate('MyOrders');
              }}
              title={'My Order'}>
              <Image
                resizeMode={'contain'}
                style={{height: 24, width: 24}}
                source={require('../../Images/order.png')}
              />
            </TextWithIcon>

            <TextWithIcon
              onPress={() => {
                this.props.navigation.navigate('MyAddressesScreen');
              }}
              title={'My Wallet'}>
              <Image
                resizeMode={'contain'}
                style={{height: 24, width: 24}}
                source={require('../../Images/wallet.png')}
              />
            </TextWithIcon>

            <TextWithIcon
              onPress={() => {
                this.props.navigation.navigate('ProfileScreen');
              }}
              title={'Profile'}>
              <Image
                resizeMode={'contain'}
                style={{height: 24, width: 24}}
                source={require('../../Images/profile.png')}
              />
            </TextWithIcon>

            {this.props.user.accessToken ? (
              <TextWithIcon
                onPress={() => {
                  this.setState({modalVisble: true});
                }}
                title={'Logout'}>
                <Image
                  resizeMode={'contain'}
                  style={{height: 24, width: 24}}
                  source={require('../../Images/logout.png')}
                />
              </TextWithIcon>
            ) : (
              <TextWithIcon
                onPress={() => {
                  this.props.navigation.navigate('LoginScreen');
                }}
                title={'Sign In'}>
                <Image
                  resizeMode={'contain'}
                  style={{height: 24, width: 24}}
                  source={require('../../Images/logout.png')}
                />
              </TextWithIcon>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
