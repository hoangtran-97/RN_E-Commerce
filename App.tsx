import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider as ToastThemeProvider } from "styled-components";
import { ToastProvider } from "react-native-styled-toast";
import RNBootSplash from "react-native-bootsplash";
import { enableScreens } from "react-native-screens";

import makeStore from "./src/redux/store";
import { ThemeProvider } from "./src/context";
import { Navigation } from "./navigation";
import { ToastMessageRedux } from "./src/Components/Toast";
enableScreens();
const store = makeStore();
const theme = {
    space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
    colors: {
        text: "#0A0A0A",
        background: "#FFF",
        border: "#E2E8F0",
        muted: "#F0F1F3",
        success: "#7DBE31",
        error: "#FC0021",
        info: "#00FFFF",
    },
};

const App = () => {
    RNBootSplash.hide({ duration: 300 }); // fade
    return (
        <Provider store={store}>
            <ToastThemeProvider theme={theme}>
                <ToastProvider position="BOTTOM">
                    <ToastMessageRedux />
                    <ThemeProvider>
                        <Navigation />
                    </ThemeProvider>
                </ToastProvider>
            </ToastThemeProvider>
        </Provider>
    );
};

export default App;
