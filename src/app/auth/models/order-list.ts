export interface OrdersList{
  pagination: any;
  data: Array<OrdersData>;
}

export interface OrdersData{
  id: number;
  billing_name: string;
  amount: number;
  date: string;
  order_status: string;
}
