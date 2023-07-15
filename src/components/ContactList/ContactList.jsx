// import { ContactWriper, ContactItem, ContactButton } from './ContactList.style';
// import React from 'react';

// import { nanoid } from 'nanoid';
// import { useSelector } from 'react-redux';
// import {
//   useGetContactsQuery,
//   useDeleteContactMutation,
// } from 'redux/contactsSlice';
// import { selectFilter } from 'redux/selectors';

// const ContactList = () => {
//   // const dispatch = useDispatch();

//   // Виклик хука `useGetContactsQuery` для отримання списку контактів
//   const { data } = useGetContactsQuery();

//   // const contacts = useSelector(state => state.contacts.contacts);
//   // const filter = useSelector(state => state.filter.filter);

//   // Виклик хука `useDeleteContactMutation` для виконання мутації видалення контакту
//   const [deleteContact] = useDeleteContactMutation();
//   // Виклик селектора `selectFilter` для отримання значення фільтру
//   const filter = useSelector(selectFilter);

//   // Обробник видалення контакту
//   const onDeleteContact = id => {
//     // dispatch(deleteContact(id));
//     deleteContact(id);
//   };

//   if (!data) {
//     return;
//   }

//   // Нормалізація значення фільтру
//   const normalizeFilter = filter.toLocaleLowerCase();

// // Фільтрація контактів залежно від значення фільтру
//   const filterContacts = data.filter(contact => {
//     return contact.name.toLocaleLowerCase().includes(normalizeFilter);
//   });

//   return (
//     <ContactWriper>
//       {filterContacts.map(contact => {
//         return (
//           <ContactItem key={nanoid()}>
//             <p>
//               {contact.name}: {contact.phone}
//             </p>
//             <ContactButton
//               type="button"
//               onClick={() => {
//                 onDeleteContact(contact.id);
//               }}
//             >
//               Delete
//             </ContactButton>
//           </ContactItem>
//         );
//       })}
//     </ContactWriper>
//   );
// };

// export default ContactList;

import React from 'react';
import { ContactWriper, ContactItem, ContactButton } from './ContactList.style';
import { useSelector, useDispatch } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';
import { deleteContacts } from 'redux/operations';

// Компонент списку контактів
const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();
  return (
    <ContactWriper>
      {contacts.map(contact => (
        <ContactItem key={contact.id}>
          {contact.name + ' : ' + contact.phone}
          {
            <ContactButton
              type="button"
              name="delete"
              onClick={() => dispatch(deleteContacts(contact.id))}
            >
              Delete
            </ContactButton>
          }
        </ContactItem>
      ))}
    </ContactWriper>
  );
};

export default ContactList;
