// ============================================
// THÔNG TIN LIÊN HỆ CHÍNH THỨC - HTX HOA LỢI
// ============================================
export const COMPANY_INFO = {
  name: 'HTX Hoa Lợi',
  brand: 'Tương Ớt Mường Khương',
  hotline: '0912 518 745',
  hotlineLink: 'tel:0912518745',
  email: 'hoaloimk@gmail.com',
  address: 'Tổ dân phố Cánh Chín, phường Lào Cai, thành phố Lào Cai, tỉnh Lào Cai, Việt Nam',
  ocop: 'OCOP 3 Sao',
  zaloLink: 'https://zalo.me/0912518745',
  facebookLink: 'https://facebook.com/hoaloimk',
};

// ============================================
// THÔNG TIN TÀI KHOẢN NGÂN HÀNG - VIETQR
// ============================================
export const BANK_INFO = {
  bankId: 'vietinbank',
  bankName: 'Vietinbank',
  accountNo: '101870000000',
  accountName: 'HTX HOA LOI',
};

// ============================================
// THÔNG TIN PHÍ VẬN CHUYỂN
// ============================================
export const SHIPPING_INFO = {
  haNoi: {
    name: 'Tuyến Hà Nội',
    feePer500ml: 1000,
    description: 'Gửi theo xe, phí cước 1.000đ/chai 500ml',
  },
  mienNam: {
    name: 'Tuyến Miền Nam & Tỉnh khác',
    feePer500ml: 3000,
    description: 'Phí ship 3.000đ/chai 500ml',
  },
  deliveryTime: {
    haNoi: '1-2 ngày',
    mienNam: '3-5 ngày (chậm nhất 7 ngày)',
  },
  packaging: 'Màng chống sốc bọc khí kỹ lưỡng, cam kết không bục nắp/phụt ga',
  returnPolicy: 'Đổi trả hàng hóa, hoàn tiền 100% nếu hư hại do vận chuyển',
};

// ============================================
// HẠN SỬ DỤNG & BẢO QUẢN
// ============================================
export const STORAGE_INFO = {
  shelfLife: '12 tháng kể từ ngày sản xuất',
  beforeOpen: 'Bảo quản nơi khô ráo, thoáng mát',
  afterOpen: 'Để trong ngăn mát tủ lạnh để giữ vị chua cay vừa phải, không lên men quá nhanh',
};

// ============================================
// THÔNG TIN CHẤT BẢO QUẢN
// ============================================
export const PRESERVATIVE_INFO = {
  short: '100% không phẩm màu nhân tạo, không chất tạo cay hóa học. Chất bảo quản sử dụng đúng quy định Bộ Y tế.',
  full: 'Sản phẩm cam kết 100% không sử dụng phẩm màu nhân tạo, không chất tạo ngọt hay tạo mùi hóa học (màu đỏ và vị cay nồng đặc trưng đều từ ớt tươi tự nhiên). Về chất bảo quản, sản phẩm sử dụng chất bảo quản với liều lượng đạt chuẩn, đúng quy định cho phép của Bộ Y tế và được in thông tin rõ ràng trên nhãn chai để bảo đảm an toàn sức khỏe và chất lượng vệ sinh thực phẩm tốt nhất.',
};

export interface ProductVariant {
  id: number;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  stock: number;
}

export interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  images: string[];
}

export interface Combo {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  items: string[];
  image: string;
  tag?: string;
}

