import { createContext } from "react";

const CartContext = createContext({
    items: [] // it just for autocompletion, not gonna used
});

export default CartContext;