import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('https://authentication-black.vercel.app/products');
                setProducts(res.data.data); // Assuming API response contains data under `data`
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []); // Run only once when the component mounts

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-semibold text-center mb-6">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p className="text-gray-700"><strong>Price:</strong> ${product.price}</p>
                        <p className="text-gray-700"><strong>Description:</strong> {product.description}</p>
                        <p className="text-gray-700"><strong>Category:</strong> {product.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProduct;