// Hình ảnh sản phẩm Tương Ớt Mường Khương - ảnh thật từ HTX Hoa Lợi
const IMG = {
  // Sản phẩm tương ớt - ảnh chai cao cấp
  sauce1: '/images/products/z7953307386786_1a002dc5a9937730c04e101bdcd225f7.jpg',
  sauce2: '/images/products/z7953307390594_f5b855eeb25c4df8a3d77e6a1ee14fa5.jpg',
  sauce3: '/images/products/z7953307397468_1d44a348096d5f2a13917c6f568f91f4.jpg',
  // Vườn ớt & thu hoạch thực tế (chỉ dùng cho ProcessSection/Story)
  freshChili1: '/images/products/z7953307401054_c8061505a77564feea2c5825523e1d6b.jpg',
  freshChili2: '/images/products/z7953307406651_6f83a1cc6dbf98100152f18c42fd2276.jpg',
  // Quy trình chế biến thực tế (chỉ dùng cho ProcessSection)
  cooking1: '/images/products/z7953307421875_ebf8d48040f3587e51d8bef821c2704f.jpg',
  cooking2: '/images/products/z7953307418575_2216ce14cbfbabff50b774645638b889.jpg',
  // Hộp quà & sản phẩm đóng gói cao cấp
  giftBox: '/images/products/z7953307412608_f1e4ec4882a2414106174b4450ab1f33.jpg',
  // Vùng cao Tây Bắc - Mường Khương (dùng cho Story/Process)
  highlands1: '/images/products/z7953307406651_6f83a1cc6dbf98100152f18c42fd2276.jpg',
  highlands2: '/images/products/z7953307401054_c8061505a77564feea2c5825523e1d6b.jpg',
  highlands3: '/images/products/z7953307412608_f1e4ec4882a2414106174b4450ab1f33.jpg',
  mountain: '/images/products/z7953307406651_6f83a1cc6dbf98100152f18c42fd2276.jpg',
  // Avatar khách hàng
  avatar1: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  avatar2: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
  avatar3: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
  avatar4: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',

  // 9 Hình ảnh mới cập nhật của HTX Hoa Lợi
  exhibition1: '/images/products/z7953308659522_b05c47a09227d9828688c08e3612136c.jpg',
  exhibition2: '/images/products/z7953308665092_63e5be296a7a5607b763b438fc3795d5.jpg',
  exhibition3: '/images/products/z7953308673153_ef391470872f7db1521a26d82b92e31e.jpg',
  fairEvent: '/images/products/z7953308677559_77727aa7a36c3c308c7bb0e306e2d1d6.jpg',
  deputyPM: '/images/products/z7953308681901_374c79fd57f73942116dbd7dae90564a.jpg',
  businessLicense: '/images/products/z7953310855126_fade2e0bd8953af19bcc6eedd5aea910.jpg',
  ocopCert: '/images/products/z7953312318224_183439eb52b1750abc9b6dc1c2322041.jpg',
  foodSafetyCert: '/images/products/z7953315372291_e96d043b7326f59917c6754df0ba900a.jpg',
  storyDoc: '/images/products/z7953318306814_66bec2265b99c05db821844b656e2f64.jpg',

  // Hình ảnh đặc sản từ Unsplash
  mangOt: 'https://images.unsplash.com/photo-1590779037693-8bc105649d2c?q=80&w=600',
  thitChua: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600',
};

export const PRODUCT_VARIANTS: ProductVariant[] = [
  {
    id: 1,
    name: 'Chai nhựa truyền thống',
    weight: '250ml',
    price: 30000,
    originalPrice: 45000,
    image: IMG.sauce1,
    description: 'Chai nhựa truyền thống, tiện lợi, phù hợp sử dụng hàng ngày',
    stock: 156,
  },
  {
    id: 2,
    name: 'Chai thủy tinh cao cấp',
    weight: '500ml',
    price: 55000,
    originalPrice: 80000,
    image: IMG.sauce2,
    description: 'Chai thủy tinh cao cấp, quà tặng sang trọng, bảo quản tốt hơn',
    stock: 89,
  },
  {
    id: 3,
    name: 'Hộp quà tặng 3 chai',
    weight: '1000ml',
    price: 140000,
    originalPrice: 170000,
    image: IMG.giftBox,
    description: 'Hộp quà tặng 3 chai (2 chai 250ml + 1 chai 500ml), đóng gói sang trọng, phù hợp biếu tặng',
    stock: 42,
  },
];

export const PRODUCT_IMAGES = [
  IMG.sauce1,
  IMG.sauce2,
  IMG.sauce3,
  IMG.cooking1,
  IMG.giftBox,
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Nguyễn Minh Anh',
    avatar: IMG.avatar1,
    rating: 5,
    date: '15/05/2026',
    content: 'Tương ớt ngon thật, cay vừa, thơm mùi tỏi. Gia đình tôi ăn thử liền đặt thêm 3 chai. Đóng gói cẩn thận, giao hàng nhanh.',
    images: [IMG.sauce1],
  },
  {
    id: 2,
    name: 'Trần Văn Hùng',
    avatar: IMG.avatar2,
    rating: 5,
    date: '10/05/2026',
    content: 'Đặc sản đúng kiểu Mường Khương! Cay thơm, màu đỏ tự nhiên, không phẩm màu. Đã mua lần 3 rồi.',
    images: [],
  },
  {
    id: 3,
    name: 'Lê Thị Hoa',
    avatar: IMG.avatar3,
    rating: 4,
    date: '05/05/2026',
    content: 'Tương ớt rất ngon, hợp với bún phở. Giao hàng hơi lâu 1 ngày nhưng bù lại sản phẩm chất lượng.',
    images: [],
  },
  {
    id: 4,
    name: 'Phạm Đức Thắng',
    avatar: IMG.avatar4,
    rating: 5,
    date: '28/04/2026',
    content: 'Mua hộp quà biếu sếp, sếp khen ngon lắm. Bao bì đẹp, sang trọng. Sẽ mua lại!',
    images: [IMG.giftBox],
  },
];

