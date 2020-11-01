import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet } from "react-native";

import { ColorSwitcher } from "../../Components/ColorSwitcher";
import SettingGoogleSignin from "../../Components/SettingGoogleSignin";
import { ThemeContext } from "../../context";
import { AppState } from "../../typings";

export const Setting = () => {
    const { theme } = useContext(ThemeContext);
    const { currentUser, token } = useSelector((state: AppState) => state.user);
    const { userName, email } = currentUser;
    const userIsSignedin = token.length > 0 ? true : false;
    const textStyle = { ...styles.text, color: theme.text };
    console.log("signin status", userIsSignedin);

    return (
        <View
            style={{ ...styles.container, backgroundColor: theme.foreground }}>
            {!userIsSignedin ? (
                <SettingGoogleSignin />
            ) : (
                <View>
                    <Text style={textStyle}>{userName}</Text>
                    <Text style={textStyle}>{email}</Text>
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
    text: { fontSize: 30, fontWeight: "700" },
});
