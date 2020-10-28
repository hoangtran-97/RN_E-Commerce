import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";

import { HomeProps } from "../../typings";

export const Home = ({ navigation }: HomeProps) => {
    return (
        <SafeAreaView>
            <Text>Home</Text>
            {/* <Button
                title="Go to Details"
                onPress={() => navigation.navigate("Product")}
            /> */}
        </SafeAreaView>
    );
};
