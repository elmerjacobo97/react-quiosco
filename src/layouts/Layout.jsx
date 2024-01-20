import { Outlet } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import { ModalProduct, Sidebar, Summary } from '../components';
import { useQuiosco } from '../hooks/useQuiosco';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks/useAuth';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const Layout = () => {
  const { modalVisible } = useQuiosco();
  const { user, error } = useAuth({ middleware: 'auth' });

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 h-screen md:overflow-y-scroll">
          <Outlet />
        </main>
        <Summary />
      </div>
      <Modal isOpen={modalVisible} style={customStyles}>
        <ModalProduct />
      </Modal>
      <ToastContainer />
    </>
  );
};
