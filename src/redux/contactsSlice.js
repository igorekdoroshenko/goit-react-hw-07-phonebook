// import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

// const contactsPhone = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: { contacts: [...contactsPhone] },
//   reducers: {
//     addContact: {
//       reducer(state, action) {
//         state.contacts.push(action.payload);
//       },
//       prepare(name, number) {
//         return {
//           payload: {
//             id: nanoid(),
//             name,
//             number,
//           },
//         };
//       },
//     },
//     deleteContact(state, action) {
//       const index = state.contacts.findIndex(
//         task => task.id === action.payload
//       );
//       state.contacts.splice(index, 1);
//     },
//   },
// });

// export const { addContact, deleteContact } = contactsSlice.actions;

// //Використовуємо RTK Query для створення API
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const contactsApi = createApi({
//   reducerPath: 'contacts',
//   //Використовуємо базовий запит baseQuery
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://64a7043d096b3f0fcc80fb16.mockapi.io',
//   }),
//   endpoints: builder => ({
//     //Конфігурація запиту для отримання контактів з mockapi.io
//     getContacts: builder.query({
//       query: () => '/contacts',
//       //використовуєм тег providesTags для оновлення контактів
//       providesTags: ['Contact'],
//     }),
//     //// Оновлюєм тег 'contacts' після додавання контакту
//     addContact: builder.mutation({
//       query: values => ({
//         url: '/contacts',
//         method: 'POST',
//         body: values,
//       }),
//       //використовуєм тег invalidatesTags для видалення контакту
//       invalidatesTags: ['Contact'],
//     }),
//     //// Оновлюєм тег 'contacts' після видалення контакту.
//     deleteContact: builder.mutation({
//       query: id => ({
//         url: `/contacts/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Contact'],
//     }),
//   }),
// });
// // Експортування необхідних хуків для взаємодії з API
// export const {
//   useGetContactsQuery,
//   useAddContactMutation,
//   useDeleteContactMutation,
// } = contactsApi;

import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { fetchContacts, addContacts, deleteContacts } from './operations';

const getContacts = type =>
  isAnyOf(fetchContacts[type], addContacts[type], deleteContacts[type]);

const initialState = { items: [], isLoading: false, error: null };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addMatcher(getContacts('pending'), state => {
        state.isLoading = true;
      })
      .addMatcher(getContacts('rejected'), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(getContacts('fulfilled'), state => {
        state.isLoading = false;
        state.error = null;
      }),
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
