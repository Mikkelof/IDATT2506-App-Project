import { Modal, StyleSheet, View, TextInput, Button, Text, FlatList } from "react-native";
import { useState } from 'react';
import ListListItem from "./ListListItem";


function ListList(props) {
    const [enteredListTitle, setEnteredListTitle] = useState('');

    function listInputHandler(enteredText) {
        setEnteredListTitle(enteredText);
    }

    function addListHandler() {
        props.onAddList(enteredListTitle);
        setEnteredListTitle('');
    }

    function openList(id) {
        props.onOpenList(id)
    }

    function deleteList(id) {
        props.onDeleteList(id)
    }

    return (
        <Modal visible={props.visible} animationType="slide" >
            <View style={styles.entireView}>
                <TextInput style={styles.inputField} placeholder='Your new list!' onChangeText={listInputHandler} value={enteredListTitle} />
                <View style={styles.border}>
                    <Button title="Add list" onPress={addListHandler} />
                </View>
                <View>
                    <FlatList data={props.titles} renderItem={(itemData) => {
                        return <ListListItem text={itemData.item.text} id={itemData.item.id} onOpenList={openList} onDeleteList={deleteList} />
                    }} />
                </View>
            </View>
        </Modal>
    )
}

export default ListList;

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 8,
        marginTop: 12,
        marginBottom: 12
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 16
    },
    entireView: {
        paddingHorizontal: 16
    }
})