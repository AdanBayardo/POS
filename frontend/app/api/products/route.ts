import { NextRequest, NextResponse } from 'next/server'
import { getProducts, createProduct } from "@/services/productService"

export async function GET(req: NextRequest) {
  try {
    const products = await getProducts()
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newProduct = await createProduct(body)
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error creating product' }, { status: 400 })
  }
}
