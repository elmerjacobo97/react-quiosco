import useSWR from 'swr';
import { Product } from '../../components';
import { useQuiosco } from '../../hooks/useQuiosco';
import { clientAxios } from '../../config/axios';

export const Home = () => {
  const { currentCategory } = useQuiosco();

  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => clientAxios.get('/api/products', { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data.data);

  const { data, error, isLoading } = useSWR('/api/products', fetcher, {
    // refreshInterval: 1000, // revalidar cada segundo.
  });
  if (error) return <div>Error, ocurrió un error al cargar los productos.</div>;
  if (isLoading) return <div>Loading...</div>;

  const products = data.filter((product) => product.category_id === currentCategory.id);

  return (
    <>
      <h1 className="mt-5 text-4xl antialiased font-black text-gray-800 ">{currentCategory.name}</h1>
      <p className="text-lg antialiased text-gray-500 ">Elige y personaliza tu pedido a continuación.</p>
      <div className="grid grid-cols-1 gap-4 my-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <Product key={product.id} product={product} btnAdd />
        ))}
      </div>
    </>
  );
};
