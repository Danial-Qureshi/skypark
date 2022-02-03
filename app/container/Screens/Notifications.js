import React, {Component} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import globals from '../../common/globals';
import {addToCart} from '../../redux/user/operations';
import {
  fetchProductsByCategoryId,
  createBasket,
} from '../../redux/products/operations';
import ButtonComponent from '../../Components/ButtonComponent';
import {connect} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import BuyModal from '../../Components/Modal/BuyModal';
import {Header, Card, Text, Icon} from 'react-native-elements';
import Color from '../../common/Color';

const mapStateToProps = ({user, app, products}) => ({
  user,
  app,
  products,
});

@connect(mapStateToProps, {addToCart, fetchProductsByCategoryId, createBasket})
class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: '',
      item: {},
      qty: 1,
      price: null,
      selectedItem: [],
      variation: undefined,
      instruction: '',
      notifications: [
        {
          id: 1,
          date: 'Today',
          title: 'A new post has been added by skypark one',
          price: 'September 20 2021',
        },
        {
          id: 2,
          date: 'Today',
          title: 'A new post has been added by skypark one',
          price: 'September 20 2021',
        },
        {
          id: 3,
          date: 'Yesterday',
          title: 'A new post has been added by skypark one',
          price: 'September 20 2021',
        },
        {
          id: 4,
          date: '2 Days ago',
          title: 'A new post has been added by skypark one',
          price: 'September 20 2021',
        },
        {
          id: 5,
          date: '2 Days ago',
          title: 'A new post has been added by skypark one',
          price: 'September 20 2021',
        },
        {
          id: 6,
          date: '2 Days ago',
          title: 'A new post has been added by skypark one',
          price: 'September 20 2021',
        },
      ],
      modalVisble: false,
    };
  }

  componentDidMount() {
    console.log('token', this.props.user.accessToken);
  }

  renderFeatures(item) {
    return (
      <TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 8}}>
          <Icon
            reverse
            name={'bell-ring'}
            type="material-community"
            color={Color.primaryDark}
          />
          <View style={{marginStart: 10}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                maxWidth: 220,
              }}>
              {item.title}
            </Text>
            <Text style={{fontSize: 12, color: Color.blue1}}>{item.price}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              alignItems: 'flex-end',
            }}>
            {/* <Text style={{fontSize: 15, fontWeight: '600'}}>
            {item.type === 'Credit' ? '+ ' : '- '}
            {'RS ' + item.price + '.00'}
          </Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Feather
              onPress={() => {
                this.props.navigation.pop();
              }}
              style={{
                marginLeft: 25,
                marginTop: 15,
              }}
              name={'arrow-left'}
              size={26}
              color={globals.theme_color}
            />
            <Text
              style={{
                marginLeft: 15,
                marginTop: 20,
                fontSize: 16,
                fontWeight: '600',
              }}>
              Back
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 22,
                marginHorizontal: 35,
                marginTop: 15,

                fontWeight: '600',
                alignSelf: 'flex-start',
              }}>
              {'Notifications'}
            </Text>
            <View
              style={{
                backgroundColor: Color.lightGrey,
                marginHorizontal: 35,
                padding: 5,
                marginTop: 15,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                }}>
                {'Weekly'}
              </Text>
              <Feather
                onPress={() => {
                  this.props.navigation.pop();
                }}
                style={{
                  marginLeft: 25,
                }}
                name={'chevron-down'}
                size={20}
                color={globals.theme_color}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            marginHorizontal: 20,
            marginBottom: 20,
          }}>
          {this.state.notifications ? (
            <View style={{marginTop: 20}}>
              <FlatList
                data={this.state.notifications}
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                legacyImplementation={false}
                renderItem={({item}) => this.renderFeatures(item)}
                keyExtractor={item => item.id}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

export default Notifications;
