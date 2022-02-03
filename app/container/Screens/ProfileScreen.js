import React, {Component} from 'react';
import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import globals from '../../common/globals';
import {connect} from 'react-redux';
import ButtonComponent from '../../Components/ButtonComponent';
import {login} from '../../redux/operations';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mapStateToProps = ({user, app}) => ({
    user, app,
});


@connect(
    mapStateToProps,
    {login},
)


class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: this.props.user.userInfo?this.props.user.userInfo.phone:'',
            name: this.props.user.userInfo?this.props.user.userInfo.name:'',
            email: this.props.user.userInfo?this.props.user.userInfo.email:'',
            password: '',
        };

    }

    componentDidMount() {
        // alert(JSON.stringify(this.props.user.userInfo))
    }

    validation() {
        var check = false;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.email === '') {
            alert('Enter Email Address');
        } else if (reg.test(this.state.email.replace(/\s/g, '')) !== true) {
            alert('Enter Valid Email Address');
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
                username: this.state.email,
                password: this.state.password,
            };
            this.props.login(params).then((data) => {
                if (data) {
                    this.props.navigation.navigate('StoreMainScreen');
                }
            });
        }
    }


    render() {
        return (


                <View style={{flex: 1,backgroundColor: '#fff'}}>
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

                        <Text style={{
                            color: globals.theme_color,
                            fontSize: 28,
                            marginHorizontal: 20,
                            marginTop: 10,
                            marginBottom: 10,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                        }}>{'Profile'}</Text>
                    </View>
                    <ScrollView contentContainerStyle={{backgroundColor: '#fff'}}
                                style={{flex: 1, marginVertical: 10, marginHorizontal: 20}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate("PhoneVerification")
                        }}>
                        <TextInput
                            editable={false}
                            keyboardType={'phone-pad'}
                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image resizeMode={'cover'}
                                               source={require('../../Images/phone.png')}/>
                                    )}
                                />
                            }
                            placeholder={'Enter your Phone Number'}
                            label="Phone #"
                            style={{backgroundColor: '#fff', marginVertical: 10}}
                            value={this.state.phone}
                            mode={'outlined'}
                            theme={{colors: {primary: globals.theme_color}}}
                            onChangeText={(text) => this.setState({phone: text})}
                        />
                        </TouchableOpacity>
                        <TextInput
                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image resizeMode={'cover'}
                                               source={require('../../Images/user.png')}/>
                                    )}
                                />
                            }
                            placeholder={'Enter your Full Name'}
                            label="Full Name"
                            value={this.state.name}
                            mode={'outlined'}
                            style={{backgroundColor: '#fff', marginVertical: 10}}
                            theme={{colors: {primary: globals.theme_color}}}
                            onChangeText={(text) => this.setState({name: text})}
                        />
                        <TextInput
                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image resizeMode={'cover'}
                                               source={require('../../Images/email.png')}/>
                                    )}
                                />
                            }
                            placeholder={'Enter your Email ID'}
                            label="Email ID"
                            value={this.state.email}
                            mode={'outlined'}
                            style={{backgroundColor: '#fff', marginVertical: 10}}
                            theme={{colors: {primary: globals.theme_color}}}
                            onChangeText={(text) => this.setState({email: text})}
                        />
                        {/*<TextInput*/}

                        {/*    left={*/}
                        {/*        <TextInput.Icon*/}
                        {/*            name={() => (*/}
                        {/*                <Image resizeMode={'cover'}*/}
                        {/*                       source={require('../../Images/password.png')}/>*/}
                        {/*            )}*/}
                        {/*        />*/}
                        {/*    }*/}
                        {/*    placeholder={'Enter your Password'}*/}
                        {/*    secureTextEntry={true}*/}
                        {/*    label="Enter Password"*/}
                        {/*    style={{backgroundColor: '#fff', marginVertical: 10}}*/}
                        {/*    value={this.state.password}*/}
                        {/*    mode={'outlined'}*/}
                        {/*    theme={{colors: {primary: globals.theme_color}}}*/}
                        {/*    onChangeText={(text) => this.setState({password: text})}*/}
                        {/*/>*/}
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ChangePassword');
                        }} style={{marginBottom: 10, alignItems: 'center'}}>
                            <Text style={{
                                fontWeight: 'bold',
                                color: globals.theme_color,
                                marginRight: 5,
                            }}>{'Change Password?'}</Text>
                        </TouchableOpacity>

                        {this.props.user.isFetching ? <ActivityIndicator size={'large'} color={'red'}/> : null}

                        <ButtonComponent onPress={() => {
                            //this.loginFunction();
                        }} extrastyle={{
                            width: '90%',
                            alignSelf: 'center',
                            marginVertical: 20,
                            borderRadius: 40,
                            backgroundColor: globals.theme_color,
                        }} title={'SAVE'}/>


                    </ScrollView>

                </View>




        );
    }
}

export default ProfileScreen;

