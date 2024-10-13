import { NextResponse } from 'next/server';
import { getProduct, updateProduct, deleteProduct } from '@/services/productService';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching product' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const productData = await request.json();
    const updatedProduct = await updateProduct(params.id, productData);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating product' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteProduct(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting product' }, { status: 400 });
  }
}
