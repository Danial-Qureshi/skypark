import React, {useState} from "react";
import {FlatList, Modal, SafeAreaView, View, TouchableOpacity, Text} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import globals from '../../common/globals';


const CategoryModal = ({data,isVisible, setVisibility, selectedItem}) => {

    const dataa = ['All',...data];

    return (
        <Modal

            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                setVisibility(false)
            }}>


            <View style={{
                flex: 1, flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'rgba(52,52,52,0.61)',
                paddingHorizontal: 30,


            }}>

                <View style={{backgroundColor: "#fff", borderRadius: 5, paddingBottom: 15}}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: globals.theme_color,
                        justifyContent: 'space-between',
                        marginBottom: 20,
                        borderTopRightRadius: 5,
                        borderTopLeftRadius: 5
                    }}>
                        <Text style={{
                            alignSelf: 'center',
                            color: '#fff',
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingVertical: 10,
                            paddingHorizontal: 5,
                            marginLeft: 10
                        }}>Select Color</Text>
                        <Ionicons name={'close'} onPress={() => {
                            setVisibility(false)
                        }} style={{alignSelf: 'center', paddingHorizontal: 5, marginRight: 5}} size={24} color={'white'}/>

                    </View>
                    <FlatList
                        data={dataa}
                        renderItem={({item}) => {

                            return (
                                <TouchableOpacity style={{
                                    flex: 1,
                                    alignSelf: 'center',
                                    marginTop: 5,
                                    backgroundColor: '#fff',
                                    width: '90%',
                                    borderWidth: 0.5,
                                    borderRadius: 5,
                                    borderColor: "#000"
                                }} onPress={() => {
                                    selectedItem(item)

                                }}>

                                    <Text style={{
                                        alignSelf: 'center',
                                        color: '#000',
                                        fontSize: 16,
                                        paddingVertical: 10
                                    }}>{item}</Text>

                                </TouchableOpacity>

                            )

                        }}

                    />

                </View>
            </View>

        </Modal>
    )
}

export default CategoryModal;
