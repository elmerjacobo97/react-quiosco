import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <main className="flex flex-col items-center max-w-4xl m-auto mt-10 md:mt-28 md:flex-row">
      <img src="/img/logo.svg" alt="imagen logo" className="max-w-xs" />
      <div className="w-full p-10">
        <Outlet />
      </div>
    </main>
  );
};
