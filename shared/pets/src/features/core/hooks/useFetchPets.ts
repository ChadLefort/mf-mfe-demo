import { PetType } from '@pet-tracker/types';
import { useEffect } from 'react';

import { useAppDispatch, useTypedSelector } from '../../../common/reducer';
import { fetchPets, petsSelectors } from '../pets.slice';

export function useFetchPets(type: PetType) {
  const dispatch = useAppDispatch();
  const { isFetching, error } = useTypedSelector((state) => state.pets.core);
  const pets = useTypedSelector(petsSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchPets(type));
  }, [dispatch, type]);

  return { pets, isFetching, error };
}
