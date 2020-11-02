import React from "react";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-community/google-signin";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { AppState } from "../../typings";
import { addToken, updateUser } from "../../redux/actions";
//TODO: ADD GOOGLE SIGNIN
const SettingGoogleSignin = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: AppState) => state.product.inCart);
    const list = useSelector((state: AppState) => state.product.list);
    GoogleSignin.configure({
        webClientId:
            "676751270206-squqjbl6r98dopd1r6uh14672cp9ckqv.apps.googleusercontent.com",
        iosClientId:
            "676751270206-uuto9uma4dr52fu4k95dg0kpt6b5701j.apps.googleusercontent.com", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    const signinGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);

            responseGoogle(userInfo);
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
    const responseGoogle = async (response: any) => {
        const res = await axios.post(
            "http://localhost:3001/api/v1/auth/googleTokenId",
            {
                id_token: response.idToken,
            },
        );
        if (res.status === 200) {
            dispatch(updateUser(res.data.user, res.data.token, cart, list));
            dispatch(addToken(res.data.token));
        }
    };
    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signinGoogle}
        />
    );
};

export default SettingGoogleSignin;
