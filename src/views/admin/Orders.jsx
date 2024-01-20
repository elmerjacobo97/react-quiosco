import useSWR from 'swr';
import { clientAxios } from '../../config/axios';
import { useQuiosco } from '../../hooks/useQuiosco';

export const Orders = () => {
  const { handleCompletedOrder } = useQuiosco();

  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () =>
    clientAxios.get('/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const { data, error, isLoading } = useSWR('/api/orders', fetcher, {
    // refreshInterval: 1000, // revalidar cada segundo.
  });
  if (error) return <div>Error, ocurrió un error al cargar los pedidos.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-4">
      <h1 className="mt-5 text-4xl font-black text-gray-800">Pedidos</h1>
      <p className="text-lg text-gray-500">Administra las ordenes desde aquí.</p>
      <div className="mt-5">
        {data?.data?.data.map(
          (order) =>
            order.products.length > 0 && (
              <div key={order.id} className="p-4 mb-5 bg-white rounded-lg shadow">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xl font-bold text-gray-800">Orden ID: {order.id}</p>
                  <p className="text-lg font-semibold text-gray-700">Cliente: {order.user.name}</p>
                </div>
                <div className="mt-3">
                  {order.products.map((product) => (
                    <div key={product.id} className="py-4 border-b last-of-type:border-b-0">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                        </svg>
                        <p className="ml-2 text-lg text-gray-800">{product.id}</p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                          />
                        </svg>
                        <p className="ml-2 text-lg text-gray-800">{product.name}</p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
                          />
                        </svg>
                        <p className="ml-2 text-lg text-gray-800">Cantidad: {product.pivot.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg font-bold text-gray-800">Total: ${order.total}</p>
                  <button
                    className="px-4 py-2 text-white transition bg-green-500 rounded hover:bg-green-600"
                    onClick={() => handleCompletedOrder(order.id)}
                  >
                    Completar Orden
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
