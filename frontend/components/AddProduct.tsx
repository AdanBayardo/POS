import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IProduct } from '@/models/Product';
import { deleteProduct as deleteProductService, getProducts } from '@/services/productService';

export default function AddProduct() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<IProduct>();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const onSubmit = async (data: IProduct) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
    const method = editingProduct ? 'PUT' : 'POST';

    if (editingProduct) {
      url += `/${editingProduct._id}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      reset();
      setEditingProduct(null);
      fetchProducts();
      alert(editingProduct ? 'Product updated successfully' : 'Product added successfully');
    } catch (error) {
      console.error('Error submitting product:', error);
      alert(`Failed to ${editingProduct ? 'update' : 'add'} product: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!id) {
      console.error('Attempted to delete product with undefined ID');
      return;
    }

    try {
      console.log('Attempting to delete product with ID:', id);
      
      const response = await deleteProductService(id);
      if (response.ok) {
        await fetchProducts(); // Refresh the product list after successful deletion
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`Failed to delete product: ${error.message}`);
    }
  };

  const editProduct = (product: IProduct) => {
    setEditingProduct(product);
    setValue('name', product.name as string);
    setValue('description', product.description as string);
    setValue('price', product.price as number);
    setValue('stock', product.stock as number);
    setValue('category', product.category as string);
    setValue('barcode', product.barcode as string);
    // Set other fields as needed
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            {...register('name', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label> 
          <textarea
            {...register('description', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            {...register('price', { required: true, min: 0 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            step="0.01"
          />
        </div>
        <div className="mb-4"> 
          
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            {...register('stock', { required: true, min: 0 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stock"
            type="number"
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            {...register('category', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
          />
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barcode">
            Barcode
          </label>
          <input
            {...register('barcode', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="barcode"
            type="text"
          />
        </div>
      
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{product.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{product.description}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button
                    onClick={() => editProduct(product)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
