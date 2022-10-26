import { Modal, View, TextInput, Button, Text, FlatList } from "react-native";
import { useState } from 'react';
import ListListItem from "./ListListItem";


function ListList(props) {
    const [enteredListTitle, setEnteredListTitle] = useState('');

    function listInputHandler(enteredText) {
        setEnteredListTitle(enteredText);
    };

    function addListHandler() {
        props.onAddList(enteredListTitle);
        setEnteredListTitle('');
    }

    function openList() {
        props.onOpenList()
    }

    return (
        <Modal visible={props.visible} animationType="slide" >
            <View>
                <TextInput placeholder='Your new list!' onChangeText={listInputHandler} value={enteredListTitle} />
                <View>
                    <Button title="Add list" onPress={addListHandler} />
                </View>
                <View>
                    <FlatList data={props.titles} renderItem={(itemData) => {
                        return <ListListItem text={itemData.item.text} id={itemData.id} onOpenList={openList} />
                    }} />
                </View>
            </View>
        </Modal>
    )
}

export default ListList;