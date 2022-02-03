import React, {Component} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  Platform,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import globals from '../../common/globals';
import {scale} from '../../ScalingUtils';
import {connect} from 'react-redux';

import {fetchCategories} from '../../redux/products/operations';
import {ActivityIndicator} from 'react-native-paper';
import {Header, Card, Text, Button, Icon} from 'react-native-elements';
import Color from '../../common/Color';

const mapStateToProps = ({user, app, products}) => ({
  user,
  language: app.language,
  products: products,
  isFetching: products.isFetching,
});

@connect(mapStateToProps, {fetchCategories})
class InquiriesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderCount: 0,
      selectedCategory: this.props.products?.categories
        ? this.props.products.categories[0]
        : null,
      refreshing: false,
      toggle: true,
      categories: [],
      sampleData: [
        {x: '2017-10-01', y: 30},
        {x: '2017-10-02', y: 200},
        {x: '2017-10-03', y: 100},
        {x: '2017-10-06', y: 900},
        {x: '2017-10-08', y: 170},
      ],
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
        {
          id: 7,
          date: '2 Days ago',
          title: 'A new post has been added by skypark one',
          price: 'September 20 2021',
        },
        {
          id: 8,
          date: '2 Days ago',
          title: 'A new post has been added by skypark one',
          price: 'September 20 2021',
        },
        {
          id: 9,
          date: '2 Days ago',
          title: 'A new post has been added by skypark one',
          price: 'September 20 2021',
        },
        {
          id: 10,
          date: '2 Days ago',
          title: 'A new post has been added by skypark one',
          price: 'September 20 2021',
        },
      ],
      features: [
        {
          id: 1,
          cat: 'Mutual Fund',
          product: 'Js Cash',
          des: 'This fund primaraly focus on handling cash',
        },
        {
          id: 2,
          cat: 'Mutual Fund',
          product: 'Js Income',
          des: 'This fund primaraly focus on increasing Income of person',
        },
        {
          id: 3,
          cat: 'Retirment Fund',
          product: 'Js Pension Saving',
          des: 'This fund primaraly focus on saving for your future self',
        },
        {
          id: 4,
          cat: 'Mutual Fund',
          product: 'Js Growth Fund',
          des: 'This fund primaraly focus on Increasing the return on your value',
        },
        {
          id: 5,
          cat: 'Mutual Fund',
          product: 'Js Value Fund',
          des: 'This fund primaraly focus on Money for value',
        },
        {
          id: 6,
          cat: 'Retirment Fund',
          product: 'Islamic Pensio Fund',
          des: 'This fund primaraly focus on Islamic ways to to invest yor money for future self',
        },
        {
          id: 7,
          cat: 'Retirment Fund',
          product: 'Islamic Pensio Fund',
          des: 'This fund primaraly focus on Islamic ways to to invest yor money for future self',
        },
        {
          id: 8,
          cat: 'Retirment Fund',
          product: 'Islamic Pensio Fund',
          des: 'This fund primaraly focus on Islamic ways to to invest yor money for future self',
        },
        {
          id: 9,
          cat: 'Retirment Fund',
          product: 'Islamic Pensio Fund',
          des: 'This fund primaraly focus on Islamic ways to to invest yor money for future self',
        },
      ],
    };
  }

  apiCall() {
    this.props.fetchCategories(this.props.user.accessToken).then(data => {
      if (data) {
        this.setState({categories: this.props.products.categories});
      }
    });
  }

  componentDidMount() {
    // this.apiCall();

    console.log('token', this.props.user.accessToken);

    console.log('categories', this.props.products);
  }

  next(item) {
    this.props.navigation.navigate('Products', {
      //   category: item.categories[0],
    });
  }

  renderFeatures(item) {
    return (
      <TouchableOpacity style={{padding: 15}}>
        <View style={{marginStart: 10}}>
          <Text
            style={{
              fontSize: 13,
              color: Color.blue,
              textDecorationLine: 'underline',
            }}>
            {'SP_M_112'}
          </Text>
          <Text style={{fontSize: 12, color: Color.blue1}}>{item.price}</Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              maxWidth: 300,
            }}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text>{'Status: '}</Text>
            <Text style={{fontSize: 12, color: Color.darkOrange}}>
              {'Pending'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderMember(item, text = false) {
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
                fontWeight: '400',
                maxWidth: 220,
              }}>
              {item.title}
            </Text>
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
    const {city, branch} = this.props.user;

    return (
      <View style={{flex: 1, backgroundColor: Color.lightGray}}>
        <View
          style={{
            marginVertical: scale(5),
            flex: 1,
          }}>
          <View
            style={{flexDirection: 'row', marginTop: 15, marginHorizontal: 15}}>
            <Image
              style={{width: 50, height: 50}}
              resizeMode="contain"
              source={require('../../Images/logo.png')}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Icon
                onPress={() => {
                  this.props.navigation.navigate('Notifications');
                }}
                name={'bell-ring'}
                size={35}
                type="material-community"
                color={Color.primaryDark}
              />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ProfileScreen');
                }}>
                <Image
                  style={{width: 40, height: 40, marginLeft: 25}}
                  source={require('../../Images/man.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          {this.props.isFetching ? (
            <ActivityIndicator
              style={{marginVertical: 10}}
              color={globals.theme_color}
            />
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  backgroundColor: Color.lightGrey,
                  padding: 5,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      toggle: true,
                    })
                  }
                  style={this.state.toggle ? styles.active : styles.inActive}>
                  <Text>Previous Inquires</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      toggle: false,
                    })
                  }>
                  <Text
                    style={this.state.toggle ? styles.inActive : styles.active}>
                    Make a new Inquirie
                  </Text>
                </TouchableOpacity>
              </View>

              {this.state.toggle ? (
                <View style={{backgroundColor: 'white'}}>
                  <FlatList
                    data={this.state.notifications}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => this.renderFeatures(item, true)}
                    keyExtractor={item => item.categoryId}
                  />
                </View>
              ) : (
                <View style={{backgroundColor: 'white'}}>
                  <ScrollView>
                    <Text h4 style={{margin: 12}}>
                      Inquire Subject
                    </Text>
                    <View
                      style={{
                        margin: 15,
                        borderWidth: 1,
                        borderColor: Color.grey,
                        borderRadius: 3,
                        backgroundColor: Color.lightgrey,
                      }}>
                      <Text
                        style={{
                          color: Color.grey,
                          padding: 10,
                          fontStyle: 'italic',
                        }}>
                        Enter subject here
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        margin: 10,
                        backgroundColor: Color.lightgrey,
                        padding: 5,
                      }}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 1,
                          padding: 5,
                          alignSelf: 'center',
                          elevation: 8,

                          backgroundColor: Color.lightBlue,
                          borderColor: Color.grey,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            color: '#0000ff',
                          }}>
                          Accounts and Billing
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: 3,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: Color.grey,
                            marginLeft: 5,
                            paddingVertical: 5,
                          }}>
                          Gernal Inquire
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Text h4 style={{margin: 12}}>
                      Description
                    </Text>
                    <View
                      style={{
                        margin: 15,
                        borderWidth: 1,
                        borderColor: Color.grey,
                        borderRadius: 3,
                        backgroundColor: Color.lightgrey,
                        height: 150,
                      }}>
                      <Text
                        style={{
                          color: Color.grey,
                          padding: 10,
                          fontStyle: 'italic',
                        }}>
                        Enter your Description here here
                      </Text>
                    </View>

                    <Text h4 style={{margin: 12}}>
                      Attchment
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        margin: 10,
                        padding: 5,
                      }}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 1,
                          padding: 5,
                          alignSelf: 'center',
                          elevation: 8,
                          backgroundColor: '#000',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            color: '#fff',
                          }}>
                          Chose File
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: 3,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: Color.grey,
                            marginLeft: 5,
                            paddingVertical: 5,
                          }}>
                          No File Chosen
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        margin: 10,
                        padding: 5,
                      }}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 1,
                          padding: 5,
                          alignSelf: 'center',
                          elevation: 8,
                          backgroundColor: '#000',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            color: '#fff',
                          }}>
                          Reset
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: 3,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#fff',
                            backgroundColor: Color.blue2,
                            marginLeft: 5,
                            paddingVertical: 5,
                            paddingHorizontal: 3,
                          }}>
                          Save Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    );
  }
}

export default InquiriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    borderRadius: 1,
    padding: 5,
    alignSelf: 'center',
    elevation: 8,
    marginLeft: 5,
    backgroundColor: 'white',
    borderColor: Color.grey,
  },
  inActive: {
    textAlign: 'center',
    color: Color.grey,
    marginLeft: 5,
    paddingVertical: 5,
  },
  card_template: {
    width: 250,
    height: 250,
  },
  card_image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  text_container: {
    position: 'absolute',
    width: 250,
    height: 30,
    bottom: 0,
    padding: 5,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_title: {
    color: 'white',
  },
});

function ChargesItem({title, onPress, price}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 3,
      }}>
      <Text style={{flex: 1, color: 'black', fontSize: 14}}>{title}</Text>

      <Text
        style={{
          flex: 1,
          textAlign: 'right',
          marginHorizontal: 10,
          color: 'black',
          fontSize: 14,
        }}>
        {price}
      </Text>
    </TouchableOpacity>
  );
}
