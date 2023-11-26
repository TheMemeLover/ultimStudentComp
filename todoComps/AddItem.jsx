import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function addItem(props) {
    const [item, setItem] = useState('');
        return (
            <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    borderBottomColor: 'rgba(0,0,0,0.4)',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    marginBottom: 15
                }}>
                <TextInput
                    onChangeText={(textVal) => {
                        setItem(textVal);
                    }}
                    placeholder='Add Task'
                    style={{
                        borderBottomColor: 'black',
                        backgroundColor: '#f4f4f4',
                        margin: 4,
                        height: 50,
                        width: '70%',
                        fontSize: 18,
                        paddingLeft: 10
                    }}
                    value={item}
                />
                <TouchableOpacity
                    onPress={() => {
                        props.addItem(item)
                        setItem('')
                    }}
                    style={{
                        backgroundColor: 'skyblue',
                        height: 50,
                        justifyContent: 'center',
                        width: 106,
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 10,
                        paddingLeft: '29%',
                        marginTop: 4
                    }}
                >
                    <Text style={{fontSize: 18, width: '100%'}}>Add</Text>
                </TouchableOpacity>
            </View>
    );
}