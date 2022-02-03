import React from "react";
import {View, Modal, SafeAreaView} from "react-native"
import SearchableDropdown from 'react-native-searchable-dropdown'

const SearchableListDropDown = ({isVisible, setVisibility, list, selectedItem}) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={() => {
                setVisibility(false)
            }}>
            <SafeAreaView style={{flex: 1}}>
                <SearchableDropdown
                    multi={false}

                    onItemSelect={(item) => {
                        selectedItem(item)
                    }}
                    containerStyle={{padding: 0, margin: 10}}

                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ffffff',
                        borderColor: '#bbb',
                        borderBottomWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{color: '#222'}}

                    items={list}

                    textInputProps={
                        {
                            placeholder: "Search",
                            underlineColorAndroid: "transparent",
                            autoFocus: true,
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                            }
                        }
                    }

                />
            </SafeAreaView>
        </Modal>
    )
}

export default SearchableListDropDown;
