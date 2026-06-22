-- Seed products
INSERT INTO products (name, sku, category, price, cost_price, unit, weight, image, description) VALUES
('Tương ớt truyền thống 250g', 'MK-250', 'Tương ớt', 35000, 20000, 'chai', '250g', '/images/products/z7953307386786_1a002dc5a9937730c04e101bdcd225f7.jpg', 'Chai nhựa truyền thống 250g - OCOP 3 Sao'),
('Tương ớt thủy tinh cao cấp 500g', 'MK-500G', 'Tương ớt', 65000, 38000, 'chai', '500g', '/images/products/z7953307390594_f5b855eeb25c4df8a3d77e6a1ee14fa5.jpg', 'Chai thủy tinh cao cấp 500g - OCOP 3 Sao'),
('Hộp quà tặng 3 chai OCOP 3 Sao', 'MK-GIFT3', 'Quà tặng', 169000, 95000, 'hộp', '750g', '/images/products/z7953307397468_1d44a348096d5f2a13917c6f568f91f4.jpg', 'Hộp quà tặng 3 chai OCOP 3 Sao'),
('Măng ớt Mường Khương', 'MK-MANG', 'Đặc sản', 55000, 32000, 'hũ', '300g', '/images/products/z7953307401054_c8061505a77564feea2c5825523e1d6b.jpg', 'Măng ớt đặc sản vùng cao'),
('Gia vị đặc sản vùng cao', 'MK-GIAVI', 'Gia vị', 42000, 24000, 'gói', '200g', '/images/products/z7953307406651_6f83a1cc6dbf98100152f18c42fd2276.jpg', 'Gia vị đặc sản Mường Khương');

-- Seed inventory
INSERT INTO inventory (product_id, warehouse, quantity, min_stock, batch_number, expiry_date)
SELECT id, 'Kho chính', 
  CASE sku 
    WHEN 'MK-250' THEN 156 
    WHEN 'MK-500G' THEN 89 
    WHEN 'MK-GIFT3' THEN 42 
    WHEN 'MK-MANG' THEN 67 
    WHEN 'MK-GIAVI' THEN 110 
  END,
  10,
  'MK-2026-001',
  '2027-06-01'
FROM products;

-- Seed sample sales orders
INSERT INTO sales_orders (order_number, customer_name, customer_phone, customer_address, status, total_amount, payment_method, notes) VALUES
('DH-20260610-0001', 'Nguyễn Văn An', '0912345678', 'Hà Nội', 'delivered', 70000, 'cod', 'Giao nhanh'),
('DH-20260611-0002', 'Trần Thị Bình', '0987654321', 'TP.HCM', 'shipping', 169000, 'bank', 'Quà tặng'),
('DH-20260612-0003', 'Lê Minh Châu', '0909123456', 'Đà Nẵng', 'confirmed', 130000, 'zalo', ''),
('DH-20260613-0004', 'Phạm Đức Dũng', '0977123456', 'Hải Phòng', 'pending', 35000, 'cod', '');

-- Seed sales order items
INSERT INTO sales_order_items (order_id, product_id, quantity, unit_price, total_price)
SELECT so.id, p.id, 
  CASE so.order_number
    WHEN 'DH-20260610-0001' THEN 2
    WHEN 'DH-20260611-0002' THEN 1
    WHEN 'DH-20260612-0003' THEN 2
    WHEN 'DH-20260613-0004' THEN 1
  END,
  CASE so.order_number
    WHEN 'DH-20260610-0001' THEN 35000
    WHEN 'DH-20260611-0002' THEN 169000
    WHEN 'DH-20260612-0003' THEN 65000
    WHEN 'DH-20260613-0004' THEN 35000
  END,
  CASE so.order_number
    WHEN 'DH-20260610-0001' THEN 70000
    WHEN 'DH-20260611-0002' THEN 169000
    WHEN 'DH-20260612-0003' THEN 130000
    WHEN 'DH-20260613-0004' THEN 35000
  END
FROM sales_orders so
JOIN products p ON p.sku = CASE so.order_number
    WHEN 'DH-20260610-0001' THEN 'MK-250'
    WHEN 'DH-20260611-0002' THEN 'MK-GIFT3'
    WHEN 'DH-20260612-0003' THEN 'MK-500G'
    WHEN 'DH-20260613-0004' THEN 'MK-250'
  END;

-- Seed sample purchase orders
INSERT INTO purchase_orders (order_number, supplier_name, supplier_phone, status, total_amount, notes) VALUES
('NH-20260601-0001', 'Hợp tác xã Mường Khương', '0213123456', 'received', 120000, 'Nhập lô tháng 6'),
('NH-20260608-0002', 'Nhà cung cấp Lào Cai', '0213987654', 'received', 95000, 'Nhập gia vị');

-- Seed purchase order items
INSERT INTO purchase_order_items (order_id, product_id, quantity, unit_cost, total_cost, batch_number, expiry_date)
SELECT po.id, p.id,
  CASE po.order_number
    WHEN 'NH-20260601-0001' THEN 50
    WHEN 'NH-20260608-0002' THEN 30
  END,
  CASE po.order_number
    WHEN 'NH-20260601-0001' THEN 20000
    WHEN 'NH-20260608-0002' THEN 24000
  END,
  CASE po.order_number
    WHEN 'NH-20260601-0001' THEN 1000000
    WHEN 'NH-20260608-0002' THEN 720000
  END,
  'MK-2026-001',
  '2027-06-01'
FROM purchase_orders po
JOIN products p ON p.sku = CASE po.order_number
    WHEN 'NH-20260601-0001' THEN 'MK-250'
    WHEN 'NH-20260608-0002' THEN 'MK-GIAVI'
  END;
