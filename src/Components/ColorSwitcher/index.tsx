import React, { useContext, useState, useRef } from "react";
import { Button, Animated, Easing, Text } from "react-native";
// import Animated, { Easing } from "react-native-reanimated";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { ThemeContext } from "../../context";

export const ColorSwitcher = () => {
    const { switchTheme } = useContext(ThemeContext);
    const [spinning, setSpinning] = useState(false);
    const spinValue = useRef(new Animated.Value(0)).current;
    // Animated.timing(spinValue, {
    //     toValue: spinning ? 1 : 0,
    //     duration: 300,
    //     easing: Easing.linear, // Easing is an additional import from react-native
    //     useNativeDriver: true,
    // }).start();
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });
    const spinIn = () => {
        Animated.timing(spinValue, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear, // Easing is an additional import from react-native
            useNativeDriver: true,
        }).start();
    };

    const spinOut = () => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear, // Easing is an additional import from react-native
            useNativeDriver: true,
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
                <FontAwesome5 name="moon" size={50} />
            </Animated.View>
            <Text>{spinning ? "spinIN" : "spinOut"}</Text>
            <Button
                onPress={() => {
                    animation();
                    switchTheme();
                }}
                title="Swith theme"
                color="#5AC8FA"
            />
        </>
    );
};
