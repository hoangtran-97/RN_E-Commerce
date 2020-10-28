/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import {SafeAreaView, StyleSheet, StatusBar} from "react-native";

import {Search} from "./src/Components/Search";

const App = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <Search />
            </SafeAreaView>
        </>
    );
};

export default App;
