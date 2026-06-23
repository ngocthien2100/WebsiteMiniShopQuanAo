export type ProductCategory = "ao" | "quan" | "vay" | "phu-kien";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  image: string;
  badge?: string;
  colors: string[];
  sizes: string[];
  shortDescription: string;
  description: string;
  suitableFor: string[];
  tags: string[];
};

export const products: Product[] = [
  {
    id: "ao-thun-basic-cotton",
    name: "Áo thun Basic Cotton",
    category: "ao",
    categoryLabel: "Áo",
    price: 189000,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    badge: "Best seller",
    colors: ["Trắng", "Đen", "Be"],
    sizes: ["S", "M", "L", "XL"],
    shortDescription: "Áo thun cotton mềm, dễ phối đồ, phù hợp đi học và đi chơi.",
    description:
      "Chất cotton thoáng, form regular dễ mặc hằng ngày. Sản phẩm phù hợp với sinh viên cần một item gọn gàng, giá tốt và dễ kết hợp với nhiều kiểu quần.",
    suitableFor: ["Sinh viên", "Đi học", "Đi chơi", "Ngân sách tiết kiệm"],
    tags: ["cotton", "basic", "sinh viên", "giá tốt"],
  },
  {
    id: "ao-so-mi-oxford",
    name: "Áo sơ mi Oxford",
    category: "ao",
    categoryLabel: "Áo",
    price: 329000,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    badge: "New",
    colors: ["Trắng", "Xanh nhạt"],
    sizes: ["S", "M", "L"],
    shortDescription: "Áo sơ mi lịch sự, chất đứng form, hợp đi học, đi làm và hẹn gặp.",
    description:
      "Kiểu áo sơ mi Oxford có mặt vải đẹp, đứng form vừa phải. Đây là lựa chọn an toàn khi cần một bộ đồ gọn gàng nhưng không quá trang trọng.",
    suitableFor: ["Đi học", "Đi làm", "Phong cách thanh lịch"],
    tags: ["sơ mi", "lịch sự", "oxford"],
  },
  {
    id: "quan-jeans-straight",
    name: "Quần jeans Straight Fit",
    category: "quan",
    categoryLabel: "Quần",
    price: 459000,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    colors: ["Xanh đậm", "Xanh nhạt"],
    sizes: ["28", "29", "30", "31", "32"],
    shortDescription: "Quần jeans ống đứng, bền, dễ mặc với áo thun hoặc sơ mi.",
    description:
      "Form straight fit cân bằng giữa thoải mái và gọn gàng. Chất jeans dày vừa, phù hợp sử dụng thường ngày.",
    suitableFor: ["Đi học", "Đi chơi", "Phong cách năng động"],
    tags: ["jeans", "straight", "hằng ngày"],
  },
  {
    id: "vay-midi-linen",
    name: "Váy midi Linen",
    category: "vay",
    categoryLabel: "Váy",
    price: 399000,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    badge: "Sale",
    colors: ["Kem", "Nâu sữa"],
    sizes: ["S", "M", "L"],
    shortDescription: "Váy midi nhẹ, thanh lịch, hợp cafe, đi học và đi làm.",
    description:
      "Chất linen pha thoáng mát, chiều dài vừa phải. Màu trung tính giúp dễ phối với áo thun, cardigan hoặc sơ mi.",
    suitableFor: ["Nữ tính", "Đi chơi", "Đi làm"],
    tags: ["váy", "linen", "thanh lịch"],
  },
  {
    id: "quan-tay-relaxed",
    name: "Quần tây Relaxed",
    category: "quan",
    categoryLabel: "Quần",
    price: 389000,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
    colors: ["Đen", "Ghi", "Be"],
    sizes: ["S", "M", "L", "XL"],
    shortDescription: "Quần tây thoải mái, lên form gọn, hợp phong cách tối giản.",
    description:
      "Thiết kế relaxed giúp dễ vận động, lưng cao vừa phải. Phù hợp với áo sơ mi, polo hoặc blazer nhẹ.",
    suitableFor: ["Đi làm", "Thuyết trình", "Phong cách tối giản"],
    tags: ["quần tây", "tối giản", "lịch sự"],
  },
  {
    id: "ao-khoac-cardigan",
    name: "Áo khoác Cardigan",
    category: "ao",
    categoryLabel: "Áo",
    price: 349000,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    badge: "New",
    colors: ["Nâu", "Kem", "Xanh rêu"],
    sizes: ["S", "M", "L"],
    shortDescription: "Cardigan mỏng, dễ khoác ngoài khi đi học hoặc đi làm.",
    description:
      "Áo khoác len mỏng có độ co giãn nhẹ, giữ ấm vừa đủ và tạo cảm giác mềm mại cho outfit hằng ngày.",
    suitableFor: ["Đi học", "Thời tiết mát", "Layering"],
    tags: ["cardigan", "len mỏng", "layer"],
  },
  {
    id: "tui-canvas-mini",
    name: "Túi canvas Mini",
    category: "phu-kien",
    categoryLabel: "Phụ kiện",
    price: 159000,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    colors: ["Kem", "Đen"],
    sizes: ["Free size"],
    shortDescription: "Túi canvas nhỏ gọn, đựng đủ vật dụng cơ bản khi ra ngoài.",
    description:
      "Kích thước vừa đủ cho điện thoại, ví, sạc và phụ kiện nhỏ. Chất canvas dễ vệ sinh, hợp với phong cách trẻ trung.",
    suitableFor: ["Sinh viên", "Đi học", "Giá tốt"],
    tags: ["túi", "canvas", "phụ kiện", "sinh viên"],
  },
  {
    id: "mu-bucket-kaki",
    name: "Mũ bucket Kaki",
    category: "phu-kien",
    categoryLabel: "Phụ kiện",
    price: 129000,
    image:
      "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?auto=format&fit=crop&w=900&q=80",
    colors: ["Be", "Đen", "Xanh rêu"],
    sizes: ["Free size"],
    shortDescription: "Mũ bucket gọn nhẹ, tạo điểm nhấn cho outfit hằng ngày.",
    description:
      "Chất kaki đứng phom, dễ gấp mang theo. Phù hợp khi đi chơi, du lịch ngắn ngày hoặc chụp ảnh lookbook.",
    suitableFor: ["Đi chơi", "Du lịch", "Năng động"],
    tags: ["mũ", "bucket", "phụ kiện"],
  },
];

export const shippingPolicy = {
  delivery: "Giao hàng toàn quốc từ 2-4 ngày làm việc. Miễn phí vận chuyển cho đơn từ 500.000đ.",
  returnPolicy: "Đổi size trong 7 ngày nếu sản phẩm còn tem mác và chưa qua sử dụng.",
  orderGuide: "Chọn sản phẩm, thêm vào giỏ hàng, điền họ tên, số điện thoại và địa chỉ giao hàng.",
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}
