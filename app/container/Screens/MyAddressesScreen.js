import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View, Image} from 'react-native';
import globals from '../../common/globals';
import {connect} from 'react-redux';
import {login} from '../../redux/operations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {setSelectedAddress, getAddresses} from '../../redux/user/operations';
import {Avatar, Card, Chip, Text, Icon} from 'react-native-elements';
import {Color} from '../../common';

const mapStateToProps = ({user, app}) => ({
  user,
  app,
});

@connect(mapStateToProps, {login, setSelectedAddress, getAddresses})
class MyAddressesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAddress: null,
      showAddAddressModal: false,
      features: [
        {
          id: 1,
          date: 'Today',
          type: 'Credit',
          price: '5000',
        },
        {
          id: 2,
          date: 'Today',
          type: 'Credit',
          price: '3000',
        },
        {
          id: 3,
          date: 'Yesterday',
          type: 'Debit',
          price: '2575',
        },
        {
          id: 4,
          date: '2 Days ago',
          type: 'Debit',
          price: '8000',
        },
        {
          id: 5,
          date: '2 Days ago',
          type: 'Debit',
          price: '5000',
        },
        {
          id: 6,
          date: '2 Days ago',
          type: 'Credit',
          price: '10000',
        },
      ],
    };
    // this.props.getAddresses(this.props.user.accessToken)
  }

  renderFeatures(item) {
    return (
      <Card
        containerStyle={{
          borderRadius: 18,
        }}>
        <TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              reverse
              name={
                item.type === 'Credit'
                  ? 'credit-card-plus'
                  : 'credit-card-minus'
              }
              type="material-community"
              color={Color.primaryDark}
            />
            <View style={{marginStart: 18}}>
              <Text style={{fontSize: 12}}>{item.date}</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                {item.type}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                {item.type === 'Credit' ? '+ ' : '- '}
                {'RS ' + item.price + '.00'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                color: globals.theme_color,
                fontSize: 14,
                marginHorizontal: 20,
                marginTop: 10,
                alignSelf: 'flex-start',
              }}>
              {'Hello'}
            </Text>
            <Text
              style={{
                color: globals.theme_color,
                fontSize: 28,
                marginHorizontal: 20,
                marginBottom: 10,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {'My Name'}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginRight: 20,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Image
              style={{width: 40, height: 40}}
              source={require('../../Images/man.png')}
            />
          </View>
        </View>

        <View
          style={{
            width: '95%',
            marginHorizontal: 10,
            height: 0.5,
            backgroundColor: 'grey',
          }}
        />
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Card
            containerStyle={{
              backgroundColor: Color.primary,
              borderRadius: 28,
            }}
            wrapperStyle={{alignItems: 'flex-start'}}>
            <Card.FeaturedSubtitle>Total Balance</Card.FeaturedSubtitle>
            <Card.Title h4 h4Style={{color: '#fff'}}>
              $122,334.00
            </Card.Title>
            <Card.Divider />
            <View style={{flexDirection: 'row'}}>
              <View>
                <Card.FeaturedSubtitle>Frofit</Card.FeaturedSubtitle>
                <Card.Title h4 h4Style={{color: '#fff', fontSize: 16}}>
                  $12,334.00
                </Card.Title>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Chip
                  title="+ 10%"
                  type="outline"
                  icon={{
                    name: 'arrow-up-circle',
                    type: 'feather',
                    size: 16,
                    color: 'green',
                  }}
                />
              </View>
            </View>
          </Card>

          <View
            style={{
              backgroundColor: Color.lightGrey,
              marginTop: 12,
              borderRadius: 30,
            }}>
            <View style={{flexDirection: 'row', marginTop: 12}}>
              <Text style={{fontSize: 18, margin: 12, fontWeight: '600'}}>
                Featured Products
              </Text>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={{fontSize: 14, margin: 12}}>See all</Text>
              </View>
            </View>

            <FlatList
              data={this.state.features}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              legacyImplementation={false}
              renderItem={({item}) => this.renderFeatures(item)}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default MyAddressesScreen;
