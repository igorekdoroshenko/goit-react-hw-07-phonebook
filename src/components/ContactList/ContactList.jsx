import React from 'react';
// import PropTypes from 'prop-types';
import { ContactWriper, ContactItem, ContactButton } from './ContactList.style';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

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
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter.filter);

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const normalizeFilter = filter.toLocaleLowerCase();

  const filterContacts = contacts.filter(contact => {
    return contact.name.toLocaleLowerCase().includes(normalizeFilter);
  });

  return (
    <ContactWriper>
      {filterContacts.map(contact => {
        return (
          <ContactItem key={nanoid()}>
            <p>
              {contact.name}: {contact.number}
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

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onDeleteContact: PropTypes.func.isRequired,
// };

export default ContactList;
