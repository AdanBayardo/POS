import { NextResponse } from 'next/server';
import { login } from '@/services/authService';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const token = await login(email, password);
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}