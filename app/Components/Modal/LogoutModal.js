import React, {useState} from 'react';
import {FlatList, Modal, SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import globals from '../../common/globals';
import ButtonComponent from '../../Components/ButtonComponent';


const LogoutModal = ({isVisible, setVisibility, onPressYes, onPressNo}) => {


    return (
        <Modal
            animationType="slide"
            onRequestClose={setVisibility}
            transparent={true}
            visible={isVisible}>


            <View style={{
                flex: 1, flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'rgba(21,20,20,0.8)',

            }}>
                <View style={{
                    marginHorizontal: 40,
                    paddingVertical: 20,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    paddingBottom: 20,
                }}>


                    <Octicons onPress={() => {

                    }} style={{margin: 20, marginBottom: 10, alignSelf: 'center'}} name={'sign-out'} color={'#676767'}
                              size={25}/>


                    <Text style={{fontSize: 14, textAlign: 'center', marginVertical: 5}}>Are You sure you want
                        to </Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: globals.theme_color,
                    }}>Logout?</Text>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginHorizontal: 30,
                        marginTop: 20,
                    }}>

                        <ButtonComponent onPress={onPressNo} title={'No'}
                                         extrastyle={{width: '30%', backgroundColor: 'white'}}
                                         extraTextStyle={{color: 'black', fontSize: 12}}/>


                        <ButtonComponent onPress={onPressYes} title={'Yes'} extrastyle={{
                            width: '30%',
                            backgroundColor: globals.theme_color,
                        }} extraTextStyle={{color: '#fff', fontSize: 12}}/>

                    </View>


                </View>
            </View>
        </Modal>
    );
};

export default LogoutModal;
