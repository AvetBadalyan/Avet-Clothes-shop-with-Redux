import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from './cartSlice';
import { productSlice } from './porductSlice';
import { userSlice } from './userSlice';

export default configureStore({
    reducer: {
        cartSlice,
        productSlice,
         userSlice
    }
})