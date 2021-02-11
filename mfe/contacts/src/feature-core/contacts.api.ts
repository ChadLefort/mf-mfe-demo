import { IContact } from '@fake-company/types';
import { createApi } from '@rtk-incubator/rtk-query';
import { axiosBaseQuery } from '@fake-company/utils';

const type = 'contacts';

export const contactsApi = createApi({
  reducerPath: 'mfe/contacts',
  baseQuery: axiosBaseQuery({ baseUrl: '/api' }),
  entityTypes: [type],
  endpoints: (builder) => ({
    fetchContacts: builder.query<IContact[], void>({
      query: () => ({ url: '/contacts', method: 'get' }),
      provides: (result) => result.map(({ id }) => ({ type, id }))
    }),
    fetchContact: builder.query<IContact, string>({
      query: (id) => ({ url: `/contacts/${id}`, method: 'get' }),
      provides: (_, id) => [{ type, id }]
    }),
    addContact: builder.mutation<IContact, IContact>({
      query: (contact) => ({ url: '/contacts', method: 'post', data: contact }),
      invalidates: [type]
    }),
    updateContact: builder.mutation<IContact, Partial<IContact>>({
      query: (contact) => ({ url: `/contacts/${contact.id}`, method: 'put', data: contact }),
      invalidates: (_, { id }) => [{ type, id }]
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({ url: `/contacts/${id}`, method: 'delete' }),
      invalidates: (_, id) => [{ type, id }]
    })
  })
});

export const {
  useFetchContactsQuery,
  useFetchContactQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation
} = contactsApi;
