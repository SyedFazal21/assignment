export interface Summary {
  data: SummaryData;
}

export interface SummaryData {
  overview: Overview;
  summary: Array<OrderSummary>;
}

export interface Overview {
  total_earnings: Array<TotalEarnings>;
  average_sale: Array<AverageSales>;
  new_orders: Array<NewOrders>;
}

export interface TotalEarnings {
  total_earnings: Number;
}

export interface AverageSales {
  average_sale: Number;
}

export interface NewOrders {
  new_orders: Number;
}

export interface OrderSummary {
  order_status: string;
  count: Number;
}
