import { useAuth } from '../../hooks/useAuth';
import { useQuiosco } from '../../hooks/useQuiosco';
import { Category } from './Category';

export const Sidebar = () => {
  const { categories } = useQuiosco();
  const { logout, user } = useAuth({ middleware: 'auth' });

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img src="/img/logo.svg" className="w-40" alt="imagen logo" />
      </div>
      <p className="mt-4 text-xl font-bold text-center">Hola: {user?.name}</p>
      <div className="mx-4 mt-10">
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
      <div className="mx-4 mt-10" onClick={logout}>
        <button
          type="button"
          className="w-full px-4 py-2 text-white uppercase transition-colors bg-red-500 rounded hover:cursor-pointer hover:bg-red-600"
        >
          Cancelar Orden
        </button>
      </div>
    </aside>
  );
};
