export interface IContact {
  id: string; // unique

  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  company: string;

  city: string;
  district: string;
  street: string;
  address: string;
}

export interface IJsonContact {
  Tag: number;
  Subfield: string;
  Value: string;
}