export const COMBOS: Combo[] = [
  {
    id: 1,
    name: 'Combo Gia đình',
    price: 115000,
    originalPrice: 155000,
    items: ['2 chai 250ml', '1 chai 500ml'],
    image: IMG.sauce3,
    tag: 'Phổ biến',
  },
  {
    id: 2,
    name: 'Combo Nhà hàng',
    price: 300000,
    originalPrice: 420000,
    items: ['6 chai 500ml', 'Ưu đãi đặc biệt'],
    image: IMG.sauce3,
    tag: 'Giá tốt',
  },
  {
    id: 3,
    name: 'Hộp quà OCOP 3 Sao',
    price: 140000,
    originalPrice: 170000,
    items: ['Hộp quà 3 chai', 'Túi giấy cao cấp'],
    image: IMG.sauce3,
    tag: 'Quà tặng',
  },
  {
    id: 4,
    name: 'Combo Tiết kiệm',
    price: 120000,
    originalPrice: 180000,
    items: ['4 chai 250ml', 'Freeship toàn quốc'],
    image: IMG.sauce3,
    tag: 'Tiết kiệm 33%',
  },
];

export const FAQ_DATA = [
  {
    question: 'Tương ớt này có cay lắm không em?',
    answer: 'Dạ, sản phẩm được làm từ ớt tươi nguyên chất, ớt được trồng tại xã Mường Khương và xã Bản Lầu thêm tỏi vào cho thơm, không pha trộn các thành phần khác nên có độ cay nồng và đậm đà hơn hẳn tương ớt công nghiệp thông thường ạ. Những ai ăn được cay sẽ thấy rất ngon và chuẩn vị ạ.',
  },
  {
    question: 'Vị của nó có ngọt như tương ớt Chinsu không?',
    answer: 'Dạ không ngọt ạ. Tương ớt Mường Khương thiên về vị cay tự nhiên, chua nhẹ do lên men và thơm nồng hương vị tự nhiên của núi rừng Tây Bắc. Nếu mình không ăn được quá cay, chị có thể pha thêm chút đường khi ăn để giảm độ cay và tạo độ ngọt theo ý muốn nhé ạ.',
  },
  {
    question: 'Ăn kèm với món gì thì ngon nhất?',
    answer: 'Dạ, tương ớt Mường Khương chấm hay nấu đều ngon, cụ thể:\n- Ăn kèm bún, phở, miến, mỳ tôm: Giúp nước dùng thơm nồng và cay chuẩn vị.\n- Món chấm: Ngon nhất với thịt trâu sấy, thịt lợn sấy, hải sản, nem chua, thịt lợn luộc, mực khô, đồ nướng; chấm rau củ luộc cũng rất đưa cơm ạ.\n- Chế biến: Dùng làm gia vị tẩm ướp, xào nấu hoặc kho cá giúp khử tanh và tạo vị cay ấm.',
  },
  {
    question: 'Cách bảo quản tương ớt như thế nào? Có cần bỏ tủ lạnh không?',
    answer: 'Dạ, hạn sử dụng sản phẩm là 12 tháng (ghi rõ trên bao bì). Khi chưa mở nắp mình có thể để nơi thoáng mát. Sau khi đã mở nắp chai, cách bảo quản tốt nhất là để trong ngăn mát tủ lạnh để giữ vị chua cay vừa phải, không bị lên men quá nhanh, giữ màu ớt đẹp hơn và đảm bảo vệ sinh an toàn thực phẩm ạ.',
  },
  {
    question: 'Trẻ em mấy tuổi thì ăn được loại này?',
    answer: 'Dạ, tương ớt Mường Khương hiện chưa có khuyến cáo về độ tuổi sử dụng cụ thể. Sản phẩm có độ cay khá lớn từ ớt thóc tự nhiên, nên việc dùng được hay không sẽ tùy thuộc hoàn toàn vào khả năng ăn cay của từng bé ạ. Về thành phần sản phẩm thì tuyệt đối an toàn và lành tính cho người tiêu dùng ạ.',
  },
  {
    question: 'Tương ớt này có pha phẩm màu hay chất bảo quản không?',
    answer: 'Dạ không pha phẩm màu, không dùng chất tạo cay hay tạo mùi nhân tạo ạ (màu đỏ và độ cay thơm đều từ ớt tươi tự nhiên 100%). Về chất bảo quản: Sản phẩm có sử dụng chất bảo quản với liều lượng đạt chuẩn, đúng quy định cho phép của Bộ Y tế và có in thông tin rõ ràng trên bao bì để đảm bảo an toàn cho sức khỏe ạ.',
  },
  {
    question: 'Thành phần chính gồm những gì?',
    answer: 'Dạ thành phần chính gồm có: ớt tươi nguyên chất (ớt thóc vùng cao Mường Khương), tỏi, muối, nước, rượu và các gia vị thảo mộc tự nhiên núi rừng đặc trưng ạ.',
  },
  {
    question: 'Giá bán sản phẩm như thế nào shop?',
    answer: 'Dạ, tương ớt Mường Khương có giá bán theo từng dung tích niêm yết rõ ràng như sau ạ:\n- Chai 500ml: 55.000đ\n- Chai 250ml: 30.000đ',
  },
  {
    question: 'Ship tỉnh xa (vào TP.HCM/ miền Tây...) thì mất bao lâu? Có sợ bị hỏng không?',
    answer: 'Dạ, ship đi các tỉnh xa thường mất khoảng từ 3 đến 5 ngày (chậm nhất là 7 ngày) ạ. Chị hoàn toàn yên tâm không sợ tương ớt bị hỏng vì sản phẩm đã được lên men ổn định, đồng thời trong thành phần có sẵn muối và rượu giúp bảo quản tự nhiên nên đi đường dài thoải mái ạ.',
  },
  {
    question: 'Đi đường xa bưu tá quăng quật có sợ bị bục nắp, vỡ chai hay phụt ga không?',
    answer: 'Dạ bên em luôn đóng gói hàng hóa cực kỳ kỹ lưỡng và có màng chống sốc bọc khí nên đi đường cam kết không bị phụt ga hay bục nắp. Trong trường hợp không may, nếu có bất kì vấn đề hư hại nào do vận chuyển, bên em áp dụng chính sách đổi trả hàng hóa và hoàn tiền 100% cho mình ngay ạ.',
  },
  {
    question: 'Phí ship tính thế nào vậy shop?',
    answer: 'Dạ phí ship bên em áp dụng như sau ạ:\n- Tuyến Hà Nội: Gửi theo xe (do chưa có kho chứa), phí cước là 1.000đ/chai 500ml (Bên em đang tính phương án gom các nhà phân phối lại để giảm chi phí cước này xuống ạ).\n- Tuyến Miền Nam: Phí ship là 3.000đ/chai 500ml. Cước ship thực tế có thể thay đổi nhẹ tùy thuộc vào biến động xăng dầu của đơn vị vận chuyển tại thời điểm giao hàng ạ.',
  },
  {
    question: 'Sản phẩm này nguồn gốc xuất xứ rõ ràng không, có giấy tờ gì không?',
    answer: 'Dạ chuẩn gốc từ Hợp tác xã kinh doanh tổng hợp huyện Mường Khương, tỉnh Lào Cai ạ. Sản phẩm được đăng ký nhãn hiệu từ năm 2006, có đầy đủ chứng nhận Vệ sinh an toàn thực phẩm (VSATTP), chứng nhận OCOP 3 sao cấp tỉnh, sản phẩm theo chuỗi và đủ điều kiện vào các siêu thị nên chị hoàn toàn yên tâm về nguồn gốc xuất xứ ạ.',
  },
  {
    question: 'Shop có bán qua những kênh nào? Có mua sỉ được không?',
    answer: 'Dạ bên em có bán trực tuyến qua website, giao hàng toàn quốc và phối hợp qua các nhà phân phối chính thức. Nếu mình có nhu cầu mua sỉ hoặc làm đại lý phân phối, chị để lại số điện thoại để bộ phận kinh doanh liên hệ gửi chính sách chiết khấu tốt nhất ạ, bên em cam kết mua càng nhiều giá càng ưu đãi.',
  },
  {
    question: 'Sản phẩm có đầy đủ nhãn mác, hạn sử dụng rõ ràng trên chai không?',
    answer: 'Dạ có đầy đủ ạ. Toàn bộ sản phẩm xuất từ phân xưởng của Hợp tác xã đều được đóng chai nhựa dày dặn, có nhãn mác thương hiệu độc quyền, ghi rõ thành phần, hướng dẫn bảo quản và ngày sản xuất/hạn sử dụng dập nổi trên bao bì ạ (Hạn sử dụng 12 tháng kể từ NSX).',
  },
];

