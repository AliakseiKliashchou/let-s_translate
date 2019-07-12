export interface OrderInterface {
  id: number;
  title: string;
  date: string;
  download: string;
  name: string;
  email: string;
  originalLanguage: string;
  translateLanguage: string;
  progress: number;
  review: boolean;
  tags: Array<any>;
  urgency: number;
  idCustomer: number;
}
