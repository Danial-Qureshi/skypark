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
class CartScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderCount: 0,
      selectedCategory: this.props.products?.categories
        ? this.props.products.categories[0]
        : null,
      refreshing: false,
      categories: [],
      sampleData: [
        {x: '2017-10-01', y: 30},
        {x: '2017-10-02', y: 200},
        {x: '2017-10-03', y: 100},
        {x: '2017-10-06', y: 900},
        {x: '2017-10-08', y: 170},
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

  renderCat(item, text = false) {
    return (
      <View>
        <TouchableOpacity
          style={{alignItems: 'center', margin: 10}}
          onPress={item => {
            this.next(item);
          }}>
          <ImageBackground
            style={{width: 250, height: 150}}
            source={require('../../Images/product1.png')}>
            {text && (
              <View
                style={{
                  position: 'absolute',
                  top: 7,
                  left: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'black',
                }}>
                <Text style={{color: 'white'}}>June 19 2021</Text>
              </View>
            )}
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }

  renderFeatures(item) {
    return (
      <Card
        containerStyle={{
          flex: 1 / 2,
          borderRadius: 18,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={item => {
            this.next(item);
          }}>
          <View style={{flex: 1}}>
            <Text h4 style={{textAlign: 'center', color: Color.primary}}>
              {item.cat}
            </Text>
          </View>
          <Card.Divider />
          <Text style={{fontSize: 15, fontWeight: '600'}}>{item.product}</Text>
          <Text style={{textAlign: 'center'}}>{item.des}</Text>
        </TouchableOpacity>
      </Card>
    );
  }

  render() {
    const {city, branch} = this.props.user;

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          <View
            style={{
              marginVertical: scale(5),
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                marginHorizontal: 15,
              }}>
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
              <View>
                <>
                  {/* <TouchableOpacity
                activeOpacity={0}
                onPress={() => {
                  this.props.navigation.navigate('MyAddressesScreen');
                }}>
                <Card
                  containerStyle={{
                    backgroundColor: Color.primary,
                    borderRadius: 10,
                  }}>
                  <Card.Title selectionColor="#fff">
                    Depoit Into wallet to start investing
                  </Card.Title>
                  <Card.Divider />
                  <Text style={{marginBottom: 10, textAlign: 'center'}}>
                    You can chose from one of our payment method to deposit cash
                    into our wallet.
                  </Text>
                </Card>
              </TouchableOpacity> */}

                  <Card>
                    <Card.Title
                      style={{alignSelf: 'flex-start', fontSize: 24}}
                      selectionColor="#fff">
                      Price Index
                    </Card.Title>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <TitleDetailItem
                          title={'Floor:'}
                          detail={'7th Floor'}
                        />
                        <TitleDetailItem
                          title={'Size:'}
                          detail={'1020 sq. ft.'}
                        />
                        <TitleDetailItem
                          title={'Price:'}
                          detail={'9,068,210 PKR'}
                        />
                      </View>
                      <View style={{flex: 1}}>
                        <TitleDetailItem
                          title={'Unit No:'}
                          detail={'FC - 335'}
                        />
                        <TitleDetailItem
                          title={'Pur Rate:'}
                          detail={'9000 sq. ft.'}
                        />
                        <TitleDetailItem
                          title={'Sold Date:'}
                          detail={'09/12/2021'}
                        />
                      </View>
                    </View>
                  </Card>

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

                        backgroundColor: 'white',
                        borderColor: Color.grey,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: '600',
                        }}>
                        Payment Details
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          toggle: false,
                        })
                      }
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
                        Filters
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{margin: 15}}>
                    <TitleDetailItem
                      title={'Total Amount:'}
                      detail={'1 core, 1 lakh, 60 thousand ruppes'}
                    />
                    <TitleDetailItem
                      title={'Total Paid:'}
                      detail={'38 core, 1 lakh, 60 thousand ruppes'}
                    />
                    <TitleDetailItem
                      title={'Total Left:'}
                      detail={'29 core, 1 lakh, 6 thousand and 50 ruppes'}
                    />
                  </View>
                  <Bar />
                  <View style={{margin: 15}}>
                    <Button
                      title={'View Payment Plan'}
                      raised={true}
                      iconRight={true}
                      buttonStyle={{backgroundColor: '#f0f0f0'}}
                      titleStyle={{color: '#000'}}
                      style={{margin: 15}}
                      icon={
                        <Icon
                          name={'arrow-right'}
                          type="material-community"
                          color={'#000'}
                          iconStyle={{marginLeft: 10}}
                        />
                      }
                    />
                  </View>
                  <View style={{margin: 15}}>
                    <Button
                      title={'View Paid Instalments'}
                      raised={true}
                      iconRight={true}
                      buttonStyle={{backgroundColor: '#f0f0f0'}}
                      titleStyle={{color: '#000'}}
                      style={{margin: 15}}
                      icon={
                        <Icon
                          name={'arrow-right'}
                          type="material-community"
                          color={'#000'}
                          iconStyle={{marginLeft: 10}}
                        />
                      }
                    />
                  </View>
                </>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

function TitleDetailItem({title, detail}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 14,
        }}>
        {title}
      </Text>

      <Text
        style={{
          textAlign: 'center',
          marginHorizontal: 10,
          color: Color.TextLight,
          fontSize: 13,
        }}>
        {detail}
      </Text>
    </View>
  );
}

function Bar() {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 15,
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 0.38,
          backgroundColor: Color.green,
          height: 30,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
          }}>
          {'38% Paid'}
        </Text>
      </View>

      <View
        style={{
          flex: 0.68,
          backgroundColor: Color.blue1,
          height: 30,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'left',
            marginStart: 25,
          }}>
          {'62% Paid'}
        </Text>
      </View>
    </View>
  );
}
