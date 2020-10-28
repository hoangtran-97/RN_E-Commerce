import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "./src/pages/Home";
import { Product } from "./src/pages/Product";
import { RootStackParamList } from "./src/typings";

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Product" component={Product} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
