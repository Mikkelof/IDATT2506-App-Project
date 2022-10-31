import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ListList from './components/ListList';
import ItemList from './components/ItemList';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(true);
  //The initial value gets the current items from items.json and loads them into the app. Only fetched on initialization
  const [listItems, setListItems] = useState(async () => {
    const itemsFilename = FileSystem.documentDirectory + "items.json";
    try {
      const itemsJson = await FileSystem.readAsStringAsync(itemsFilename);
      const items = JSON.parse(itemsJson);
      setListItems(items);
      return items;
    } catch(e) {
      console.log(e);
    }
  });
  //The initial value gets the current titles from titles.json and loads them into the app. Only fetched on initialization
  const [listTitles, setListTitles] = useState(async () => {
    const titlesFilename = FileSystem.documentDirectory + "titles.json";
    try {
      const titlesJson = await FileSystem.readAsStringAsync(titlesFilename);
      const titles = JSON.parse(titlesJson);
      setListTitles(titles);
      return titles;
    } catch(e) {
      console.log(e);
    }
  });
  const [currentListItems, setCurrentListItems] = useState([]);
  const [currentListId, setCurrentListId] = useState();
  const [currentTitle, setCurrentTitle] = useState('');

  //Hides/shows the list-overview
  function startListHandler() {
    setModalIsVisible(true);
  }

  //Updates the items displayed by creating and displaying a filtered list with just the items belonging to a certain listId
  useEffect(() => {
    if(typeof currentListId !== "undefined") {
      setCurrentListItems(getFilteredList(currentListId));
    }
  }, [currentListId, listItems, listTitles])

  //Updates the items.json file each time listItems or currentListItems are changed
  useEffect(() => {
    const itemsFilename = FileSystem.documentDirectory + "items.json";
    FileSystem.writeAsStringAsync(itemsFilename, JSON.stringify(listItems));
  }, [listItems, currentListItems])

  //Updates the titles.json file each time listTitles are changed
  useEffect(() => {
    const titlesFilename = FileSystem.documentDirectory + "titles.json";
    FileSystem.writeAsStringAsync(titlesFilename, JSON.stringify(listTitles));
  }, [listTitles])

  //To add an item to an existing list
  function addListItemHandler(enteredListItemText) {
    setListItems((currentListItems) => [...currentListItems, {text: enteredListItemText, id: Math.random().toString(), parentid: currentListId, done: false}]);
  }

  //To add a new list to the list-overview
  function addListTitleHandler(enteredListTitleText) {
    setListTitles((currentListTitles) => [...currentListTitles, {text: enteredListTitleText, id: Math.random().toString()}]);
  }

  //Creates the filtered list only containing the items belonging to the list that is currently open
  function getFilteredList(id) {
    var tempArray = listItems.filter((item) => item.parentid == id);
    return tempArray;
  }

  //Opens a list by setting the listId so the correct items can be displayed, setting the title to 
  //the list title and hiding the list-overview
  function openList(list) {
    setCurrentListId(list.id);
    setCurrentTitle(list.text);
    setModalIsVisible(false);
  }

  //Deletes an entire list, including all the items belonging to the list
  function deleteList(list) {
    setListTitles(listTitles => {
      return listTitles.filter((otherList) => otherList.id !== list.id);
    })
    setListItems(listItems => {
      return listItems.filter((item) => item.parentid !== list.id);
    })
  }

  //Marks an item as done
  function markDone(id) {
    listItems.forEach(item => {if (item.id === id) {
      item.done = true;
    }})
    setCurrentListItems(getFilteredList(currentListId));
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.listsAndTitle}>
        <Text style={styles.title}>{currentTitle}</Text>
        <Button title='Lists' onPress={startListHandler} />
      </View>
      <View >
        <ItemList items={currentListItems} onAddItem={addListItemHandler} onMarkDone={markDone} />
      </View>
      <ListList visible={modalIsVisible} onOpenList={openList} titles={listTitles} onAddList={addListTitleHandler} onDeleteList={deleteList} />
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
