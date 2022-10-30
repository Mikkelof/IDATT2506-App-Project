import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ListList from './components/ListList';
import ItemList from './components/ItemList';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [listItems, setListItems] = useState(async () => {
    const itemsFilename = FileSystem.documentDirectory + "items.json";
    try {
      const itemsJson = await FileSystem.readAsStringAsync(itemsFilename);
      const items = JSON.parse(itemsJson);
      // for(var i in items) {
      //   itemList.push([i, items[i]]);
      // }
      setListItems(items);
      return items;
    } catch(e) {
      console.log(e);
    }
  });
  const [listTitles, setListTitles] = useState(async () => {
    const titlesFilename = FileSystem.documentDirectory + "titles.json";
    try {
      const titlesJson = await FileSystem.readAsStringAsync(titlesFilename);
      const titles = JSON.parse(titlesJson);
      // for(var i in titles) {
      //   titleList.push([i, titles[i]]);
      // }
      setListTitles(titles);
      return titles;
    } catch(e) {
      console.log(e);
    }
  });
  const [currentListItems, setCurrentListItems] = useState([]);
  const [currentListId, setCurrentListId] = useState();
  const [currentTitle, setCurrentTitle] = useState('');

  function startListHandler() {
    setModalIsVisible(true);
  }

  useEffect(() => {
    if(typeof currentListId !== "undefined") {
      setCurrentListItems(getFilteredList(currentListId));
    }
  }, [currentListId, listItems, listTitles])

  useEffect(() => {
    const itemsFilename = FileSystem.documentDirectory + "items.json";
    FileSystem.writeAsStringAsync(itemsFilename, JSON.stringify(listItems));
  }, [listItems, currentListItems])

  useEffect(() => {
    const titlesFilename = FileSystem.documentDirectory + "titles.json";
    FileSystem.writeAsStringAsync(titlesFilename, JSON.stringify(listTitles));
  }, [listTitles])

  // useEffect(() => {
  //   fetchItems();
  //   fetchTitles();
  //   console.log(Array.isArray(oldItems));
  //   setListItems(oldItems);
  //   setListTitles(oldTitles);
  // }, [])

  // async function fetchItems() {
  //   const itemsFilename = FileSystem.documentDirectory + "items.json";
  //   try {
  //     const itemList = [];
  //     const itemsJson = await FileSystem.readAsStringAsync(itemsFilename);
  //     const items = JSON.parse(itemsJson);
  //     console.log(items);
  //     for(var i in items) {
  //       itemList.push([i, items[i]]);
  //       console.log(itemList.length);
  //     }
  //     setListItems(itemList);
  //     console.log(Array.isArray(itemList));
  //     return itemList;
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  // async function fetchTitles() {
  //   const titlesFilename = FileSystem.documentDirectory + "titles.json";
  //   try {
  //     var titleList = [];
  //     const titlesJson = await FileSystem.readAsStringAsync(titlesFilename);
  //     const titles = JSON.parse(titlesJson);
  //     console.log(titles)
  //     for(var i in titles) {
  //       titleList.push([i, titles[i]]);
  //       console.log(titleList.length);
  //     }
  //     setListTitles(titleList);
  //     console.log(titlesJson)
  //     console.log(Array.isArray(titleList));
  //     return titleList;
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  //To add an item to an existing list
  function addListItemHandler(enteredListItemText) {
    setListItems((currentListItems) => [...currentListItems, {text: enteredListItemText, id: Math.random().toString(), parentid: currentListId, done: false}]);
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

  function deleteList(list) {
    setListTitles(listTitles => {
      return listTitles.filter((otherList) => otherList.id !== list.id)
    })
    setListItems(listItems => {
      return listItems.filter((item) => item.parentid !== list.id)
    })
  }

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
