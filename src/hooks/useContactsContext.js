import { useContext } from 'react';
import ContactsContext from '../context/ContactsContext';

const useContactsContext = () => {
  return useContext(ContactsContext);
};

export default useContactsContext;
