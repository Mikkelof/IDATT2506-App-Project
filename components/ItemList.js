import ListItem from "./ListItem";
import { Modal, View, TextInput, Button, Text, FlatList } from "react-native";
import { useState } from 'react';

function ItemList(props) {
    const [enteredListItem, setEnteredListItem] = useState('');

    function itemInputHandler(enteredText) {
        setEnteredListItem(enteredText);
    }

    function addItemHandler() {
        props.onAddItem(enteredListItem);
        setEnteredListItem('');
    }

    return (
        <View>
            <TextInput placeholder='Your new item!' onChangeText={itemInputHandler} value={enteredListItem} />
            <View>
                <Button title='Add item' onPress={addItemHandler} />
            </View>
            <View>
                <FlatList data={props.items} renderItem={(itemData) => {
                    return <ListItem text={itemData.item.text} id={itemData.item.id} />
                }} />
            </View>
        </View>
    )
}

export default ItemList;