import { View, Pressable, Text } from "react-native";


function ListListItem(props) {
    return (
        <View>
            <Pressable onPress={props.onOpenList.bind(this, props)}>
                <Text>
                    {props.text}
                </Text>
            </Pressable>
        </View>
    );
}

export default ListListItem;