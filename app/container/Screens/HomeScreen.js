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
} from 'react-native';
import globals from '../../common/globals';
import {scale} from '../../ScalingUtils';
import {connect} from 'react-redux';
import PureChart from 'react-native-pure-chart';

import {fetchCategories} from '../../redux/products/operations';
import {ActivityIndicator} from 'react-native-paper';
import {Header, Card, Text, Icon} from 'react-native-elements';
import Color from '../../common/Color';
import {ScrollView} from 'react-native-gesture-handler';

const mapStateToProps = ({user, app, products}) => ({
  user,
  language: app.language,
  products: products,
  isFetching: products.isFetching,
});

@connect(mapStateToProps, {fetchCategories})
class HomeScreen extends Component {
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
            source={require('../../Images/property.jpeg')}>
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
            <ScrollView>
              <>
                <Card>
                  <Card.Title
                    style={{alignSelf: 'flex-start', fontSize: 24}}
                    selectionColor="#fff">
                    Price Index
                  </Card.Title>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        marginBottom: 10,
                        textAlign: 'left',
                        color: Color.grey,
                      }}>
                      41 Food Court Units
                    </Text>
                    <Text
                      style={{
                        marginBottom: 10,
                        textAlign: 'left',
                      }}>
                      - 4 Unit Left
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 5,
                      padding: 5,
                      backgroundColor: Color.lightgrey,
                    }}>
                    <View
                      style={{
                        padding: 3,
                        backgroundColor: 'white',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                        }}>
                        Food Court Shops
                      </Text>
                    </View>
                    <View
                      style={{
                        padding: 3,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: Color.grey,
                          marginLeft: 5,
                        }}>
                        Res Appertment
                      </Text>
                    </View>
                    <View
                      style={{
                        padding: 3,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: Color.grey,
                          marginLeft: 5,
                        }}>
                        Retail Shop
                      </Text>
                    </View>
                  </View>

                  <Card.Divider />

                  <PureChart
                    data={this.state.sampleData}
                    width={'100%'}
                    height={200}
                    type="bar"
                  />
                </Card>

                <View>
                  <Text h4 style={{margin: 12}}>
                    Construction Progress
                  </Text>

                  <FlatList
                    data={this.state.features}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => this.renderCat(item, true)}
                    keyExtractor={item => item.categoryId}
                  />
                </View>

                <View>
                  <Text h4 style={{margin: 12}}>
                    Project Pictures
                  </Text>

                  <FlatList
                    data={this.state.features}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => this.renderCat(item)}
                    keyExtractor={item => item.categoryId}
                  />
                </View>
                {/* <View>
                <Text h4 style={{margin: 12}}>
                  Featured Products
                </Text>

                <FlatList
                  data={this.state.features}
                  pagingEnabled={true}
                  numColumns={2}
                  showsHorizontalScrollIndicator={false}
                  legacyImplementation={false}
                  renderItem={({item}) => this.renderFeatures(item)}
                  keyExtractor={item => item.id}
                />
              </View> */}
              </>
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}

export default HomeScreen;

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
