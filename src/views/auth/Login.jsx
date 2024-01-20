import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { clientAxios } from '../../config/axios';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
  const { login } = useAuth({ middleware: 'guest', url: '/' });
  const [errors, setErrors] = useState([]);

  const emailRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    login(data, setErrors);
  };

  const getInputBorderClass = (error) => {
    return error ? 'border-red-600' : 'border-gray-300';
  };

  return (
    <>
      <h1 className="text-4xl antialiased font-black text-gray-800">Inicia Sesión</h1>
      <p className="my-5 antialiased text-gray-500">Inicia sesión con tus credenciales.</p>
      <form className="p-10 my-10 bg-white rounded-lg shadow" onSubmit={handleSubmit} noValidate>
        <div className="my-5">
          <label htmlFor="email" className="block text-gray-600 uppercase">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            ref={emailRef}
            placeholder="Email de Registro"
            className={`w-full p-3 mt-3 border rounded-xl bg-gray-50 ${getInputBorderClass(errors.email)}`}
          />
          {errors.email && <span className="text-red-600">{errors.email}</span>}
        </div>
        <div className="my-5">
          <label htmlFor="password" className="block text-gray-600 uppercase">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            ref={passwordRef}
            placeholder="Tu Password"
            className={`w-full p-3 mt-3 border rounded-xl bg-gray-50 ${getInputBorderClass(errors.password)}`}
          />
          {errors.password && <span className="text-red-600">{errors.password}</span>}
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full py-3 text-white uppercase transition-colors rounded bg-sky-700 hover:cursor-pointer hover:bg-sky-800"
        />
        <nav className="mt-10 lg:flex lg:justify-between">
          <span className="block my-5 text-sm text-center text-gray-500 uppercase">¿Aún te has registrado?</span>
          <Link to="/auth/register" className="block my-5 text-sm text-center text-gray-500 uppercase hover:underline">
            Crea tu cuenta
          </Link>
        </nav>
      </form>
    </>
  );
};