export const RELATED_PRODUCTS = [
  {
    id: 1,
    name: 'Măng ớt Mường Khương',
    price: 55000,
    originalPrice: 70000,
    image: IMG.freshChili1,
    rating: 4.8,
    sold: 180,
  },
  {
    id: 2,
    name: 'Gia vị đặc sản vùng cao',
    price: 42000,
    originalPrice: 55000,
    image: IMG.cooking2,
    rating: 4.7,
    sold: 120,
  },
  {
    id: 3,
    name: 'Hộp quà OCOP 3 Sao Lào Cai',
    price: 289000,
    originalPrice: 380000,
    image: IMG.giftBox,
    rating: 4.9,
    sold: 95,
  },
  {
    id: 4,
    name: 'Tương ớt đặc biệt',
    price: 75000,
    originalPrice: 95000,
    image: IMG.sauce3,
    rating: 4.6,
    sold: 210,
  },
];

export const PRODUCTION_STEPS = [
  {
    step: 1,
    title: 'Canh tác vùng cao',
    description: 'Ớt được trồng trên sườn núi Mường Khương, đất đỏ bazan giàu dinh dưỡng, không thuốc trừ sâu',
    image: '/images/products/z7953307401054_c8061505a77564feea2c5825523e1d6b.jpg',
  },
  {
    step: 2,
    title: 'Thu hoạch thủ công',
    description: 'Ớt chín đỏ rực được hái tay giữa núi đồi Tây Bắc hùng vĩ, chọn lọc từng quả đạt chuẩn',
    image: '/images/products/z7953307406651_6f83a1cc6dbf98100152f18c42fd2276.jpg',
  },
  {
    step: 3,
    title: 'Tập kết nguyên liệu',
    description: 'Ớt tươi thu hoạch được tập kết và phân loại theo chất lượng, loại bỏ quả không đạt tiêu chuẩn',
    image: '/images/products/z7953307412608_f1e4ec4882a2414106174b4450ab1f33.jpg',
  },
  {
    step: 4,
    title: 'Phân loại thủ công',
    description: 'Đội thợ lành nghề của HTX Hoa Lợi tỉ mỉ lựa chọn, loại bỏ cuống và phân loại từng quả ớt',
    image: '/images/products/z7953307418575_2216ce14cbfbabff50b774645638b889.jpg',
  },
  {
    step: 5,
    title: 'Xay & chế biến',
    description: 'Ớt được xay nghiền theo bí quyết gia truyền, phối trộn gia vị đặc trưng tạo hương vị đậm đà',
    image: '/images/products/z7953307421875_ebf8d48040f3587e51d8bef821c2704f.jpg',
  },
  {
    step: 6,
    title: 'Kiểm định & Đóng chai',
    description: 'Tương ớt được kiểm tra chất lượng OCOP 3 Sao, rót chai thủ công, dán nhãn và niêm phong',
    image: IMG.sauce1,
  },
  {
    step: 7,
    title: 'Phân phối toàn quốc',
    description: 'Thành phẩm được đóng gói cẩn thận và vận chuyển đến tay khách hàng trên toàn quốc',
    image: IMG.sauce2,
  },
];

