import "react-native-gesture-handler";
import React from "react";

import { ThemeProvider } from "./src/context";
import { Navigation } from "./navigation";

const App = () => {
    return (
        <ThemeProvider>
            <Navigation />
        </ThemeProvider>
    );
};

export default App;
