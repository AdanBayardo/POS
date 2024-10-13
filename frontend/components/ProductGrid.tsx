import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IProduct } from '../models/Product';

interface ProductGridProps {
  onAddToTicket: (product: IProduct) => void;
}

export function ProductGrid({ onAddToTicket }: ProductGridProps) {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const ProductItem = ({ product }: { product: IProduct }) => (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-md">
      <div className="w-full h-48 relative mb-4">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          // onError={(e) => {
          //   e.currentTarget.src = "/images/fallback-image.jpg" // Path to your fallback image
          // }}
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
    </div>
  );

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        onClick={() => router.push('/products')} 
      >
        Add Item
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="flex flex-col items-center">
            <ProductItem product={product} />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => onAddToTicket(product)}
            >
              Add to Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}