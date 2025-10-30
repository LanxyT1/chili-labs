/*Copyright © 2025 Chili Labs. All rights reserved.*/

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import ProductDetails from "../ProductDetails";
import * as productApi from "../../../api/product-api";

const mockProducts = {
    id: 1,
    title: "Test Product",
    price: 299.99,
    description: "This is a test product description",
    thumbnail: "test-thumb.jpg",
    rating: 4.5,
    images: ["test1.jpg", "test2.jpg"],
};

const selectors: { [key: string]: string } = {
    spinner: ".animate-spin",
};

const ProductDetailsRoute = (
    <MemoryRouter initialEntries={["/products/1"]}>
        <Routes>
            <Route
                path="/products/:id"
                element={<ProductDetails />}
            />
        </Routes>
    </MemoryRouter>
);

vi.mock("../../../api/product-api");

describe("ProductDetails", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders loading spinner initially", () => {
        vi.spyOn(productApi, "fetchProductById").mockImplementation(
            () => new Promise(() => {}),
        );

        render(ProductDetailsRoute);

        expect(document.querySelector(selectors.spinner)).toBeTruthy();
    });

    it("renders product details on success", async () => {
        vi.spyOn(productApi, "fetchProductById").mockResolvedValue(
            mockProducts,
        );

        render(ProductDetailsRoute);

        await waitFor(() => {
            expect(screen.getByText(mockProducts.title)).toBeInTheDocument();
            expect(
                screen.getByText(`$${mockProducts.price.toFixed(2)}`),
            ).toBeInTheDocument();
            expect(
                screen.getByText(mockProducts.description),
            ).toBeInTheDocument();
            expect(
                screen.getByText(mockProducts.rating.toString()),
            ).toBeInTheDocument();
        });
    });
});
