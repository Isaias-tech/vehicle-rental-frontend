import { Transaction } from './Reservations';
import { UserAccount } from './UserAccount';

export interface ClientTransactionHistory {
  client: UserAccount;
  transactions: Transaction[];
}
