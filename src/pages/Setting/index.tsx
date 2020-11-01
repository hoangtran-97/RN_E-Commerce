import React, { useContext } from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";

import { ColorSwitcher } from "../../Components/ColorSwitcher";
import SettingGoogleSignin from "../../Components/SettingGoogleSignin";
import { ThemeContext } from "../../context";

export const Setting = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.foreground,
            }}>
            <SettingGoogleSignin />
            <ColorSwitcher />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        paddingVertical: 40,
    },
});
