import React, { useContext } from "react";
import { Button } from "react-native";

import { ThemeContext } from "../../context";

export const ColorSwitcher = () => {
    const { switchTheme } = useContext(ThemeContext);
    return <Button onPress={switchTheme} title="Swith theme" />;
};
