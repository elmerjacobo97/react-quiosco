import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clientAxios } from '../config/axios';

export const QuioscoContext = createContext({});

export const QuioscoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const getCategories = async () => {
    const token = localStorage.getItem('AUTH_TOKEN');
    try {
      const { data } = await clientAxios.get('/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(data.data);
      setCurrentCategory(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCategory = (id) => {
    const category = categories.filter((category) => category.id === id)[0];
    setCurrentCategory(category);
  };

  const handleClickModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSetProduct = (product) => {
    setProduct(product);
  };

  const handleAddOrder = ({ categoria_id, ...product }) => {
    if (order.some((orderProduct) => orderProduct.id === product.id)) {
      const orderUpdate = order.map((orderState) => (orderState.id === product.id ? product : orderState));
      setOrder(orderUpdate);
      toast.success('Actualizado en el pedido');
    } else {
      setOrder([...order, product]);
      toast.success('Agregado al pedido');
    }
  };

  const handleEditQuantity = (id) => {
    setModalVisible(!modalVisible);
    const orderUpdate = order.filter((product) => product.id === id)[0];
    setProduct(orderUpdate);
  };

  const handleDeleteOrder = (id) => {
    const orderUpdate = order.filter((orderState) => orderState.id !== id);
    setOrder(orderUpdate);
    toast.success('Eliminado del pedido');
  };

  const handleSubmitNewOrder = async () => {
    const token = localStorage.getItem('AUTH_TOKEN');
    try {
      const { data } = await clientAxios.post(
        '/api/orders',
        { total, products: order.map((product) => ({ id: product.id, quantity: product.quantity })) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setTimeout(() => {
        setOrder([]);
        setTotal(0);
      }, 1000);

      // Acá depende del flujo de negocio.
      // Cerrar sesión. etc
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompletedOrder = async (id) => {
    try {
      const token = localStorage.getItem('AUTH_TOKEN');
      await clientAxios.put(`/api/orders/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductAvailable = async (id) => {
    try {
      const token = localStorage.getItem('AUTH_TOKEN');
      await clientAxios.put(`/api/products/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const newTotal = order.reduce((total, product) => total + product.price * product.quantity, 0);
    setTotal(newTotal);
  }, [order]);

  return (
    <QuioscoContext.Provider
      value={{
        // States
        categories,
        currentCategory,
        modalVisible,
        product,
        order,
        total,

        // Funciones
        handleClickCategory,
        handleClickModal,
        handleSetProduct,
        handleAddOrder,
        handleEditQuantity,
        handleDeleteOrder,
        handleSubmitNewOrder,
        handleCompletedOrder,
        handleProductAvailable,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};
