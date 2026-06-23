import { Product, products as initialProducts } from "./products";

export type UserRole = "admin" | "staff" | "customer";
export type UserStatus = "active" | "blocked";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Trong thực tế không lưu password thô hoặc trả về client, ở đây giả lập
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export type OrderStatus = "pending" | "processing" | "shipping" | "delivered" | "cancelled";

export interface OrderItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

// Khởi tạo các tài khoản mặc định
const defaultUsers: User[] = [
  {
    id: "user-admin",
    name: "Quản trị viên (Admin)",
    email: "admin@ministyle.com",
    password: "admin123",
    role: "admin",
    status: "active",
    createdAt: "2026-06-01T08:00:00Z",
  },
  {
    id: "user-staff",
    name: "Nhân viên Bán hàng",
    email: "staff@ministyle.com",
    password: "staff123",
    role: "staff",
    status: "active",
    createdAt: "2026-06-05T09:30:00Z",
  },
  {
    id: "user-customer",
    name: "Nguyễn Văn Khách",
    email: "customer@ministyle.com",
    password: "customer123",
    role: "customer",
    status: "active",
    createdAt: "2026-06-10T14:15:00Z",
  },
];

// Khởi tạo một vài đơn hàng mẫu để làm biểu đồ doanh thu đẹp mắt hơn
const generateDefaultOrders = (productsList: Product[]): Order[] => {
  return [
    {
      id: "MS-1001",
      customerId: "user-customer",
      customerName: "Nguyễn Văn Khách",
      phone: "0901234567",
      address: "123 Đường Ba Tháng Hai, Quận 10, TP.HCM",
      notes: "Giao buổi chiều sau 5h",
      items: [
        {
          product: productsList[0] || initialProducts[0],
          quantity: 2,
          size: "M",
          color: "Đen",
        },
        {
          product: productsList[1] || initialProducts[1],
          quantity: 1,
          size: "L",
          color: "Trắng",
        },
      ],
      total: (productsList[0]?.price || 189000) * 2 + (productsList[1]?.price || 329000),
      status: "delivered",
      createdAt: "2026-06-18T15:30:00Z",
    },
    {
      id: "MS-1002",
      customerId: "user-customer",
      customerName: "Nguyễn Văn Khách",
      phone: "0901234567",
      address: "123 Đường Ba Tháng Hai, Quận 10, TP.HCM",
      notes: "",
      items: [
        {
          product: productsList[2] || initialProducts[2],
          quantity: 1,
          size: "30",
          color: "Xanh nhạt",
        },
      ],
      total: productsList[2]?.price || 459000,
      status: "shipping",
      createdAt: "2026-06-21T10:00:00Z",
    },
    {
      id: "MS-1003",
      customerId: "user-customer",
      customerName: "Nguyễn Văn Khách",
      phone: "0901234567",
      address: "123 Đường Ba Tháng Hai, Quận 10, TP.HCM",
      notes: "Giao cẩn thận",
      items: [
        {
          product: productsList[3] || initialProducts[3],
          quantity: 1,
          size: "S",
          color: "Kem",
        },
        {
          product: productsList[6] || initialProducts[6],
          quantity: 1,
          size: "Free size",
          color: "Đen",
        },
      ],
      total: (productsList[3]?.price || 399000) + (productsList[6]?.price || 159000),
      status: "pending",
      createdAt: "2026-06-23T08:20:00Z",
    },
  ];
};

// Khởi tạo LocalStorage nếu chưa có dữ liệu
export const initMockDb = () => {
  if (!localStorage.getItem("ms_users")) {
    localStorage.setItem("ms_users", JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem("ms_products")) {
    localStorage.setItem("ms_products", JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem("ms_orders")) {
    const productsList = JSON.parse(localStorage.getItem("ms_products") || "[]");
    localStorage.setItem("ms_orders", JSON.stringify(generateDefaultOrders(productsList)));
  }
};

// LẤY VÀ CẬP NHẬT PRODUCTS
export const getMockProducts = (): Product[] => {
  initMockDb();
  return JSON.parse(localStorage.getItem("ms_products") || "[]");
};

export const saveMockProducts = (productsList: Product[]) => {
  localStorage.setItem("ms_products", JSON.stringify(productsList));
};

// LẤY VÀ CẬP NHẬT USERS
export const getMockUsers = (): User[] => {
  initMockDb();
  return JSON.parse(localStorage.getItem("ms_users") || "[]");
};

export const saveMockUsers = (usersList: User[]) => {
  localStorage.setItem("ms_users", JSON.stringify(usersList));
};

// LẤY VÀ CẬP NHẬT ORDERS
export const getMockOrders = (): Order[] => {
  initMockDb();
  return JSON.parse(localStorage.getItem("ms_orders") || "[]");
};

export const saveMockOrders = (ordersList: Order[]) => {
  localStorage.setItem("ms_orders", JSON.stringify(ordersList));
};

// CÁC HÀM XỬ LÝ AUTH
export const getLoggedUser = (): User | null => {
  const userJson = localStorage.getItem("ms_logged_in_user");
  if (!userJson) return null;
  
  // Xác thực xem tài khoản còn hoạt động hay không
  const user = JSON.parse(userJson) as User;
  const allUsers = getMockUsers();
  const found = allUsers.find(u => u.id === user.id);
  if (!found || found.status === "blocked") {
    localStorage.removeItem("ms_logged_in_user");
    return null;
  }
  return found;
};

export const setLoggedUser = (user: User | null) => {
  if (user) {
    localStorage.setItem("ms_logged_in_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("ms_logged_in_user");
  }
};
