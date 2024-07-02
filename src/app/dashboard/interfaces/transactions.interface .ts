export interface TransactionInterface {
  id?: number;
  product_cards_id_sender?: number;
  product_cards_id_reciver?: number;
  description?: string;
  deferred_frecuency?: number;
  amount?: number;
  active?: string;
}
