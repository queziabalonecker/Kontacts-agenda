import { useEffect, useState } from 'react';
import closeIcon from '../../assets/close.svg';
import useContactsContext from '../../hooks/useContactsContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import useRequests from '../../hooks/useRequests';
import './styles.css';

const ModalAddContact = () => {
  const defaultValues = { name: '', email: '', phone: '' };
  const { setOpenModalAdd, openModalAdd } = useGlobalContext();
  const { loadContactsData, currentContact } = useContactsContext();
  const requests = useRequests();
  const [form, setForm] = useState(defaultValues);

  useEffect(() => {
    if (!currentContact) {
      setForm(defaultValues);
      return;
    }

    const { nome, email, telefone } = currentContact;
    setForm({ name: nome, email, phone: telefone });

    //eslint-disable-next-line
  }, [openModalAdd, currentContact]);

  const handleChange = (target) => {
    setForm({ ...form, [target.id]: target.value });
    console.log(form);
  };

  const addContact = async (body) => {
    return await requests.post('contatos', body, true);
  };

  const editContact = async (body) => {
    return await requests.put('contatos', body, currentContact.id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      return;
    }

    const body = {
      nome: form.name,
      email: form.email,
      telefone: form.phone,
    };

    const response = currentContact
      ? await editContact(body)
      : await addContact(body);

    if (response) {
      loadContactsData();
      setOpenModalAdd(false);
    }
  };

  return (
    <div className='container-modal'>
      <div className='modal-insert'>
        <img
          onClick={() => setOpenModalAdd(false)}
          className='close'
          src={closeIcon}
          alt='close modal'
        />
        <h1>{currentContact ? 'Editar contato' : 'Novo Contato'}</h1>
        <form action='submit'>
          <input
            type='text'
            id='name'
            placeholder='Nome'
            value={form.name}
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type='text'
            id='email'
            placeholder='E-mail'
            value={form.email}
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type='text'
            id='phone'
            placeholder='Telefone'
            value={form.phone}
            onChange={(e) => handleChange(e.target)}
          />
          <button onClick={handleSubmit} className='btn-add'>
            Adicionar
          </button>
        </form>
        <button onClick={() => setForm(defaultValues)} className='btn-clear'>
          Limpar
        </button>
      </div>
    </div>
  );
};

export default ModalAddContact;
