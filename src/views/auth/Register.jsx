import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Register = () => {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const [errors, setErrors] = useState([]);
  const { register } = useAuth({ middleware: 'guest', url: '/' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    register(data, setErrors);
  };

  const getInputBorderClass = (error) => {
    return error ? 'border-red-600' : 'border-gray-300';
  };

  return (
    <>
      <h1 className="text-4xl antialiased font-black text-gray-800">Crea tu cuenta</h1>
      <p className="my-5 antialiased text-gray-500">Crea tu cuenta llenando los siguientes campos.</p>
      <form className="p-10 my-10 bg-white rounded-lg shadow" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="name" className="block text-gray-600 uppercase">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            ref={nameRef}
            placeholder="Tu nombre"
            className={`w-full p-3 mt-3 rounded-xl bg-gray-50 border ${getInputBorderClass(errors.name)}`}
          />
          {errors.name && <span className="text-red-600">{errors.name}</span>}
        </div>
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
        <div className="my-5">
          <label htmlFor="password_confirmation" className="block text-gray-600 uppercase">
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            ref={passwordConfirmationRef}
            placeholder="Repite tu Password"
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="w-full py-3 text-white uppercase transition-colors rounded bg-sky-700 hover:cursor-pointer hover:bg-sky-800"
        />
        <nav className="mt-10 lg:flex lg:justify-between">
          <span className="block my-5 text-sm text-center text-gray-500 uppercase">¿Ya tienes una cuenta?</span>
          <Link to={'/auth/login'} className="block my-5 text-sm text-center text-gray-500 uppercase hover:underline">
            Iniciar Sesión
          </Link>
        </nav>
      </form>
    </>
  );
};
