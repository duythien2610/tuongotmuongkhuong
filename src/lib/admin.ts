export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost_price: number;
  unit: string;
  weight: string | null;
  image: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  id: string;
  product_id: string;
  warehouse: string;
  quantity: number;
  min_stock: number;
  batch_number: string | null;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
  products?: Product;
}

export interface SalesOrder {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string | null;
  customer_address: string | null;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  total_amount: number;
  payment_method: 'cod' | 'bank' | 'zalo' | 'cash';
  notes: string | null;
  created_at: string;
  updated_at: string;
  sales_order_items?: SalesOrderItem[];
}

export interface SalesOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  products?: Product;
}

export interface PurchaseOrder {
  id: string;
  order_number: string;
  supplier_name: string;
  supplier_phone: string | null;
  status: 'pending' | 'received' | 'partial' | 'cancelled';
  total_amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  purchase_order_items?: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  batch_number: string | null;
  expiry_date: string | null;
  created_at: string;
  products?: Product;
}

export const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
};

export const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-700' },
  shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
  received: { label: 'Đã nhận', color: 'bg-green-100 text-green-700' },
  partial: { label: 'Nhập một phần', color: 'bg-orange-100 text-orange-700' },
};

export const PAYMENT_LABELS: Record<string, string> = {
  cod: 'COD',
  bank: 'Chuyển khoản',
  zalo: 'ZaloPay',
  cash: 'Tiền mặt',
};

export function generateOrderNumber(prefix: string): string {
  const now = new Date();
  const dateStr = now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${dateStr}-${random}`;
}
