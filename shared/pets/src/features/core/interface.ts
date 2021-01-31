export enum PetType {
  Cat = 'Cat',
  Dog = 'Dog'
}

export interface IPet {
  id: string;
  name: string;
  age: string;
  type: PetType;
}
