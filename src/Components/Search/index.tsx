import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const Search = () => {
    return (
        <View style={styles.container}>
            <FontAwesome5 name="search" size={25} />
            <TextInput placeholder="Search product..." style={styles.search} />
            <Pressable>
                <FontAwesome name="close" size={20} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "green",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 5,
    },
    search: {
        width: 200,
        height: 50,
    },
});
