import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProduct } from '@/services/productService';
import { Product } from '@/types/product';
import ProductForm from '@/components/products/ProductForm';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;  // Extract the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const fetchedProduct = await getProduct(id as string);
          setProduct(fetchedProduct);
        } catch (error) {
          console.error('Failed to fetch product:', error);
          setError('Could not load product data.');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <strong>ID:</strong> {product.id}
      </div>
      <div>
        <strong>Name:</strong> {product.name}
      </div>
      <div>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </div>
      <div>
        <strong>Description:</strong> {product.description}
      </div>

      {/* ProductForm component to allow editing if needed */}
      <ProductForm product={product} />
    </div>
  );
};

export default ProductPage;
