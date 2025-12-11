/*Copyright © 2025 Chili Labs. All rights reserved.*/

import type { JSX } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

type AppProviderProps = {
    children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
