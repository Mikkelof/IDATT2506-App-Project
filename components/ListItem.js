import { View, Pressable, Text } from "react-native";


function ListItem(props) {
    return (
        <View>
            <Pressable>
                <Text>
                    {props.text}
                </Text>
            </Pressable>
        </View>
    );
}

export default ListItem;