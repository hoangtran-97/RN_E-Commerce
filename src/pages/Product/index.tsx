import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    ScrollView,
    TextInput,
    Alert,
} from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as Yup from "yup";

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
    const {
        img,
        name,
        description,
        sizes,
        variants,
        price,
        categories,
    } = route.params.item;
    return (
        <ScrollView style={styles.container}>
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
                        <Text style={styles.text}>Product name: {name}</Text>
                        <Text style={styles.text}>
                            Product description: {description}
                        </Text>
                        <Text style={styles.text}>
                            Product category: {categories}
                        </Text>
                        <Text style={styles.text}>Price: {price} EUR</Text>
                        <Text style={styles.text}>Variants: </Text>
                        <Picker
                            mode="dropdown"
                            selectedValue={values.variants}
                            onValueChange={(itemValue: any) => {
                                setFieldValue("variants", itemValue);
                            }}>
                            {variants.map((variant: string) => (
                                <Picker.Item
                                    label={variant}
                                    value={variant}
                                    key={variant}
                                />
                            ))}
                        </Picker>
                        <Text style={styles.text}>Sizes: </Text>
                        <Picker
                            mode="dropdown"
                            selectedValue={values.sizes}
                            onValueChange={(itemValue: any) => {
                                setFieldValue("sizes", itemValue);
                            }}>
                            {sizes.map((size: number) => (
                                <Picker.Item
                                    label={`${size}`}
                                    value={size}
                                    key={size}
                                />
                            ))}
                        </Picker>
                        <Button onPress={handleSubmit} title="Submit" />
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
        // resizeMode: "cover",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    form: {},
    button: {},
    span: {},
    picker: { height: 100, width: 300 },
    container__picker: { display: "flex", flexDirection: "row" },
});
