/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Search } from "./src/Components/Search";
import { Home } from "./src/pages/Home";
import { Product } from "./src/pages/Product";
import { RootStackParamList } from "./src/typings";
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Product" component={Product} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
