import { Modal, StyleSheet, View, TextInput, Button, FlatList } from "react-native";
import { useState } from 'react';
import ListListItem from "./ListListItem";


function ListList(props) {
    const [enteredListTitle, setEnteredListTitle] = useState('');

    //Sets the entered text to the current list title
    function listInputHandler(enteredText) {
        setEnteredListTitle(enteredText);
    }

    //Calls the onAddList passed from the prop and empties the input field
    function addListHandler() {
        props.onAddList(enteredListTitle);
        setEnteredListTitle('');
    }

    //Calls the onOpenList passed from the prop with the pressed lists id
    function openList(id) {
        props.onOpenList(id);
    }

    //Calls the onDeleteList passed from the prop with the pressed lists id
    function deleteList(id) {
        props.onDeleteList(id);
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