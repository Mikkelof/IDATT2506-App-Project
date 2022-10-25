import { Modal, View, TextInput, Button, Text, FlatList } from "react-native";
import { useState } from 'react';
import ListItem from "./ListItem";


function ListList(props) {
    const [enteredListTitle, setEnteredListTitle] = useState('');

    function listInputHandler(enteredText) {
        setEnteredListTitle(enteredText);
    };

    function addListHandler() {
        props.onAddList(enteredListTitle);
        setEnteredListTitle('');
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
                        return <Text>{itemData.item.text}</Text>
                        //<ListItem text={itemData.text} id={itemData.id} />
                    }} />
                </View>
            </View>
        </Modal>
    )
}

export default ListList;