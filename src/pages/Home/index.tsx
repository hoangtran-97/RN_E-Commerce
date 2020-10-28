import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { HomeProps } from "../../typings";

export const Home = ({ navigation }: HomeProps) => {
    return (
        <SafeAreaView>
            <Text>Home</Text>
            <FontAwesome5 name="comments" size={20} />
            {/* <Button
                title="Go to Details"
                onPress={() => navigation.navigate("Product")}
            /> */}
        </SafeAreaView>
    );
};
