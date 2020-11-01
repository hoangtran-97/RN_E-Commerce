import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";

import { ColorSwitcher } from "../../Components/ColorSwitcher";
import SettingGoogleSignin from "../../Components/SettingGoogleSignin";
import { ThemeContext } from "../../context";
import { AppState } from "../../typings";

export const Setting = () => {
    const { theme } = useContext(ThemeContext);
    const { currentUser, token } = useSelector((state: AppState) => state.user);
    const userIsSignedin = token.length > 0 ? true : false;
    console.log("signin status", userIsSignedin);

    return (
        <View
            style={{ ...styles.container, backgroundColor: theme.foreground }}>
            {!userIsSignedin ? (
                <SettingGoogleSignin />
            ) : (
                <View>
                    <Text>Test</Text>
                </View>
            )}
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
