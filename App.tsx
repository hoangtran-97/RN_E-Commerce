import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { Home } from "./src/pages/Home";
import { Setting } from "./src/pages/Setting";
import { Cart } from "./src/pages/Cart";

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName = "question";

                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "Setting") {
                            iconName = "user-cog";
                        } else if (route.name === "Cart") {
                            iconName = "shopping-cart";
                        }
                        return (
                            <FontAwesome5
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                })}
                tabBarOptions={{
                    activeTintColor: "tomato",
                    inactiveTintColor: "gray",
                }}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Cart" component={Cart} />
                <Tab.Screen name="Setting" component={Setting} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
