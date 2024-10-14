'use client'
import AddProduct from '../../components/products/AddProduct';

export default function AddProductPage() {
  const handleSave = async (item: Record<string, any>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save product: ${errorText}`);
      }

      const result = await response.json();
      console.log('Product saved:', result);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <AddProduct onSave={handleSave} />
    </div>
  );
}
