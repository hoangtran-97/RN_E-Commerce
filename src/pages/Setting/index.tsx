import React from "react";
import { Text, SafeAreaView } from "react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-community/google-signin";

import { ColorSwitcher } from "../../Components/ColorSwitcher";

export const Setting = () => {
    GoogleSignin.configure({
        iosClientId:
            "676751270206-uuto9uma4dr52fu4k95dg0kpt6b5701j.apps.googleusercontent.com", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    const signinGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    return (
        <>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signinGoogle}
            />
            <ColorSwitcher />
        </>
    );
};
