import { NumberInput } from '@angular/cdk/coercion';

export interface ReportsInterface {
  id?: number;
  sender_account_id?: number;
  sender_client_id?: number;
  reciver_client_id?: number;
  description?: string;
  amount?: number;
  active?: string;
}
