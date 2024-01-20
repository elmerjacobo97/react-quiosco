import PropTypes from 'prop-types';
import { formatMoney } from '../../helpers';
import { useQuiosco } from '../../hooks/useQuiosco';

export const Product = ({ product, btnAdd = false, btnAvailable = false }) => {
  const { handleClickModal, handleSetProduct, handleProductAvailable } = useQuiosco();

  const { image, name, price } = product;

  return (
    <div className="p-4 rounded shadow bg-slate-50">
      <img src={`/img/${image}.jpg`} className="w-full rounded" alt={name} />
      <div className="p-4">
        <h3 className="text-xl font-medium">{name}</h3>
        <p className="text-2xl font-black text-amber-400">{formatMoney(price)}</p>
        {btnAdd && (
          <button
            type="button"
            onClick={() => {
              handleClickModal();
              handleSetProduct(product);
            }}
            className="w-full px-4 py-2 mt-4 text-white uppercase transition-colors rounded bg-sky-700 hover:bg-sky-800"
          >
            Agregar
          </button>
        )}
        {btnAvailable && (
          <button
            type="button"
            className="w-full px-4 py-2 mt-4 text-white uppercase transition-colors rounded bg-sky-700 hover:bg-sky-800"
            onClick={() => handleProductAvailable(product.id)}
          >
            Disponible
          </button>
        )}
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
