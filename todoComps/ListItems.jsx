import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';

export default function ListItems(props) {
    return (
    <View>
        <FlatList
            data={props.listItems}
            renderItem={({ item }) => (
        <View style={{alignItems: 'center'}}>
            <TouchableOpacity
                style={{
                    padding: 15,
                    backgroundColor: '#f8f8f8',
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                    width: '90%',
                    marginTop: 5,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
            <Text style={{fontSize: 18}}>{item.task}</Text>

            <Button
                title="-"
                onPress={() => {
                    props.deleteItem(item.id);
                    
                }}
                style={{width: 10, backgroundColor: 'red'}}
            ></Button>
            </TouchableOpacity>
        </View>
        )}
        ></FlatList>
    </View>
    );
}