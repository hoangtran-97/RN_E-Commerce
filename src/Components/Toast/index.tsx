import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "react-native";
import { useToast } from "react-native-styled-toast";

import { AppState } from "../../typings";

export const ToastMessageRedux = () => {
    const toastState = useSelector((state: AppState) => state.ui.toast);
    // const { clearMessages } = useDispatch<Dispatch>().global;
    const { message, intent } = toastState;
    console.log("toasted");

    const { toast } = useToast();
    useEffect(() => {
        if (message) {
            toast({ message, intent });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);
    return <View />;
};
