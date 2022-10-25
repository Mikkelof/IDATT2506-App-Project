import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ListItem from './components/ListItem';
import ListList from './components/ListList';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [listItems, setListItems] = useState([]);
  const [listTitles, setListTitles] = useState([]);

  function startListHandler() {
    setModalIsVisible(true);
  }

  function endListHandler() {
    setModalIsVisible(false);
  }

  //To add an item to an existing list
  function addListItemHandler(enteredListItemText) {
    setListItems((currentListItems) => [...currentListItems, {text: enteredListText, id: Math.random().toString()}]);
  };

  //To add a new list to the list-overview
  function addListTitleHandler(enteredListTitleText) {
    setListTitles((currentListTitles) => [...currentListTitles, {text: enteredListTitleText, id: Math.random().toString()}]);
    //endListHandler();   //Burde åpne listen som ble laget
  };

  function openList() {
    setModalIsVisible(false);         //DENNE SKAL ENDRES
  }

  return (
    <View style={styles.container}>
      <Button title='Lists' onPress={startListHandler} />
      <ListList visible={modalIsVisible} onOpenList={openList} titles={listTitles} onAddList={addListTitleHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
