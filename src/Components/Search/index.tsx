import React, { useContext } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { ThemeContext } from "../../context";

export const Search = () => {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.foreground,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        search: {
            flex: 1,
            height: 50,
            color: theme.text,
        },
        icon: {
            color: theme.text,
            marginHorizontal: 10,
        },
    });

    return (
        <View style={styles.container}>
            <FontAwesome5 name="search" size={25} style={styles.icon} />
            <TextInput
                placeholder="Search product..."
                style={styles.search}
                placeholderTextColor={theme.text}
            />
            <Pressable>
                <FontAwesome name="close" size={25} style={styles.icon} />
            </Pressable>
        </View>
    );
};
