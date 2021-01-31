import { fetchPets, petsSelectors } from '../pets.slice';
import { PetType } from '../interface';
import { useAppDispatch, useTypedSelector } from '../../../common/reducer';
import { useEffect } from 'react';

export function useFetchPets(type: PetType) {
  const dispatch = useAppDispatch();
  const { isFetching, error } = useTypedSelector((state) => state.pets.core);
  const pets = useTypedSelector(petsSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchPets(type));
  }, [dispatch, type]);

  return { pets, isFetching, error };
}
