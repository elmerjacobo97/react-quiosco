import useSWR from 'swr';
import { clientAxios } from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuth = ({ middleware, url }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('AUTH_TOKEN') || null;

  const {
    data: user,
    error,
    mutate,
  } = useSWR('/api/user', () =>
    clientAxios
      .get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.errors);
      })
  );

  const register = async (data, setErrors) => {
    try {
      const { data: resp } = await clientAxios.post('/api/register', data);
      localStorage.setItem('AUTH_TOKEN', resp.token);
      setErrors([]);
      await mutate();
    } catch (error) {
      const errorsResponse = error.response.data.errors;
      const formattedErrors = {};
      Object.keys(errorsResponse).forEach((key) => {
        formattedErrors[key] = errorsResponse[key][0];
      });
      setErrors(formattedErrors);
    }
  };

  const login = async (data, setErrors) => {
    try {
      const { data: resp } = await clientAxios.post('/api/login', data);
      localStorage.setItem('AUTH_TOKEN', resp.token);
      setErrors([]);
      await mutate();
    } catch (error) {
      const errorsResponse = error.response.data.errors;
      const formattedErrors = {};
      Object.keys(errorsResponse).forEach((key) => {
        formattedErrors[key] = errorsResponse[key][0];
      });
      setErrors(formattedErrors);
    }
  };

  const logout = async () => {
    try {
      await clientAxios.post('/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('AUTH_TOKEN');
      await mutate(undefined);
    } catch (error) {
      throw new Error(error?.response?.data?.errors);
    }
  };

  useEffect(() => {
    if (middleware === 'guest' && user && url) {
      navigate(url);
    }
    if (middleware === 'guest' && user && user.admin) {
      navigate('/admin');
    }
    if (middleware === 'admin' && user && !user.admin) {
      navigate('/');
    }
    if (middleware === 'auth' && error) {
      navigate('/auth/login');
    }
  }, [error, middleware, navigate, url, user]);

  return {
    register,
    login,
    logout,
    user,
    error,
  };
};
