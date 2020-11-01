import React, { useContext, useState, useRef } from "react";
import { TouchableOpacity } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { ThemeContext } from "../../context";

export const ColorSwitcher = () => {
    const { switchTheme, theme } = useContext(ThemeContext);
    const [spinning, setSpinning] = useState(false);
    const spinValue = useRef(new Animated.Value(0)).current;

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 4],
    });
    const spinIn = () => {
        Animated.timing(spinValue, {
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
        }).start();
    };

    const spinOut = () => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
        }).start();
    };
    const animation = () => {
        if (spinning) {
            spinIn();
            setSpinning((prev) => !prev);
        } else {
            spinOut();
            setSpinning((prev) => !prev);
        }
    };

    return (
        <>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <TouchableOpacity
                    onPress={() => {
                        animation();
                        switchTheme();
                    }}>
                    <FontAwesome5
                        name="moon"
                        size={50}
                        color={theme.text}
                        solid
                    />
                </TouchableOpacity>
            </Animated.View>
            {/* <Button
                onPress={() => {
                    animation();
                    switchTheme();
                }}
                title="Swith theme"
                color="#5AC8FA"
            /> */}
        </>
    );
};
