import ListItem from "./ListItem";
import { StyleSheet, Modal, View, TextInput, Button, Text, FlatList } from "react-native";
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
            <TextInput style={styles.inputField} placeholder='Your new item!' onChangeText={itemInputHandler} value={enteredListItem} />
            <View style={styles.entireView}>
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

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 8,
        marginTop: 12,
        marginBottom: 12
    },
    entireView: {
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 16
    }
})