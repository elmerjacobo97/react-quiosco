import React from 'react';
import { clientAxios } from '../../config/axios';
import useSWR from 'swr';
import { Product } from '../../components';

export const Products = () => {
  const token = localStorage.getItem('AUTH_TOKEN');

  const fetcher = () =>
    clientAxios.get('/api/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const { data, error, isLoading } = useSWR('/api/products', fetcher, {
    // refreshInterval: 1000, // revalidar cada segundo.
  });
  if (error) return <div>Error, ocurrió un error al cargar los productos.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-4">
      <h1 className="mt-5 text-4xl antialiased font-black text-gray-800 ">Productos</h1>
      <p className="text-lg antialiased text-gray-500 ">Maneja la disponibilidad desde aquí.</p>
      <div className="grid grid-cols-1 gap-4 my-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data?.data.data.map((product) => (
          <Product key={product.id} product={product} btnAvailable />
        ))}
      </div>
    </div>
  );
};
