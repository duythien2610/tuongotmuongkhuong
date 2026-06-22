-- Create sequences first
CREATE SEQUENCE sales_order_seq START 1;
CREATE SEQUENCE purchase_order_seq START 1;

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'Tương ớt',
  price INTEGER NOT NULL,
  cost_price INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'chai',
  weight TEXT,
  image TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Inventory (warehouse stock)
CREATE TABLE inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  warehouse TEXT NOT NULL DEFAULT 'Kho chính',
  quantity INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 10,
  batch_number TEXT,
  expiry_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(product_id, warehouse, batch_number)
);

-- Sales orders
CREATE TABLE sales_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_address TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipping', 'delivered', 'cancelled')),
  total_amount INTEGER NOT NULL DEFAULT 0,
  payment_method TEXT DEFAULT 'cod' CHECK (payment_method IN ('cod', 'bank', 'zalo', 'cash')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sales order items
CREATE TABLE sales_order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES sales_orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Purchase orders (nhập hàng)
CREATE TABLE purchase_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  supplier_name TEXT NOT NULL,
  supplier_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'received', 'partial', 'cancelled')),
  total_amount INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Purchase order items
CREATE TABLE purchase_order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_cost INTEGER NOT NULL,
  total_cost INTEGER NOT NULL,
  batch_number TEXT,
  expiry_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "select_products" ON products FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_products" ON products FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_products" ON products FOR DELETE TO authenticated USING (true);

CREATE POLICY "select_inventory" ON inventory FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_inventory" ON inventory FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_inventory" ON inventory FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_inventory" ON inventory FOR DELETE TO authenticated USING (true);

CREATE POLICY "select_sales_orders" ON sales_orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_sales_orders" ON sales_orders FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_sales_orders" ON sales_orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_sales_orders" ON sales_orders FOR DELETE TO authenticated USING (true);

CREATE POLICY "select_sales_order_items" ON sales_order_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_sales_order_items" ON sales_order_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_sales_order_items" ON sales_order_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_sales_order_items" ON sales_order_items FOR DELETE TO authenticated USING (true);

CREATE POLICY "select_purchase_orders" ON purchase_orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_purchase_orders" ON purchase_orders FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_purchase_orders" ON purchase_orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_purchase_orders" ON purchase_orders FOR DELETE TO authenticated USING (true);

CREATE POLICY "select_purchase_order_items" ON purchase_order_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_purchase_order_items" ON purchase_order_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_purchase_order_items" ON purchase_order_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_purchase_order_items" ON purchase_order_items FOR DELETE TO authenticated USING (true);
