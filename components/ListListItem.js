import { View, Pressable, Text } from "react-native";


function ListListItem(props) {
    return (
        <View>
            <Pressable onPress={props.onOpenList.bind(this, props.id)}>
                <Text>
                    {props.text}
                </Text>
            </Pressable>
        </View>
    );
}

export default ListListItem;