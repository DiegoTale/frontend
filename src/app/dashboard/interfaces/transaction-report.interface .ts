export interface TransactionReportInterface {
  id?: number;
  transaction_id?: number;
  product_cards_id?: number;
  type?: string;
  amount?: number;
  active?: string;
  created?: Date;
  updated?: Date;
}
