import {OrderInterface} from './order.interface';

export interface CollectionsInterface {
  id: number;
  idCustomer: number;
  idOrders: OrderInterface[];
  title: string;
  status: number;
}
