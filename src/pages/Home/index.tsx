import React from "react";
import { View, Text, Button } from "react-native";

import { HomeProps } from "../../typings";

export const Home = ({ navigation }: HomeProps) => {
    return (
        <View>
            <Text>Home</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate("Product")}
            />
        </View>
    );
};
