import React, { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { ThemeContext } from "../../context";

export const ColorSwitcher = () => {
    const { theme, switchTheme } = useContext(ThemeContext);
    return (
        <Pressable onPress={switchTheme} style={styles.container}>
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
    container: {},
});
