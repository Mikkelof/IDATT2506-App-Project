import { View, StyleSheet, Pressable, Text, Image } from "react-native";


function ListListItem(props) {
    return (
        <View style={styles.listItem}>
            <Pressable android_ripple={{ color: '#c3cbd9' }} onPress={props.onOpenList.bind(this, props)}>
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </Pressable>
            <Pressable android_ripple={{ color: '#c3cbd9' }} onPress={props.onDeleteList.bind(this, props)} >
                <Image source={require('../assets/images/delete.png')} style={styles.image} />
            </Pressable>
        </View>
    );
}

export default ListListItem;

const styles = StyleSheet.create({
    listItem: {
      margin: 8,
      borderBottomColor: '#cccccc',
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    text: {
        fontSize: 18
    },
    image: {
        width: 25,
        height: 25,
        margin: 2
    }
});