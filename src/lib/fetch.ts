import type { Product, ProductsResponse } from './types';

const BASE = 'https://dummyjson.com';

export async function fetchProducts(opts: { q?: string; limit?: number }={}) {
  const { q, limit = 200 } = opts;
  const skip = 0;

  const url = q
    ? `${BASE}/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
    : `${BASE}/products?limit=${limit}&skip=${skip}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);

  const data = (await res.json()) as ProductsResponse | {
    products: ProductsResponse['products']; total: number; skip: number; limit: number
  };

  return {
    products: (data as any).products,
    total: (data as any).total,
    skip: (data as any).skip ?? skip,
    limit: (data as any).limit ?? limit
  } ;
}

export async function fetchProduct(id: number | string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product (${res.status})`);
  return await res.json() as Product;
} 