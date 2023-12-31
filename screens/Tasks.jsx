import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AddItem from '../todoComps/AddItem';
import ListItems from '../todoComps/ListItems';
import { v4 as uuidv4 } from 'uuid';
import { StyleSheet, Text, View } from 'react-native';

export default function Tasks() {
  const [list, setList] = useState([]);
  const addItem = (text) => {
  const newItem = {
    id: uuidv4(),
    task: text
  };
    setList([newItem, ...list]);
  };

  const DeleteItem = (id) => {
  const newList = list.filter((item) => item.id !== id);
  setList(newList);
  };
  return (
  <View style={styles.container}>
    <AddItem addItem={addItem}></AddItem>
    <ListItems deleteItem={DeleteItem} listItems={list}></ListItems>
    <StatusBar style="auto" />
  </View>
  );
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 70
},
});