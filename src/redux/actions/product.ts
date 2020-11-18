import { Dispatch } from "redux";
import { Platform } from "react-native";
import axios from "axios";

import { addToast, addUser } from "../actions";
import {
    User,
    ProductActions,
    Product,
    RECEIVE_PRODUCTS,
    REMOVE_PRODUCT,
    REMOVE_PRODUCT_LIST,
    ADD_PRODUCT,
    ADD_PRODUCT_LIST,
    IntentType,
    ProductInCart,
} from "../../typings";
import { BASE } from "../../api";

export const addProduct = (product: ProductInCart): ProductActions => {
    return {
        type: ADD_PRODUCT,
        payload: {
            product,
        },
    };
};

export function removeProduct(product: Product): ProductActions {
    return {
        type: REMOVE_PRODUCT,
        payload: {
            product,
        },
    };
}

export const receiveProducts = (products: Product[]): ProductActions => {
    return {
        type: RECEIVE_PRODUCTS,
        payload: {
            products,
        },
    };
};

export const addProductList = (product: Product): ProductActions => {
    return {
        type: ADD_PRODUCT_LIST,
        payload: {
            product,
        },
    };
};

export const removeProductList = (product: Product): ProductActions => {
    return {
        type: REMOVE_PRODUCT_LIST,
        payload: {
            product,
        },
    };
};

//TODO: Fix API link after upload
//TODO: FIX addProductListDB using token both front and back-end

const URL = `${BASE}/api/v1/products`;

export const fetchProducts = () => {
    return (dispatch: Dispatch) => {
        return axios
            .get(URL)
            .then((products) => {
                dispatch(receiveProducts(products.data));
            })
            .catch((error) => {
                console.error("Error:", error.message);
                dispatch(
                    addToast({
                        message: error.message,
                        intent: IntentType.ERROR,
                    }),
                );
            });
    };
};
// export const addProductDB = (
//     user: User,
//     product: Product,
//     _id: string,
//     token: string,
// ) => {
//     return (dispatch: Dispatch) => {
//         const result = Array.from(new Set([product._id].concat(user.cart)));
//         const updateUser = { ...user, cart: [...result] };
//         return fetch(`http://localhost:3001/api/v1/users/${_id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: "bearer " + token,
//             },
//             body: JSON.stringify(updateUser),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 dispatch(addProduct(product));
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });
//     };
// };
export const addProductDB = (
    user: User,
    product: ProductInCart,
    _id: string,
    token: string,
) => {
    return (dispatch: Dispatch) => {
        let updatedUser = {};
        const productExist = user.cart.find((p) => p.product === product._id);
        if (productExist) {
            updatedUser = { ...user };
        } else {
            const result = Array.from(
                new Set(
                    [
                        { quantity: product.quantity, product: product._id },
                    ].concat(user.cart),
                ),
            );
            updatedUser = { ...user, cart: [...result] };
        }

        return fetch(`${BASE}/api/v1/users/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token,
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addProduct(product));
                if (data._id) {
                    dispatch(addUser(data));
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
};

export const addProductListDB = (product: Product) => {
    console.log("in action", JSON.stringify(product));
    return (dispatch: Dispatch) => {
        return fetch(`${BASE}/api/v1/products/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addProductList(data));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
};

// export const removeProductDB = (
//     user: User,
//     product: Product,
//     _id: string,
//     token: string,
// ) => {
//     return (dispatch: Dispatch) => {
//         const index = user.cart.findIndex((p) => p === product._id);
//         if (index >= 0) {
//             user.cart.splice(index, 1);
//         }
//         const updateUser = { ...user };
//         console.log(updateUser);

//         return fetch(`http://localhost:3001/api/v1/users/${_id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: "bearer " + token,
//             },
//             body: JSON.stringify(updateUser),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 dispatch(removeProduct(product));
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });
//     };
// };

export const removeProductDB = (
    user: User,
    product: Product,
    _id: string,
    token: string,
) => {
    return (dispatch: Dispatch) => {
        const index = user.cart.findIndex((p) => p.product === product._id);
        if (index >= 0) {
            user.cart.splice(index, 1);
        }
        const updateUser = { ...user };
        console.log("redux/action", updateUser);

        return fetch(`${BASE}/api/v1/users/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token,
            },
            body: JSON.stringify(updateUser),
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(removeProduct(product));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
};

export const removeProductListDB = (_id: string, product: Product) => {
    return (dispatch: Dispatch) => {
        return fetch(`${BASE}/api/v1/products/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log("response data", res);
                res.status === 204 && dispatch(removeProductList(product));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
};
