import { ContactType } from '@fake-company/types';
import { useEffect } from 'react';

import { useAppDispatch, useTypedSelector } from '../../../common/reducer';
import { fetchContacts, contactsSelectors } from '../contacts.slice';

export function useFetchContacts(type: ContactType[]) {
  const dispatch = useAppDispatch();
  const { isFetching, error } = useTypedSelector((state) => state.contacts.core);
  const contacts = useTypedSelector(contactsSelectors.selectAll);

  console.log(contacts);

  useEffect(() => {
    dispatch(fetchContacts(type));
  }, [dispatch, type]);

  return { contacts, isFetching, error };
}
