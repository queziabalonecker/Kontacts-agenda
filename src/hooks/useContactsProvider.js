import { useEffect, useState } from 'react';
import useGlobalContext from './useGlobalContext';
import useRequests from './useRequests';

const useContactsProvider = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(false);
  const { token } = useGlobalContext();
  const requests = useRequests();

  useEffect(() => {
    if (token) {
      loadContactsData();
    }
    //eslint-disable-next-line
  }, []);

  const loadContactsData = async () => {
    const response = await requests.get('contatos');
    setContacts(response);
  };

  return {
    contacts,
    setContacts,
    loadContactsData,
    currentContact,
    setCurrentContact,
  };
};

export default useContactsProvider;
