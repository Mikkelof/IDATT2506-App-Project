import { View, StyleSheet, Pressable, Text } from "react-native";


function ListItem(props) {
    return (
        <View style={styles.listItem}>
            <Pressable android_ripple={{ color: '#210644' }}>
                <Text>
                    {props.text}
                </Text>
            </Pressable>
        </View>
    );
}

export default ListItem;

const styles = StyleSheet.create({
    listItem: {
      margin: 8,
      borderBottomColor: '#cccccc',
      borderBottomWidth: 1
    }
});