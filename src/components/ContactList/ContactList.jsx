import React from 'react';
import { ContactWriper, ContactItem, ContactButton } from './ContactList.style';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'redux/contactsSlice';
import { selectFilter } from 'redux/selectors';
// import { deleteContact } from 'redux/contactsSlice';

// const ContactList = ({ contacts, onDeleteContact }) => (
//   <ContactWriper>
//     {contacts.map(contact => (
//       <ContactItem key={contact.id}>
//         {contact.name + ' : ' + contact.number}
//         {
//           // Кнопка видалення контакту
//           <ContactButton
//             type="button"
//             name="delete"
//             onClick={() => onDeleteContact(contact.id)}
//           >
//             delete
//           </ContactButton>
//         }
//       </ContactItem>
//     ))}
//   </ContactWriper>
// );

const ContactList = () => {
  // const dispatch = useDispatch();

  // Виклик хука `useGetContactsQuery` для отримання списку контактів
  const { data } = useGetContactsQuery();

  // const contacts = useSelector(state => state.contacts.contacts);
  // const filter = useSelector(state => state.filter.filter);

  // Виклик хука `useDeleteContactMutation` для виконання мутації видалення контакту
  const [deleteContact] = useDeleteContactMutation();
  // Виклик селектора `selectFilter` для отримання значення фільтру
  const filter = useSelector(selectFilter);

  // Обробник видалення контакту
  const onDeleteContact = id => {
    // dispatch(deleteContact(id));
    deleteContact(id);
  };

  if (!data) {
    return;
  }

  // Нормалізація значення фільтру
  const normalizeFilter = filter.toLocaleLowerCase();
  
// Фільтрація контактів залежно від значення фільтру
  const filterContacts = data.filter(contact => {
    return contact.name.toLocaleLowerCase().includes(normalizeFilter);
  });

  return (
    <ContactWriper>
      {filterContacts.map(contact => {
        return (
          <ContactItem key={nanoid()}>
            <p>
              {contact.name}: {contact.phone}
            </p>
            <ContactButton
              type="button"
              onClick={() => {
                onDeleteContact(contact.id);
              }}
            >
              Delete
            </ContactButton>
          </ContactItem>
        );
      })}
    </ContactWriper>
  );
};

export default ContactList;
