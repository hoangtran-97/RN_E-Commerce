import { Dispatch } from "redux";
import { BASE } from "../../api";

import {
    ADD_USER,
    UserActions,
    User,
    ADD_TOKEN,
    Product,
    REMOVE_USER,
    RECEIVE_USERS,
    AUTHORIZE_USERS,
    ProductInCart,
    ProductInfo,
} from "../../typings";
import { addProduct } from "../actions";

export const addUser = (user: User): UserActions => {
    return {
        type: ADD_USER,
        payload: {
            user,
        },
    };
};

export const removeUser = (user: User): UserActions => {
    return {
        type: REMOVE_USER,
        payload: {
            user,
        },
    };
};

export const authorizeUser = (user: User): UserActions => {
    return {
        type: AUTHORIZE_USERS,
        payload: {
            user,
        },
    };
};

export const addToken = (token: string): UserActions => {
    return {
        type: ADD_TOKEN,
        payload: {
            token,
        },
    };
};

export const receiveUsers = (users: User[]): UserActions => {
    return {
        type: RECEIVE_USERS,
        payload: {
            users,
        },
    };
};

// export const updateUser = (
//     user: User,
//     token: string,
//     cart: Product[],
//     list: Product[],
// ) => {
//     const { _id } = user;
//     //Extracted IDs
//     const cartResult = cart.map((a) => a._id);
//     //Unique Set
//     const result = Array.from(new Set(cartResult.concat(user.cart)));
//     const updateUser = { ...user, cart: [...result] };
//     return (dispatch: Dispatch) => {
//         fetch(`http://localhost:3001/api/v1/users/${_id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: "bearer " + token,
//             },
//             body: JSON.stringify(updateUser),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Success:", data);
//                 dispatch(addUser(data));
//                 data.cart.forEach((item: string) => {
//                     const result = list.find((p) => p._id === item);
//                     result && dispatch(addProduct(result));
//                 });
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });
//     };
// };
export const updateUser = (
    user: User,
    token: string,
    cart: ProductInCart[],
    list: Product[],
) => {
    const { _id } = user;
    //Extracted IDs
    const cartResult = cart.map((a) => ({
        quantity: a.quantity,
        product: a._id,
    }));
    //Unique Set
    const result = Array.from(new Set(cartResult.concat(user.cart)));
    const updatedUser = { ...user, cart: [...result] };
    return (dispatch: Dispatch) => {
        fetch(`${BASE}/api/v1/users/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token,
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success update:", data);
                dispatch(addUser(data));

                data.cart.forEach((item: ProductInfo) => {
                    const singleResult = list.find(
                        (p) => p._id === item.product,
                    );
                    singleResult &&
                        dispatch(
                            addProduct({
                                ...singleResult,
                                quantity: item.quantity,
                            }),
                        );
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
};

export const fetchUsers = () => {
    return (dispatch: Dispatch) => {
        return fetch(`${BASE}/api/v1/users/`).then((res) =>
            res.json().then((users) => {
                dispatch(receiveUsers(users));
            }),
        );
    };
};

export const authorizeUserDB = (
    user: User,
    banStatus: boolean,
    _id: string,
    token: string,
) => {
    return (dispatch: Dispatch) => {
        const updatedUser = { ...user, isBanned: `${banStatus}` };

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
                dispatch(authorizeUser(data));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
};
