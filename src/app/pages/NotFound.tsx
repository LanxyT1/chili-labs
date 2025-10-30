/*Copyright © 2025 Chili Labs. All rights reserved.*/

import type { JSX } from "react";
import { Link } from "react-router";

/**
 * Renders the 404 Not Found page component.
 * @returns JSX.Element: not found page.
 */
const NotFoundPage = (): JSX.Element => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-10">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="cl-button"
            >
                Go to Home
            </Link>
        </section>
    );
};

export default NotFoundPage;
