import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useSelector } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { AppState } from "./src/typings";
import { Home } from "./src/pages/Home";
import { Setting } from "./src/pages/Setting";
import { Cart } from "./src/pages/Cart";
import { ThemeContext } from "./src/context";
import { ProductPage } from "./src/pages/Product";

enableScreens();

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <HomeStack.Navigator
            screenOptions={{
                // headerTitleStyle: { color: "white", fontWeight: "bold" },
                headerStyle: { backgroundColor: theme.foreground },
                headerTintColor: "#5AC8FA",
            }}>
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen name="Product" component={ProductPage} />
        </HomeStack.Navigator>
    );
};

export const Navigation = () => {
    const { theme } = useContext(ThemeContext);
    const { inCart } = useSelector((state: AppState) => state.product);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.foreground,
        },
    });

    const barStyle =
        theme.text === "#ffffff" ? "light-content" : "dark-content";
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={barStyle} backgroundColor={theme.foreground} />
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
                        activeTintColor: theme.text,
                        inactiveTintColor: theme.background,
                        style: {
                            backgroundColor: theme.foreground,
                        },
                    }}>
                    <Tab.Screen name="Home" component={HomeStackScreen} />
                    <Tab.Screen
                        name="Cart"
                        component={Cart}
                        options={{
                            tabBarBadge:
                                inCart.length > 0 ? inCart.length : undefined,
                        }}
                    />
                    <Tab.Screen name="Setting" component={Setting} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};
