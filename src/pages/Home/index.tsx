import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { useProduct } from "../../hooks/useProduct";
import { Search } from "../../Components/Search";

import { ThemeContext } from "../../context";

export const Home = () => {
    const [products] = useProduct();
    console.log(products);
    return (
        <SafeAreaView>
            <Search />
        </SafeAreaView>
    );
};
