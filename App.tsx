import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";

import makeStore from "./src/redux/store";
import { ThemeProvider } from "./src/context";
import { Navigation } from "./navigation";

const store = makeStore();

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Navigation />
            </ThemeProvider>
        </Provider>
    );
};

export default App;
