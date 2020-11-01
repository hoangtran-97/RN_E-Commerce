import React, { useState, useContext } from "react";
import { StyleSheet, Image, ActivityIndicator, View } from "react-native";

import { ThemeContext } from "../../context";

export const ImageViewer = ({ route }: { route: any }) => {
    const { theme } = useContext(ThemeContext);
    const [isLoading, setIsLoading] = useState(true);
    const { img } = route.params;
    const containerStyle = {
        ...styles.container,
        backgroundColor: theme.background,
    };
    return (
        <View style={containerStyle}>
            <Image
                onLoadEnd={() => setIsLoading((prev) => !prev)}
                resizeMode="cover"
                style={styles.img}
                source={{
                    uri: `${img}`,
                }}
            />
            <ActivityIndicator
                size="large"
                style={styles.activityIndicator}
                animating={isLoading}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1 },
    img: { flex: 1 },
    activityIndicator: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});
