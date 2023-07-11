import { Form, Label, Button, Input } from './ContactForm.style'

import React, { useState } from 'react';
import { useAddContactMutation } from 'redux/contactsSlice';
import { useGetContactsQuery } from 'redux/contactsSlice';


export const ContactForm = () => {
  // Стан компонента
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  // Виклик хука `useAddContactMutation` для виконання мутації додавання контакту
  const [addContact] = useAddContactMutation();
  // Виклик хука `useGetContactsQuery` для отримання списку контактів
  const { data: contacts } = useGetContactsQuery();

  // Обробник зміни значень полів вводу
  const handleChange = e => {
    const { value, name } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;

      default:
        break;
    }
  };

    // Обробник подання форми
  const handleSubmit = evt => {
    evt.preventDefault();

    // Перевірка, чи існує контакт з таким же ім'ям
    if (contacts.find(contact => contact.name === name)) {
      return window.alert(`${name} is already in contacts.`);
    }
    // Виклик мутації додавання контакту з використанням значень з полів вводу
    addContact({ name, phone });

    // Скидання значень полів вводу
    reset();
  };
    // Скидання значень полів вводу
  const reset = () => {
    setName('');
    setPhone('');
  };

      return (
      <Form onSubmit={handleSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Phone
          <Input
            type="tel"
            name="phone"
            value={phone}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </Form>
    );

}



