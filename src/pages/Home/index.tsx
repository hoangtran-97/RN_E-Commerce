import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Search } from "../../Components/Search";

import { ThemeContext } from "../../context";

export const Home = () => {
    return (
        <SafeAreaView>
            <Search />
        </SafeAreaView>
    );
};
