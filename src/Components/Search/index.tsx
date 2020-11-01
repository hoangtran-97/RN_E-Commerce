import React, { useContext } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { SearchProps } from "../../typings";
import { ThemeContext } from "../../context";

export const Search = ({ setQuery, query }: SearchProps) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View
            style={{ ...styles.container, backgroundColor: theme.foreground }}>
            <FontAwesome5
                name="search"
                size={20}
                style={{ ...styles.icon, color: theme.text }}
            />
            <TextInput
                placeholder="Search product..."
                style={{ ...styles.search, color: theme.text }}
                placeholderTextColor={theme.text}
                value={query}
                onChangeText={(text) => setQuery(text)}
            />
            {query.length > 0 && (
                <Pressable onPress={() => setQuery("")}>
                    <FontAwesome
                        name="close"
                        size={20}
                        style={{ ...styles.icon, color: theme.text }}
                    />
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    },
    icon: {
        marginHorizontal: 20,
    },
});
