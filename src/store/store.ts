/*Copyright © 2025 Chili Labs. All rights reserved.*/

import { configureStore } from "@reduxjs/toolkit";
import phonesReducer from "./phonesSlice";

export const store = configureStore({
    reducer: {
        phones: phonesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;