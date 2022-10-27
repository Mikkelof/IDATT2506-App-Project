import { View, StyleSheet, Pressable, Text } from "react-native";


function ListListItem(props) {
    return (
        <View style={styles.listItem}>
            <Pressable android_ripple={{ color: '#c3cbd9' }} onPress={props.onOpenList.bind(this, props)}>
                <Text>
                    {props.text}
                </Text>
            </Pressable>
        </View>
    );
}

export default ListListItem;

const styles = StyleSheet.create({
    listItem: {
      margin: 8,
      borderBottomColor: '#cccccc',
      borderBottomWidth: 1
    }
});