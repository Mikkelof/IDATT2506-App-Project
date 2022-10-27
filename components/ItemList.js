import ListItem from "./ListItem";
import { StyleSheet, Modal, View, TextInput, Button, Text, FlatList } from "react-native";
import { useState, useEffect } from 'react';

function ItemList(props) {
    const [enteredListItem, setEnteredListItem] = useState('');
    const [ongoingList, setOngoingList] = useState([]);
    const [doneList, setDoneList] = useState([]);

    function itemInputHandler(enteredText) {
        setEnteredListItem(enteredText);
    }

    function addItemHandler() {
        props.onAddItem(enteredListItem);
        setEnteredListItem('');
    }

    useEffect(() => {
        setOngoingList(props.items.filter((item) => item.done === false));
        setDoneList(props.items.filter((item) => item.done === true));
    }, [props])

    function markDone(id) {
        props.onMarkDone(id);
    }

    return (
        <View>
            <TextInput style={styles.inputField} placeholder='Your new item!' onChangeText={itemInputHandler} value={enteredListItem} />
            <View style={styles.entireView}>
                <Button title='Add item' onPress={addItemHandler} />
            </View>
            <Text style={styles.text}>Ongoing</Text>
            <View>
                <FlatList data={ongoingList} renderItem={(itemData) => {
                    return <ListItem text={itemData.item.text} id={itemData.item.id} onMarkDone={markDone} />
                }} />
            </View>
            <Text style={styles.text}>Done</Text>
            <View>
                <FlatList data={doneList} renderItem={(itemData) => {
                    return <ListItem text={itemData.item.text} id={itemData.item.id} onMarkDone={markDone} />
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
    },
    text: {
        fontSize: 20
    }
})