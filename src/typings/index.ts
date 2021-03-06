import { ProductState, Product } from "./product";
import { UiState } from "./ui";
import { User, UserState } from "./user";

export * from "./user";
export * from "./product";
export * from "./ui";

export type ProductProps = {
    route: any;
    navigation: any;
};
export type AdminAddProductProps = { token: string };

export type AdminProductItemProps = {
    product: Product;
};

export type AdminUserItemProps = {
    user: User;
};

export type HomeProps = {
    query: string;
};
export type SearchProps = {
    query: string;
    setQuery: Function;
};
export type CartItemProps = {
    item: Product;
};
export type ContextChildrenProps = {
    children: React.ReactNode;
};

export type RouteParam = {
    id: string;
};

export type AppState = {
    product: ProductState;
    ui: UiState;
    user: UserState;
};
