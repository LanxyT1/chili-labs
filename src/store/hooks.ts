/*Copyright © 2025 Chili Labs. All rights reserved.*/

import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
