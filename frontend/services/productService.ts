import { IProduct } from '../types/Product';


export async function getProducts(): Promise<IProduct[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getProduct(id: string): Promise<IProduct | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function createProduct(productData: Partial<IProduct>): Promise<IProduct> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function updateProduct(id: string, productData: Partial<IProduct>): Promise<IProduct | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function deleteProduct(id: string): Promise<Response> {
  console.log('deleteProduct called with id:', id);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  console.log('Delete response status:', response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
  }
  return response;
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/categories`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
