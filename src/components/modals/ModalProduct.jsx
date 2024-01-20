import { useEffect, useState } from 'react';
import { formatMoney } from '../../helpers';
import { useQuiosco } from '../../hooks/useQuiosco';

export const ModalProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [orderEdit, setOrderEdit] = useState(false);
  const { product, order, handleClickModal, handleAddOrder } = useQuiosco();
  const { name, image, price } = product;

  const handleQuantity = (value) => {
    if (value === 'restar') {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    } else {
      if (quantity < 5) {
        setQuantity(quantity + 1);
      }
    }
  };

  useEffect(() => {
    if (order.some((orderProduct) => orderProduct.id === product.id)) {
      const productInOrder = order.filter((orderProduct) => orderProduct.id === product.id)[0];
      setQuantity(productInOrder.quantity);
      setOrderEdit(true);
    }
  }, [order, product.id]);

  return (
    <div className="gap-5 md:flex md:items-center">
      <div className="md:w-1/3">
        <img src={`/img/${image}.jpg`} alt={name} className="object-cover w-56" />
      </div>
      <div className="md:w-2/3">
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="mt-5 text-2xl font-black text-amber-500">{formatMoney(price)}</p>
        <div className="flex items-center gap-4 mt-5">
          <button onClick={() => handleQuantity('restar')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
          <p className="text-xl">{quantity}</p>
          <button onClick={() => handleQuantity('sumar')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            handleAddOrder({ ...product, quantity });
            handleClickModal();
          }}
          className="px-4 py-2 mt-5 text-white uppercase transition-colors rounded bg-sky-700 hover:bg-sky-800"
        >
          {orderEdit ? 'Guardar cambios' : 'Añadir al pedido'}
        </button>
      </div>
      <button type="button" onClick={handleClickModal} className="absolute top-5 right-5">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
