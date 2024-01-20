import { clientAxios } from '../../config/axios';
import { formatMoney } from '../../helpers';
import { useQuiosco } from '../../hooks/useQuiosco';
import { SummaryProduct } from './SummaryProduct';

export const Summary = () => {
  const { order, total, handleSubmitNewOrder } = useQuiosco();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSubmitNewOrder();
  };

  return (
    <div className="h-screen mx-4 md:w-72 md:overflow-y-scroll">
      <h1 className="mt-5 text-4xl antialiased font-black text-gray-800 ">Mi Pedido</h1>
      <p className="text-lg antialiased text-gray-500">Aquí puedes ver el resumen y totales de tu pedido</p>
      <div className="mt-5">
        {order.length === 0 ? (
          <p className="text-lg antialiased font-bold text-gray-500">No hay elementos en tu pedido</p>
        ) : (
          order.map((product) => <SummaryProduct key={product.id} product={product} />)
        )}
      </div>
      {order.length !== 0 && (
        <div className="mt-5">
          <p className="text-xl antialiased font-bold text-amber-400">Total a pagar: {formatMoney(total)}</p>
        </div>
      )}
      {order.length > 0 && (
        <form className="my-10" onSubmit={handleSubmit}>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white uppercase transition-colors rounded bg-sky-700 hover:cursor-pointer hover:bg-sky-800"
          >
            Confirmar orden
          </button>
        </form>
      )}
    </div>
  );
};
