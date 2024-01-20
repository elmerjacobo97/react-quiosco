import PropTypes from 'prop-types';
import { useQuiosco } from '../../hooks/useQuiosco';

export const Category = ({ category }) => {
  const { currentCategory, handleClickCategory } = useQuiosco();
  const { icon, name, id } = category;
  return (
    <div
      onClick={() => handleClickCategory(id)}
      className={`flex items-center gap-4 p-4 my-4 transition-colors shadow cursor-pointer bg-slate-50 hover:bg-slate-200 rounded-xl hover:text-sky-700 ${
        id === currentCategory.id && 'bg-slate-200 text-sky-700'
      }`}
    >
      <img src={`/img/icono_${icon}.svg`} className="w-12 h-12" alt={name} />
      <p className="text-xl antialiased truncate">{name}</p>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
};
