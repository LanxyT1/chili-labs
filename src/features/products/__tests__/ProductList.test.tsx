/*Copyright © 2025 Chili Labs. All rights reserved.*/

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import ProductList from "../ProductList";
import * as productApi from "../../../api/product-api";
import type { ProductData } from "../../../types/product-data";

const mockProducts: ProductData[] = [
    {
        id: 1,
        title: "Test Phone",
        price: 999,
        description: "A test phone",
        thumbnail: "test-thumb.jpg",
        rating: 4.5,
        images: ["test.jpg"],
    },
];

const selectors: { [key: string]: string } = {
    card: ".cl-card",
    spinner: ".animate-spin",
};

const ProductListRoute = (
    <BrowserRouter>
        <ProductList filterValue="" />
    </BrowserRouter>
);

vi.mock("../../../api/product-api");

describe("ProductList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders loading spinner initially", () => {
        vi.spyOn(productApi, "fetchProducts").mockImplementation(
            () => new Promise(() => {}),
        );

        render(ProductListRoute);
        expect(document.querySelector(selectors.spinner)).toBeTruthy();
    });

    it("renders error state when fetch fails", async () => {
        vi.spyOn(productApi, "fetchProducts").mockRejectedValue(
            new Error("Failed to fetch"),
        );

        render(ProductListRoute);

        await waitFor(() => {
            expect(screen.getByText("Error")).toBeInTheDocument();
            expect(
                screen.getByText("Failed to load products. Please try again."),
            ).toBeInTheDocument();
        });
    });

    it("renders product list on success", async () => {
        vi.spyOn(productApi, "fetchProducts").mockResolvedValue(mockProducts);

        render(ProductListRoute);

        await waitFor(() => {
            expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument();
            expect(
                screen.getByText(mockProducts[0].description),
            ).toBeInTheDocument();
            expect(
                screen.getByText(`$${mockProducts[0].price.toFixed(2)}`),
            ).toBeInTheDocument();
        });

        expect(document.querySelector(selectors.card)).toBeTruthy();
    });
});
