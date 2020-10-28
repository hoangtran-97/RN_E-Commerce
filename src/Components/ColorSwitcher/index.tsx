import React, { useContext } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { ThemeContext } from "../../context";

export const ColorSwitcher = () => {
    const { theme, switchTheme } = useContext(ThemeContext);
    return (
        <Pressable onPress={switchTheme}>
            <MaterialCommunityIcons
                name="moon-last-quarter"
                size={50}
                color={theme.foreground}
            />
        </Pressable>
        // <Pressable
        //     onPress={() => {
        //         console.log("test");
        //     }}
        //     style={({ pressed }) => [
        //         {
        //             backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
        //         },
        //         styles.wrapperCustom,
        //     ]}>
        //     {({ pressed }) => (
        //         <Text style={styles.text}>
        //             {pressed ? "Pressed!" : "Press Me"}
        //         </Text>
        //     )}
        // </Pressable>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6,
    },
    logBox: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#f0f0f0",
        backgroundColor: "#f9f9f9",
    },
});
