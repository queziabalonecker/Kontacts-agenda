import logout from '../../assets/logout.svg';
import ModalAddContact from '../../components/ModalAddContact';
import Table from '../../components/Table';
import useContactsContext from '../../hooks/useContactsContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import toast from '../../toast';
import './styles.css';

const Home = () => {
  const { removeToken, openModalAdd, setOpenModalAdd } = useGlobalContext();
  const { setCurrentContact } = useContactsContext();

  const handleLogout = () => {
    toast.messageSuccess('Até logo!');
    removeToken();
  };
  const handleAddContact = () => {
    setOpenModalAdd(true);
    setCurrentContact(false);
  };

  return (
    <div className='container-home'>
      <header>
        <h1>KONTACTS</h1>
        <img onClick={handleLogout} src={logout} alt='log out' />
      </header>
      <div className='container-contacts'>
        <button onClick={handleAddContact} className='btn-add-contact'>
          Adicionar
        </button>
        <Table />
      </div>
      {openModalAdd && <ModalAddContact />}
    </div>
  );
};

export default Home;
