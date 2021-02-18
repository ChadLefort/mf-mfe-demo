import { useEffect } from 'react';

import { store } from '../app/store';

const contactsProvider = async () => {
  const { contactsProvider } = await import('mfe_contacts/feature-core/contacts.provider');
  return { default: contactsProvider };
};

export function useRemoteProviders() {
  const setRemoteProviders = async () => {
    try {
      const promises = [contactsProvider()];
      const providers = await Promise.all(promises);

      providers.map(({ default: provider }) => provider(store));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setRemoteProviders();
  }, []);
}
