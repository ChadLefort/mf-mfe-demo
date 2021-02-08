import { contactsSelectors, fetchContacts } from '../contacts.slice';
import { ContactType } from '@fake-company/types';
import { useAppDispatch, useTypedSelector } from '../../app/reducer';
import { useEffect } from 'react';

export function useFetchContacts(type: ContactType[]) {
  const dispatch = useAppDispatch();
  const { isFetching, error } = useTypedSelector((state) => state.contacts.core);
  const contacts = useTypedSelector(contactsSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchContacts(type));
  }, [dispatch, type]);

  return { contacts, isFetching, error };
}
