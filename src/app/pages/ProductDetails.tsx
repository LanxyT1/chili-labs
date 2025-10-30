/*Copyright © 2025 Chili Labs. All rights reserved.*/

import { useEffect, useState, type JSX } from "react";
import { useParams } from "react-router";
import type { ProductData } from "../../types/product-data";
import { fetchProductById } from "../../api/product-api";

/**
 * Renders the Product Details page component.
 * @returns JSX.Element: product details page.
 */
const ProductDetails = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Product ID is missing");
            setLoading(false);
        } else {
            setLoading(true);
            setError(null);
            fetchProductById(id)
                .then((data) => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching product details:", error);
                    setError(
                        "Failed to load product details. Please try again.",
                    );
                    setLoading(false);
                });
        }
    }, [id]);

    return (
        <section className="p-10">
            <h1 className="text-3xl font-bold mb-8">Product Details</h1>

            {loading && (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
                    <p className="font-semibold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && product && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
                    <div className="flex flex-col gap-4">
                        {product.images && product.images.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border p-10"
                                    >
                                        <img
                                            alt={`${product.title} - Image ${index + 1}`}
                                            src={image}
                                            className="w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-bold mb-2">
                            {product.title}
                        </h2>

                        <div className="flex items-center gap-4">
                            <p className="text-3xl font-semibold">
                                ${product.price.toFixed(2)}
                            </p>

                            <div className="flex items-center gap-2">
                                <span className="text-yellow-500">★</span>
                                <span className="font-semibold">
                                    {product.rating}
                                </span>
                            </div>
                        </div>

                        <p className="max-w-lg">{product.description}</p>

                        <button
                            type="button"
                            className="cl-button"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetails;
