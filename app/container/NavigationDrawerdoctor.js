'use strict';

import React, {Component} from 'react';
import {AsyncStorage, Image, ScrollView, Text, TouchableOpacity, View, Dimensions, FlatList} from 'react-native';
import globals from '../common/globals';

var Screenwidth = Dimensions.get('window').width; //full width
var Screenheight = Dimensions.get('window').height;
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

class NavigationDrawerdoctor extends Component<Props> {

    constructor(props) {
        super(props);


        this.state = {
            leftdarwer:[
                {
                    id:1,
                    iconname:'card-sharp',
                    title:'DASHBOARD',
                    isSelect:false,
                    navigation:"Home"
                },
                {
                    id:2,
                    iconname:'calendar',
                    title:'MY APPOINTMENTS',
                    isSelect:false,
                    navigation:"Appointments"

                },
                {
                    id:3,
                    iconname:'person-add',
                    title:'My Patients',
                    isSelect:false,
                    navigation:"Chat"

                },
                {
                    id:4,
                    iconname:'people-sharp',
                    title:'ONLINE DOCTORS',
                    isSelect:false,
                    navigation:"Chat"
                },
                {
                    id:5,
                    iconname:'person',
                    title:'PROFILE',
                    isSelect:false,
                    navigation:"EditProfileDoc"
                },

                {
                    id:6,
                    iconname:'ios-help-circle',
                    title:'HELP',
                    isSelect:false,
                    navigation:"HelpDoc"

                },
                {
                    id:1,
                    iconname:'md-bulb',
                    title:"FQA's",
                    isSelect:false,
                    navigation:"FQAsScreenDoc"

                },
                {
                    id:7,
                    iconname:'md-settings',
                    title:'SETTING',
                    isSelect:false,
                    navigation:"DashboardScreen"

                },
                {
                    id:8,
                    iconname:'notifications',
                    title:'Subscription',
                    isSelect:false,
                    navigation:"SubscriptionScreen"

                },
                {
                    id:9,
                    iconname:'time',
                    title:'Slots',
                    isSelect:false,
                    navigation:"SlotsScreen"

                }
            ],
            user:{
                name:'',
                profile_pic:'',
            },
            loading: false,



        };

    }



    render() {
        return (
            <View style={styles.mainDrawerLayoutStyle}>


                <View style={{flexDirection: 'row', marginVertical: 20, alignItems: 'center',justifyContent: 'center'}}>
                    <Image resizeMode={"contain"} source={this.state.user.profile_pic?this.state.user.profile_pic:require('../Images/xoommdlogo.png')} style={{
                        height: 80,
                        width: '100%',
                        backgroundColor: 'white',
                        marginHorizontal: 20


                    }}/>

                </View>






                <FlatList
                    data={this.state.leftdarwer}
                    extraData={this.state}
                    renderItem={({item,index}) => (
                        <TouchableOpacity  onPress={() => {
                            this.props.navigation.navigate(item.navigation)
                            this.state.leftdarwer[index].isSelect = true;
                            // temp = this.state.leftdarwer.filter(x=>x.id===item.id && x.isSelect)
                            if (this.state.leftdarwer.filter(x=>x.id!==item.id && x.isSelect).length>0) {
                                var array=[]
                                for (let t of this.state.leftdarwer) {
                                    if (t.isSelect && t.id!=item.id){
                                        t.isSelect=false;
                                        array.push(t);
                                    }else {
                                        array.push(t)
                                    }
                                }
                                this.setState({leftdarwer:array})
                            }else {
                                this.setState({leftdarwer:this.state.leftdarwer})
                            }


                        }
                        }>
                            <View style={[styles.iconStyle, {backgroundColor:item.isSelect?globals.light_grey:'#fff'}]}>
                                <Ionicons   name={item.iconname}  color={globals.theme_color} size={25}/>
                                <Text style={styles.menuFontStyle}>{item.title}</Text>
                            </View>
                            <View style={{height:1,width:'100%',backgroundColor:"rgba(220,220,220,0.72)"}}></View>
                        </TouchableOpacity>


                    )
                    }

                />



            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    tabContainer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#1676d1',
        borderColor: '#FFFFFF',
        borderTopWidth: 0,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
    },
    mainHeaderViewStyle: {
        //flex:.10,
        width: parseInt(Screenwidth),
        height: Platform.OS == "android" ? 55 : 65,
        flexDirection: "row",
        alignItems: "center"
    },
    mainHeaderViewStyleCopy: {
        //flex:.10,
        width: parseInt(Screenwidth),
        height: (Platform.OS == 'android' ? 55 : 65),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    headerImage: {
        resizeMode: 'stretch',
        width: parseInt(Screenwidth),
        height: 55,
    },
    mainDrawerLayoutStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'

    },
    iconImageStyle: {
        height: 34,
        width: 34,
        resizeMode: 'stretch'
    },
    dividerStyle: {
        width: '100%',
        height: 1,
        resizeMode: 'stretch'
    },
    menuFontStyle: {
        fontSize: 15,
        color: globals.text_color,
        includeFontPadding: false,
        textAlignVertical: 'center',
        fontWeight:'bold',
        marginLeft: 15,
    },

    iconStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        marginHorizontal:10,
        margin: 5,
        paddingVertical:20
    }
}


export default NavigationDrawerdoctor;
