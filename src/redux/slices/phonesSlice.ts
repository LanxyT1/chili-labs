/*Copyright © 2025 Chili Labs. All rights reserved.*/

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductData } from "../../types/product-data";

type PhonesState = {
    items: ProductData[];
};

const initialState: PhonesState = {
    items: [],
};

const phonesSlice = createSlice({
    name: "phones",
    initialState,
    reducers: {
        setPhones: (state, action: PayloadAction<ProductData[]>) => {
            state.items = action.payload;
        },
    },
});

export const { setPhones } = phonesSlice.actions;
export default phonesSlice.reducer;
