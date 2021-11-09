import editarIcon from '../../assets/lapis.svg';
import deleteIcon from '../../assets/lixeira.svg';
import useContactsContext from '../../hooks/useContactsContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import ModalConfirmDelete from '../ModalConfirmDelete';
import './styles.css';

const Table = () => {
  const { contacts, setCurrentContact } = useContactsContext();
  const { setOpenModalAdd, openModalDelete, setOpenModalDelete } =
    useGlobalContext();

  const handleEditContact = (contact) => {
    setCurrentContact(contact);
    setOpenModalAdd(true);
  };

  const handleDeleteContact = (contact) => {
    setCurrentContact(contact);
    setOpenModalDelete(true);
  };

  return (
    <div className='container-table'>
      <div className='table-head'>
        <strong>Nome</strong>
        <strong>Email</strong>
        <strong>Telefone</strong>
      </div>
      <div className='table-body'>
        {contacts.map((item) => (
          <div key={item.id} className='table-line'>
            <span>{item.nome}</span>
            <span>{item.email}</span>
            <span>{item.telefone}</span>
            <div className='action-icons'>
              <img
                onClick={() => handleEditContact(item)}
                src={editarIcon}
                alt='editar contato'
              />
              <img
                onClick={() => handleDeleteContact(item)}
                src={deleteIcon}
                alt='excluir contato'
              />
            </div>
          </div>
        ))}
        {openModalDelete && <ModalConfirmDelete />}
      </div>
    </div>
  );
};

export default Table;
