import { useEffect, useState } from "react";
import { getProducts } from "./api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function loadProducts() {
      try {
        const data = await getProducts();
        if (!ignore) setProducts(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadProducts();
    return () => { ignore = true; };
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name} — ₱{product.price}</li>
      ))}
    </ul>
  );
}