export enum Microfrontend {
  Contacts = 'mfe_contacts',
  Nav = 'mfe_nav'
}

export interface IMicrofrontend {
  name: Microfrontend;
  version: string;
  url: string;
}
