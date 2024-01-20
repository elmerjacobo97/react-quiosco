import { useContext } from 'react';
import { QuioscoContext } from '../context';

export const useQuiosco = () => {
  return useContext(QuioscoContext);
};
