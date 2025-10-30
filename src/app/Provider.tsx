/*Copyright © 2025 Chili Labs. All rights reserved.*/

import type { JSX } from "react";

type AppProviderProps = {
    children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
    return <>{children}</>;
};

export default AppProvider;
