export enum ContactType {
  Client = 'Client',
  Customer = 'Customer'
}

export interface IContact {
  id: string;
  name: string;
  rating: number;
  type: ContactType;
}
