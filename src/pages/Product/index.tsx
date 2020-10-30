import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Formik } from "formik";
import * as Yup from "yup";

import { ThemeContext } from "../../context";
import { ProductProps } from "../../typings";

const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").max(20, "Too Long!").required(),
    description: Yup.string()
        .min(10, "Too Short!")
        .max(60, "Too Long!")
        .required(),
    categories: Yup.string().required(),
    sizes: Yup.number().required().integer(),
    variants: Yup.string().required(),
    price: Yup.number().required().positive().integer(),
});

export const Product = ({ route }: ProductProps) => {
    const { theme } = useContext(ThemeContext);
    const {
        img,
        name,
        description,
        sizes,
        variants,
        price,
        categories,
    } = route.params.item;
    const variantsPicker = variants.map((variant: string) => ({
        label: `${variant}`,
        value: `${variant}`,
    }));
    const sizesPicker = sizes.map((size: number) => ({
        label: `${size}`,
        value: `${size}`,
    }));
    return (
        <ScrollView
            style={{ ...styles.container, backgroundColor: theme.foreground }}>
            <Formik
                initialValues={{
                    variants: `${variants[0]}`,
                    sizes: `${sizes[0]}`,
                }}
                onSubmit={(values) => console.log(values)}>
                {({ handleSubmit, values, setFieldValue }) => (
                    <View>
                        <Image
                            resizeMode="cover"
                            style={styles.img}
                            source={{
                                uri: `${img}`,
                            }}
                        />
                        <Text style={{ ...styles.text, color: theme.text }}>
                            Product name: {name}
                        </Text>
                        <Text style={{ ...styles.text, color: theme.text }}>
                            Product description: {description}
                        </Text>
                        <Text style={{ ...styles.text, color: theme.text }}>
                            Product category: {categories}
                        </Text>
                        <Text style={{ ...styles.text, color: theme.text }}>
                            Price: {price} EUR
                        </Text>
                        <Text style={{ ...styles.text, color: theme.text }}>
                            Variants:
                        </Text>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value) => console.log(value)}
                            items={variantsPicker}
                            style={{
                                ...pickerSelectStyles,
                                inputIOS: {
                                    ...pickerSelectStyles.inputIOS,
                                    backgroundColor: theme.background,
                                    color: theme.text,
                                },
                                inputAndroid: {
                                    ...pickerSelectStyles.inputAndroid,
                                    backgroundColor: theme.background,
                                    color: theme.text,
                                },
                            }}
                        />
                        <Text style={{ ...styles.text, color: theme.text }}>
                            Sizes:
                        </Text>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value) => console.log(value)}
                            items={sizesPicker}
                            style={{
                                ...pickerSelectStyles,
                                inputIOS: {
                                    ...pickerSelectStyles.inputIOS,
                                    backgroundColor: theme.background,
                                    color: theme.text,
                                },
                                inputAndroid: {
                                    ...pickerSelectStyles.inputAndroid,
                                    backgroundColor: theme.background,
                                    color: theme.text,
                                },
                            }}
                        />
                        <Button
                            onPress={handleSubmit}
                            title="Add to cart"
                            color="#5AC8FA"
                        />
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    text: { fontSize: 20, margin: 5, marginLeft: 20 },
    container: {},
    container__inner: {},
    img__container: {},
    img: {
        width: "100%",
        height: 300,
    },
    form: {},
    button: {},
    span: {},
    picker: { height: 100, width: 300 },
    container__picker: { display: "flex", flexDirection: "row" },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginHorizontal: 10,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginHorizontal: 10,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