// Story section images - Vùng cao Mường Khương
export const STORY_IMAGES = {
  highlands1: IMG.highlands1,
  highlands2: IMG.highlands2,
  highlands3: IMG.highlands3,
  mountain: IMG.mountain,
  cooking: IMG.cooking1,
  chili: IMG.freshChili1,
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN') + ' VNĐ';
};

export const calculateDiscount = (price: number, originalPrice: number): number => {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

// ============================================
// ALL_PRODUCTS - Danh sách sản phẩm dùng chung
// ============================================
export interface Product {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  sold: number;
  stock: number;
  badge?: string;
  badgeVariant?: 'bestseller' | 'new' | 'gift' | 'ocop';
  weight?: string;
  featured?: boolean;
  slug: string;
}

export const ALL_PRODUCTS: Product[] = [
  // Tương ớt
  {
    id: 'sauce-250',
    name: 'Tương Ớt Truyền Thống',
    category: 'tuong-ot',
    categoryLabel: 'Tương ớt',
    price: 30000,
    originalPrice: 45000,
    image: IMG.sauce1,
    description: 'Tương ớt truyền thống từ ớt thóc tươi, vị cay nồng đậm đà, chua nhẹ tự nhiên, màu đỏ tự nhiên 100%.',
    rating: 4.9, reviews: 128, sold: 250, stock: 156,
    badge: 'Best Seller', badgeVariant: 'bestseller',
    weight: '250ml',
    featured: true,
    slug: 'tuong-ot-truyen-thong',
  },
  {
    id: 'sauce-500',
    name: 'Tương Ớt Thủy Tinh Cao Cấp',
    category: 'tuong-ot',
    categoryLabel: 'Tương ớt',
    price: 55000,
    originalPrice: 80000,
    image: IMG.sauce2,
    description: 'Chai thủy tinh cao cấp, bảo quản tốt hơn, phù hợp biếu tặng. Vị cay nồng đặc trưng.',
    rating: 4.9, reviews: 94, sold: 180, stock: 89,
    badge: 'OCOP 3 Sao', badgeVariant: 'ocop',
    weight: '500ml',
    featured: true,
    slug: 'tuong-ot-thuy-tinh-cao-cap',
  },
  {
    id: 'sauce-garlic',
    name: 'Tương Ớt Tỏi Bản Địa',
    category: 'tuong-ot',
    categoryLabel: 'Tương ớt',
    price: 55000,
    originalPrice: 70000,
    image: IMG.sauce2,
    description: 'Kết hợp ớt Mường Khương và tỏi bản địa, vị cay thơm lừng, đậm đà hương vị núi rừng.',
    rating: 4.8, reviews: 72, sold: 145, stock: 112,
    badge: 'Mới', badgeVariant: 'new',
    weight: '250ml',
    slug: 'tuong-ot-toi-ban-dia',
  },
  // Hộp quà
  {
    id: 'gift-box-3',
    name: 'Hộp Quà Tặng 3 Chai',
    category: 'hop-qua',
    categoryLabel: 'Hộp quà',
    price: 140000,
    originalPrice: 170000,
    image: IMG.sauce3,
    description: 'Hộp quà sang trọng gồm 3 chai tương ớt (2 chai 250ml + 1 chai 500ml), túi giấy cao cấp.',
    rating: 4.9, reviews: 58, sold: 95, stock: 42,
    badge: 'Quà tặng', badgeVariant: 'gift',
    weight: '1000ml',
    featured: true,
    slug: 'hop-qua-tang-3-chai',
  },
  {
    id: 'gift-box-ocop',
    name: 'Hộp Quà OCOP 3 Sao',
    category: 'hop-qua',
    categoryLabel: 'Hộp quà',
    price: 289000,
    originalPrice: 380000,
    image: IMG.sauce3,
    description: 'Hộp quà cao cấp với bao bì OCOP, phù hợp biếu tặng doanh nghiệp, đối tác.',
    rating: 5.0, reviews: 35, sold: 68, stock: 28,
    badge: 'OCOP 3 Sao', badgeVariant: 'ocop',
    weight: '1.5kg',
    featured: true,
    slug: 'hop-qua-ocop-3-sao',
  },
  // Combo
  {
    id: 'combo-family',
    name: 'Combo Gia Đình',
    category: 'combo',
    categoryLabel: 'Combo',
    price: 115000,
    originalPrice: 155000,
    image: IMG.sauce3,
    description: '2 chai 250ml + 1 chai 500ml, tiết kiệm 26%, phù hợp gia đình.',
    rating: 4.8, reviews: 82, sold: 180, stock: 75,
    badge: 'Phổ biến', badgeVariant: 'bestseller',
    featured: true,
    slug: 'combo-gia-dinh',
  },
  {
    id: 'combo-restaurant',
    name: 'Combo Nhà Hàng',
    category: 'combo',
    categoryLabel: 'Combo',
    price: 300000,
    originalPrice: 420000,
    image: IMG.sauce3,
    description: '6 chai 500ml, ưu đãi đặc biệt cho nhà hàng, quán ăn.',
    rating: 4.7, reviews: 45, sold: 92, stock: 35,
    badge: 'Giá tốt', badgeVariant: 'new',
    slug: 'combo-nha-hang',
  },
  {
    id: 'combo-save',
    name: 'Combo Tiết Kiệm',
    category: 'combo',
    categoryLabel: 'Combo',
    price: 120000,
    originalPrice: 180000,
    image: IMG.sauce3,
    description: '4 chai 250ml, tiết kiệm 33%, Freeship toàn quốc.',
    rating: 4.8, reviews: 68, sold: 155, stock: 60,
    badge: 'Freeship', badgeVariant: 'bestseller',
    slug: 'combo-tiet-kiem',
  },
  // Đặc sản OCOP
  {
    id: 'thit-chua-com',
    name: 'Thịt Chua Cốm Đặc Sản',
    category: 'dac-san-ocop',
    categoryLabel: 'Đặc sản OCOP',
    price: 85000,
    originalPrice: 110000,
    image: IMG.thitChua,
    description: 'Thịt chua cốm đặc sản Mường Khương, vị chua nhẹ tự nhiên, hương vị bản địa.',
    rating: 4.9, reviews: 64, sold: 120, stock: 55,
    badge: 'OCOP 3 Sao', badgeVariant: 'ocop',
    weight: '500g',
    slug: 'thit-chua-com-dac-san',
  },
  {
    id: 'mang-ot',
    name: 'Măng Ớt Mường Khương',
    category: 'dac-san-ocop',
    categoryLabel: 'Đặc sản OCOP',
    price: 55000,
    originalPrice: 70000,
    image: IMG.mangOt,
    description: 'Măng ớt tươi vùng cao, vị chua thanh, giòn ngon, đặc sản Tây Bắc.',
    rating: 4.7, reviews: 42, sold: 98, stock: 45,
    badge: 'Mới', badgeVariant: 'new',
    weight: '300g',
    slug: 'mang-ot-muong-khuong',
  },
  {
    id: 'combo-koc',
    name: 'Combo Đại Lý & KOC',
    category: 'combo',
    categoryLabel: 'Combo',
    price: 169000,
    originalPrice: 225000,
    image: IMG.sauce3,
    description: 'Chính sách đại lý linh hoạt, hỗ trợ marketing, chiết khấu hấp dẫn cho KOC và hộ kinh doanh.',
    rating: 4.8, reviews: 42, sold: 95, stock: 42,
    badge: 'Sỉ', badgeVariant: 'gift',
    weight: 'Thùng 12-24 chai',
    featured: true,
    slug: 'combo-dai-ly-koc',
  },
];

export interface BlogPost {
  id: number;
  title: string;
  category: 'Góc Ẩm Thực' | 'Cẩm Nang Sức Khỏe' | 'Câu Chuyện Bản Làng';
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
}

export interface StoreLocation {
  id: number;
  name: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  mapLink: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Bí quyết thưởng thức tương ớt Mường Khương chuẩn vị Tây Bắc',
    category: 'Góc Ẩm Thực',
    summary: 'Tương ớt Mường Khương không chỉ là gia vị chấm mà còn là linh hồn của nhiều món ăn vùng cao. Hãy cùng khám phá các cách kết hợp độc đáo nhất.',
    content: 'Tương ớt Mường Khương có vị cay nồng nàn, chua nhẹ tự nhiên và mùi thơm dịu của tỏi và gia vị rừng nương Tây Bắc. Để thưởng thức chuẩn vị nhất, bạn nên kết hợp với:\n\n1. Các món thịt sấy gác bếp: Chấm thịt trâu sấy, thịt lợn sấy gác bếp xé nhỏ. Vị ngọt đậm đà của thịt khô hòa cùng vị cay rực của tương ớt sẽ đánh thức mọi giác quan.\n2. Phở, bún nóng hổi: Chỉ cần thêm một thìa nhỏ tương ớt Mường Khương vào bát phở bò, phở gà nóng hổi, nước dùng sẽ dậy mùi thơm phức và có vị cay nồng xua tan sương giá.\n3. Các món luộc dã ngoại: Chấm thịt lợn bản luộc, măng luộc hoặc rau rừng luộc. Tương ớt đóng vai trò như chất xúc tác tăng độ ngọt thơm của món ăn.\n\nLưu ý bảo quản: Để tương ớt luôn giữ được màu đỏ tươi và hương vị tự nhiên tốt nhất, hãy bảo quản trong ngăn mát tủ lạnh sau khi mở nắp.',
    image: IMG.sauce1,
    date: '18/06/2026',
    author: 'Nguyễn Văn Dũng',
    readTime: '3 phút đọc',
  },
  {
    id: 2,
    title: 'Tác dụng giữ ấm cơ thể độc đáo từ trái ớt thóc vùng cao',
    category: 'Cẩm Nang Sức Khỏe',
    summary: 'Sống trong cái lạnh khắc nghiệt của vùng cao Tây Bắc, đồng bào nơi đây đã dùng tương ớt như một phương thuốc tự nhiên để bảo vệ sức khỏe.',
    content: 'Tại vùng núi cao Mường Khương, cái lạnh mùa đông thường cắt da cắt thịt, kéo dài từ cuối năm đến hết tháng 2 âm lịch. Để thích nghi, đồng bào dân tộc nơi đây từ lâu đời đã sử dụng tương ớt thóc như một thức gia vị giữ ấm cơ thể kỳ diệu.\n\nỚt thóc trồng ở sườn núi có hàm lượng capsaicin rất cao, giúp thúc đẩy tuần hoàn máu, làm nóng cơ thể nhanh chóng ngay khi ăn vào. Ngoài ra, tỏi bản địa xay trộn cùng ớt là chất kháng sinh tự nhiên cực mạnh, giúp phòng ngừa các bệnh cảm cúm, ho khan do thời tiết lạnh.\n\nTương ớt Mường Khương của HTX Hoa Lợi cam kết sản xuất nguyên chất 100% từ ớt tươi và tỏi bản địa, không pha trộn bột củ hay chất tạo màu hóa học, đảm bảo giữ trọn vẹn dược tính tự nhiên tốt nhất cho sức khỏe gia đình bạn.',
    image: IMG.freshChili2,
    date: '12/06/2026',
    author: 'Ban Sức Khỏe HTX',
    readTime: '4 phút đọc',
  },
  {
    id: 3,
    title: 'Hành trình từ hạt giống đến chai tương ớt OCOP 3 sao của HTX Hoa Lợi',
    category: 'Câu Chuyện Bản Làng',
    summary: 'Ít ai biết rằng đằng sau mỗi chai tương ớt đỏ rực là cả một chuỗi liên kết bền vững giúp thay đổi cuộc sống của hơn 50 hộ nông dân vùng cao.',
    content: 'Cơ duyên thành lập HTX Hoa Lợi xuất phát từ ông Nguyễn Văn Dũng - nguyên là một nhà thầu xây dựng. Lên Mường Khương làm công trình, ông được thưởng thức tương ớt thủ công thơm ngon của bà con dân bản và quyết tâm đưa sản phẩm này đi xa hơn.\n\nTừ năm 2006, HTX Hoa Lợi chính thức đăng ký bảo hộ thương hiệu và liên kết với bà con nông dân. Mỗi năm, HTX thu mua hơn 100 tấn ớt tươi chất lượng cao, giúp cải thiện sinh kế cho hơn 50 hộ đồng bào dân tộc thiểu số tại Mường Khương. Sự chênh lệch nhiệt độ ngày và đêm ở vùng núi cao (lên tới 5-6 độ C) cùng sương mù mát lành đã trui rèn nên những trái ớt thóc nhỏ nhưng cay nồng, đậm đà mà không vùng nào có được.\n\nSản phẩm tự hào đạt chứng nhận OCOP 3 Sao của UBND Thành phố Lào Cai, minh chứng cho sự nỗ lực chuẩn hóa quy trình truyền thống nhưng vẫn giữ nguyên vẹn bản sắc bản địa.',
    image: IMG.deputyPM,
    date: '05/06/2026',
    author: 'Truyền thông HTX',
    readTime: '5 phút đọc',
  },
];

export const DISTRIBUTION_STORES: StoreLocation[] = [
  {
    id: 1,
    name: 'Trụ sở chính & Showroom HTX Hoa Lợi',
    province: 'Lào Cai',
    district: 'Phường Lào Cai',
    address: 'Tổ dân phố Cánh Chín, phường Lào Cai, thành phố Lào Cai, tỉnh Lào Cai',
    phone: '0912 518 745',
    mapLink: 'https://maps.google.com/?q=HTX+Hoa+Lợi+Lào+Cai',
  },
];

export { IMG };
