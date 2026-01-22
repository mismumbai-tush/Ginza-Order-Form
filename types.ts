
export interface Customer {
  id: string;
  name: string;
  email: string;
  contact_no: string;
  address: string;
}

export interface Item {
  id: string;
  name: string;
}

export interface OrderItem {
  id: string;
  category: string;
  itemName: string;
  manualItem: boolean;
  color: string;
  width: string;
  uom: string;
  quantity: number;
  rate: number;
  discount: number;
  deliveryDate: string;
  transportName: string;
  remark: string;
  total: number;
}

export interface Order {
  id: string;
  orderDate: string;
  branch: string;
  salesPerson: string;
  customerPONo: string;
  customer: Customer | null;
  billingAddress: string;
  deliveryAddress: string;
  accountStatus: string;
  items: OrderItem[];
  timestamp: number;
}
