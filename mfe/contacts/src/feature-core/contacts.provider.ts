import { InjectStore } from '@fake-company/types';

import { contactsApi } from './contacts.api';

export const contactsProvider = (store: InjectStore) => {
  store.middlewareManager.add(contactsApi.middleware);
  store.reducerManager.add(contactsApi.reducerPath, contactsApi.reducer);
};
