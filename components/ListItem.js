import { View, StyleSheet, Pressable, Text } from "react-native";


function ListItem(props) {
    return (
        <View style={styles.listItem}>
            <Pressable android_ripple={{ color: '#c3cbd9' }} onPress={props.onMarkDone.bind(this, props.id)}>
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