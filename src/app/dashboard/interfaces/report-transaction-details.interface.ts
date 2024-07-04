export enum TransactionDetailI {
  Accounts = 'Accounts',
  Clients = 'Clients',
  TransactionDetail = 'TransactionDetail',
}

export interface ReportTransactionDetails {
  id: number;
  account_id: number;
  type: string;
  number: string;
  expire_month: string;
  expire_year: string;
  cvv: string;
  amount: number;
  limit: number;
  active: string;
  created: Date;
  updated: Date;
  accounts: Accounts;
  transactionDetails: TransactionDetail[];
}

export interface Accounts {
  id: number;
  client_id: number;
  number: string;
  status: string;
  active: string;
  created: Date;
  updated: Date;
  clients: Clients;
}

export interface Clients {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  active: string;
  created: null;
  updated: null;
}

export interface TransactionDetail {
  id: number;
  transanction_id: number;
  products_cards_id: number;
  type: string;
  amount: number;
  active: string;
  created: Date;
  updated: Date;
}
