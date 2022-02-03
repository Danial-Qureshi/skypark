import React, {Component} from 'react';
import {ActivityIndicator, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import globals from '../../common/globals';
import {connect} from 'react-redux';
import ButtonComponent from '../../Components/ButtonComponent';
import {passwordUpdateByOTP} from '../../redux/operations';
import I18n from 'react-native-i18n';
import {TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AvatarIcon from 'react-native-paper/src/components/Avatar/AvatarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mapStateToProps = ({user, app}) => ({
    user, app,
});


@connect(
    mapStateToProps,
    {passwordUpdateByOTP},
)


class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            cPassword: '',

        };

    }

    validation() {
        var check = false;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.newPassword === '') {
            alert('Enter Password');
        } else if (this.state.cPassword !== this.state.newPassword) {
            alert('Password mismatched');
        } else {
            check = true;
        }
        return check;

    }

    resetPassword() {
        if (this.validation()) {
            let params = {
                code: this.props?.route?.params?.data?.otp_code,
                otp_id: this.props.user.otp_id,
                // merchant_id: globals.merchant_id,
                phone: this.props?.route?.params?.data?.phone,
                password: this.state.newPassword,
                password_confirmation:this.state.cPassword,
            };
            this.props.passwordUpdateByOTP(params).then((data) => {
                if (data) {
                    this.props.navigation.replace('LoginScreen');
                }
            });
        }
    }


    render() {
        return (


            <View style={{flex: 1, backgroundColor: '#fff'}}>
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
                    }}>{'Reset Password'}</Text>
                </View>
                <ScrollView contentContainerStyle={{backgroundColor: '#fff'}}
                            style={{flex: 1, marginVertical: 10, marginHorizontal: 20}}>

                    {/*<TextInput*/}

                    {/*    left={*/}
                    {/*        <TextInput.Icon*/}
                    {/*            name={() => (*/}
                    {/*                <Image resizeMode={'cover'}*/}
                    {/*                       source={require('../../Images/password.png')}/>*/}
                    {/*            )}*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*    placeholder={'Enter your previous password'}*/}
                    {/*    secureTextEntry={true}*/}
                    {/*    label="Previous Password"*/}
                    {/*    style={{backgroundColor: '#fff', marginVertical: 10}}*/}
                    {/*    value={this.state.oldPassword}*/}
                    {/*    mode={'outlined'}*/}
                    {/*    theme={{colors: {primary: globals.theme_color}}}*/}
                    {/*    onChangeText={(text) => this.setState({oldPassword: text})}*/}
                    {/*/>*/}
                    <TextInput

                        left={
                            <TextInput.Icon
                                name={() => (
                                    <Image resizeMode={'cover'}
                                           source={require('../../Images/password.png')}/>
                                )}
                            />
                        }
                        placeholder={'Enter your New password'}
                        secureTextEntry={true}
                        label="New Password"
                        style={{backgroundColor: '#fff', marginVertical: 10}}
                        value={this.state.newPassword}
                        mode={'outlined'}
                        theme={{colors: {primary: globals.theme_color}}}
                        onChangeText={(text) => this.setState({newPassword: text})}
                    />
                    <TextInput

                        left={
                            <TextInput.Icon
                                name={() => (
                                    <Image resizeMode={'cover'}
                                           source={require('../../Images/password.png')}/>
                                )}
                            />
                        }
                        placeholder={'Enter your password'}
                        secureTextEntry={true}
                        label="Confirm Password"
                        style={{backgroundColor: '#fff', marginVertical: 10}}
                        value={this.state.cPassword}
                        mode={'outlined'}
                        theme={{colors: {primary: globals.theme_color}}}
                        onChangeText={(text) => this.setState({cPassword: text})}
                    />


                    {this.props.user.isFetching ? <ActivityIndicator size={'large'} color={'red'}/> : null}

                    <ButtonComponent onPress={() => {
                        //this.loginFunction();
                        this.resetPassword();
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

export default ResetPasswordScreen;

