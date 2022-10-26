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
  const [currentTitle, setCurrentTitle] = useState('');

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
    var tempArray = listItems.filter((item) => item.parentid == id);
    return tempArray
  }

  function openList(list) {
    setCurrentListId(list.id);
    setCurrentTitle(list.text);
    setModalIsVisible(false);
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.listsAndTitle}>
        <Text style={styles.title}>{currentTitle}</Text>
        <Button title='Lists' onPress={startListHandler} />
      </View>
      <View >
        <ItemList items={currentListItems} onAddItem={addListItemHandler} />
      </View>
      <ListList visible={modalIsVisible} onOpenList={openList} titles={listTitles} onAddList={addListTitleHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16
  },
  listsAndTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30
  }
});
