import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ListList from './components/ListList';
import ItemList from './components/ItemList';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [listItems, setListItems] = useState([]);
  const [listTitles, setListTitles] = useState([]);
  const [currentListItems, setCurrentListItems] = useState([]);
  const [currentListId, setCurrentListId] = useState();

  function startListHandler() {
    setModalIsVisible(true);
  }

  useEffect(() => {
    setCurrentListItems(getFilteredList(currentListId));
  }, [currentListId, listItems])

  //To add an item to an existing list
  function addListItemHandler(enteredListItemText) {
    setListItems((currentListItems) => [...currentListItems, {text: enteredListItemText, id: Math.random().toString(), parentid: currentListId}]);
  }

  //To add a new list to the list-overview
  function addListTitleHandler(enteredListTitleText) {
    setListTitles((currentListTitles) => [...currentListTitles, {text: enteredListTitleText, id: Math.random().toString()}]);
  }

  function getFilteredList(id) {
    //listItems.forEach((item) => console.log(item.parentid))
    var tempArray = listItems.filter((item) => item.parentid == id);
    return tempArray
  }

  function openList(id) {
    setCurrentListId(id);
    setModalIsVisible(false);
  }

  return (
    <View>
      <Button title='Lists' onPress={startListHandler} />
      <ItemList items={currentListItems} onAddItem={addListItemHandler} />
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
