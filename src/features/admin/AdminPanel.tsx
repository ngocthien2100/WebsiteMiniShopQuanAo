import { useState, useMemo } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  FileText,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Truck,
  RotateCw,
  LogOut,
  Save,
} from "lucide-react";
import {
  User,
  Order,
  OrderStatus,
  getMockUsers,
  saveMockUsers,
  getMockOrders,
  saveMockOrders,
  getMockProducts,
  saveMockProducts,
} from "@/shared/data/mockDb";
import { Product, ProductCategory, formatCurrency } from "@/shared/data/products";

// Biểu đồ Recharts đơn giản
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AdminPanelProps {
  currentUser: User;
  onLogout: () => void;
  onNavigateHome: () => void;
}

type TabType = "dashboard" | "products" | "users";

export default function AdminPanel({ currentUser, onLogout, onNavigateHome }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [users, setUsers] = useState<User[]>(() => getMockUsers());
  const [orders, setOrders] = useState<Order[]>(() => getMockOrders());
  const [products, setProducts] = useState<Product[]>(() => getMockProducts());

  // State cho Thêm/Sửa Sản phẩm
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState<{
    id: string;
    name: string;
    category: ProductCategory;
    price: number;
    image: string;
    badge: string;
    colors: string;
    sizes: string;
    shortDescription: string;
    description: string;
  }>({
    id: "",
    name: "",
    category: "ao",
    price: 0,
    image: "",
    badge: "",
    colors: "Trắng, Đen, Xám",
    sizes: "S, M, L, XL",
    shortDescription: "",
    description: "",
  });

  // 1. DASHBOARD ANALYTICS LOGIC
  const stats = useMemo(() => {
    const totalSales = orders
      .filter((o) => o.status === "delivered")
      .reduce((sum, o) => sum + o.total, 0);

    const totalOrdersCount = orders.length;
    const totalProductsCount = products.length;
    const totalUsersCount = users.length;

    return { totalSales, totalOrdersCount, totalProductsCount, totalUsersCount };
  }, [orders, products, users]);

  // Biểu đồ doanh thu giả lập theo ngày
  const chartData = useMemo(() => {
    // Gom nhóm doanh thu theo ngày từ các đơn hàng "delivered" hoặc tất cả
    const dataMap: Record<string, number> = {};
    
    // Tạo sẵn 7 ngày gần nhất để biểu đồ đầy đủ
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
      dataMap[dateStr] = 0;
    }

    orders.forEach((order) => {
      if (order.status !== "cancelled") {
        const orderDate = new Date(order.createdAt);
        const dateStr = orderDate.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
        if (dataMap[dateStr] !== undefined) {
          dataMap[dateStr] += order.total;
        } else {
          // Nếu cũ hơn 7 ngày thì gom vào ngày gần nhất hoặc bỏ qua
          dataMap[dateStr] = order.total;
        }
      }
    });

    return Object.entries(dataMap).map(([date, revenue]) => ({
      date,
      revenue,
    }));
  }, [orders]);

  // 2. ORDER MANAGEMENT LOGIC
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    saveMockOrders(updated);
  };

  // 3. PRODUCT CRUD LOGIC
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      id: "",
      name: "",
      category: "ao",
      price: 150000,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      badge: "",
      colors: "Trắng, Đen, Xám",
      sizes: "S, M, L, XL",
      shortDescription: "Mô tả ngắn về sản phẩm...",
      description: "Mô tả chi tiết về chất liệu và phom dáng của sản phẩm...",
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      id: prod.id,
      name: prod.name,
      category: prod.category,
      price: prod.price,
      image: prod.image,
      badge: prod.badge || "",
      colors: prod.colors.join(", "),
      sizes: prod.sizes.join(", "),
      shortDescription: prod.shortDescription,
      description: prod.description,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const colorsArray = productForm.colors.split(",").map((c) => c.trim()).filter(Boolean);
    const sizesArray = productForm.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    
    let categoryLabel = "Áo";
    if (productForm.category === "quan") categoryLabel = "Quần";
    if (productForm.category === "vay") categoryLabel = "Váy";
    if (productForm.category === "phu-kien") categoryLabel = "Phụ kiện";

    if (editingProduct) {
      // Chỉnh sửa sản phẩm
      const updated = products.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: productForm.name,
            category: productForm.category,
            categoryLabel,
            price: Number(productForm.price),
            image: productForm.image,
            badge: productForm.badge || undefined,
            colors: colorsArray,
            sizes: sizesArray,
            shortDescription: productForm.shortDescription,
            description: productForm.description,
          };
        }
        return p;
      });
      setProducts(updated);
      saveMockProducts(updated);
    } else {
      // Thêm sản phẩm mới
      const newId = productForm.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") + "-" + Date.now().toString().slice(-4);

      const newProduct: Product = {
        id: newId,
        name: productForm.name,
        category: productForm.category,
        categoryLabel,
        price: Number(productForm.price),
        image: productForm.image,
        badge: productForm.badge || undefined,
        colors: colorsArray,
        sizes: sizesArray,
        shortDescription: productForm.shortDescription,
        description: productForm.description,
        suitableFor: ["Sinh viên", "Học sinh", "Đi chơi"],
        tags: [productForm.category, "mới"],
      };

      const updated = [newProduct, ...products];
      setProducts(updated);
      saveMockProducts(updated);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      const updated = products.filter((p) => p.id !== productId);
      setProducts(updated);
      saveMockProducts(updated);
    }
  };

  // 4. USER MANAGEMENT LOGIC
  const handleChangeUserRole = (userId: string, role: "admin" | "staff" | "customer") => {
    // Không cho phép tự hạ quyền của chính mình
    if (userId === currentUser.id) {
      alert("Bạn không thể tự thay đổi vai trò của chính mình!");
      return;
    }
    const updated = users.map((u) => (u.id === userId ? { ...u, role } : u));
    setUsers(updated);
    saveMockUsers(updated);
  };

  const handleToggleUserStatus = (userId: string) => {
    if (userId === currentUser.id) {
      alert("Bạn không thể tự khóa tài khoản của chính mình!");
      return;
    }
    const updated = users.map((u) => {
      if (u.id === userId) {
        const nextStatus = u.status === "active" ? "blocked" : "active";
        return { ...u, status: nextStatus as "active" | "blocked" };
      }
      return u;
    });
    setUsers(updated);
    saveMockUsers(updated);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header" onClick={onNavigateHome}>
          <span className="logo-box">MS</span>
          <div>
            <strong>MiniStyle</strong>
            <small>Admin Portal</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <Package size={18} /> Quản lý sản phẩm
          </button>
          <button
            className={`nav-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={18} /> Quản lý người dùng
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <strong>{currentUser.name}</strong>
            <span>{currentUser.email}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content">
        <header className="content-header">
          <div>
            <h1>
              {activeTab === "dashboard" && "Báo cáo doanh số & Đơn hàng"}
              {activeTab === "products" && "Danh sách sản phẩm"}
              {activeTab === "users" && "Quản lý tài khoản phân quyền"}
            </h1>
            <p>Trang quản trị hệ thống bán hàng MiniStyle</p>
          </div>
          <button className="secondary-button" onClick={onNavigateHome}>
            Xem trang bán hàng
          </button>
        </header>

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="dashboard-view">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon sales">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-info">
                  <span>Tổng Doanh Thu</span>
                  <h3>{formatCurrency(stats.totalSales)}</h3>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon orders">
                  <ShoppingBag size={24} />
                </div>
                <div className="stat-info">
                  <span>Tổng Đơn Hàng</span>
                  <h3>{stats.totalOrdersCount}</h3>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon products">
                  <Package size={24} />
                </div>
                <div className="stat-info">
                  <span>Số Lượng Sản Phẩm</span>
                  <h3>{stats.totalProductsCount}</h3>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon users">
                  <Users size={24} />
                </div>
                <div className="stat-info">
                  <span>Khách Hàng & Staff</span>
                  <h3>{stats.totalUsersCount}</h3>
                </div>
              </div>
            </div>

            {/* Biểu đồ doanh thu */}
            <div className="chart-section">
              <h3>Doanh thu bán hàng 7 ngày gần đây</h3>
              <div className="chart-container" style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary, #6366f1)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-primary, #6366f1)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis 
                      stroke="#94a3b8" 
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(Number(value)), "Doanh thu"]}
                      contentStyle={{ background: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="var(--color-primary, #6366f1)" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bảng đơn hàng gần đây */}
            <div className="table-section">
              <h3>Danh sách đơn hàng mẫu</h3>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Mã đơn</th>
                      <th>Khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>Địa chỉ</th>
                      <th>Sản phẩm</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Duyệt đơn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td><strong>{order.id}</strong></td>
                        <td>{order.customerName}</td>
                        <td>{order.phone}</td>
                        <td><span className="address-cell" title={order.address}>{order.address}</span></td>
                        <td>
                          <div className="order-items-cell">
                            {order.items.map((it, idx) => (
                              <div key={idx}>
                                {it.product.name} ({it.size}/{it.color}) x{it.quantity}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td><strong>{formatCurrency(order.total)}</strong></td>
                        <td>
                          <span className={`badge-status ${order.status}`}>
                            {order.status === "pending" && "Chờ xác nhận"}
                            {order.status === "processing" && "Đang xử lý"}
                            {order.status === "shipping" && "Đang giao"}
                            {order.status === "delivered" && "Đã giao"}
                            {order.status === "cancelled" && "Đã hủy"}
                          </span>
                        </td>
                        <td>
                          <select
                            className="status-selector"
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          >
                            <option value="pending">Chờ xác nhận</option>
                            <option value="processing">Đang xử lý</option>
                            <option value="shipping">Đang giao</option>
                            <option value="delivered">Đã giao</option>
                            <option value="cancelled">Hủy đơn</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CRUD */}
        {activeTab === "products" && (
          <div className="products-view">
            <div className="action-row">
              <p>Tổng số: <strong>{products.length}</strong> sản phẩm</p>
              <button className="primary-button" onClick={handleOpenAddProduct}>
                <Plus size={18} /> Thêm sản phẩm mới
              </button>
            </div>

            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Nhãn (Badge)</th>
                    <th>Size có sẵn</th>
                    <th>Màu sắc</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr key={prod.id}>
                      <td>
                        <img className="product-thumb" src={prod.image} alt={prod.name} />
                      </td>
                      <td>
                        <strong>{prod.name}</strong>
                        <span className="sub-text">{prod.shortDescription}</span>
                      </td>
                      <td>{prod.categoryLabel}</td>
                      <td><strong>{formatCurrency(prod.price)}</strong></td>
                      <td>{prod.badge ? <span className="badge-ui">{prod.badge}</span> : "-"}</td>
                      <td>{prod.sizes.join(", ")}</td>
                      <td>{prod.colors.join(", ")}</td>
                      <td>
                        <div className="actions-cell">
                          <button className="edit-btn" onClick={() => handleOpenEditProduct(prod)} title="Chỉnh sửa">
                            <Edit2 size={16} />
                          </button>
                          <button className="delete-btn" onClick={() => handleDeleteProduct(prod.id)} title="Xóa">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: USERS & PERMISSIONS */}
        {activeTab === "users" && (
          <div className="users-view">
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Ngày tạo</th>
                    <th>Vai trò (Phân quyền)</th>
                    <th>Trạng thái</th>
                    <th>Khóa / Mở khóa</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <strong>{user.name}</strong>
                        {user.id === currentUser.id && <span className="badge-me">Tôi</span>}
                      </td>
                      <td>{user.email}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString("vi-VN")}</td>
                      <td>
                        <select
                          className="role-selector"
                          value={user.role}
                          onChange={(e) => handleChangeUserRole(user.id, e.target.value as any)}
                          disabled={user.id === currentUser.id}
                        >
                          <option value="customer">Customer (Khách hàng)</option>
                          <option value="staff">Staff (Nhân viên)</option>
                          <option value="admin">Admin (Quản trị viên)</option>
                        </select>
                      </td>
                      <td>
                        <span className={`status-pill ${user.status}`}>
                          {user.status === "active" ? "Đang hoạt động" : "Bị khóa"}
                        </span>
                      </td>
                      <td>
                        <button
                          className={`user-action-btn ${user.status === "active" ? "block-action" : "unblock-action"}`}
                          onClick={() => handleToggleUserStatus(user.id)}
                          disabled={user.id === currentUser.id}
                        >
                          {user.status === "active" ? (
                            <>
                              <Lock size={14} /> Khóa
                            </>
                          ) : (
                            <>
                              <Unlock size={14} /> Mở khóa
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal Thêm/Sửa sản phẩm */}
      {isProductModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
              <button className="close-modal-btn" onClick={() => setIsProductModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSaveProduct} className="modal-form">
              <div className="form-row">
                <label>
                  Tên sản phẩm *
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  />
                </label>
                <label>
                  Giá tiền (VNĐ) *
                  <input
                    type="number"
                    required
                    min={1000}
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Danh mục *
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                  >
                    <option value="ao">Áo</option>
                    <option value="quan">Quần</option>
                    <option value="vay">Váy</option>
                    <option value="phu-kien">Phụ kiện</option>
                  </select>
                </label>
                <label>
                  Nhãn (Badge - ví dụ: Best seller, New, Sale)
                  <input
                    type="text"
                    placeholder="Không có"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                  />
                </label>
              </div>

              <label>
                Đường dẫn ảnh sản phẩm (URL) *
                <input
                  type="text"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                />
              </label>

              <div className="form-row">
                <label>
                  Màu sắc có sẵn (cách nhau bằng dấu phẩy) *
                  <input
                    type="text"
                    required
                    value={productForm.colors}
                    onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                  />
                </label>
                <label>
                  Kích thước có sẵn (cách nhau bằng dấu phẩy) *
                  <input
                    type="text"
                    required
                    value={productForm.sizes}
                    onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                  />
                </label>
              </div>

              <label>
                Mô tả ngắn *
                <input
                  type="text"
                  required
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                />
              </label>

              <label>
                Mô tả chi tiết *
                <textarea
                  rows={4}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                />
              </label>

              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setIsProductModalOpen(false)}>
                  Hủy bỏ
                </button>
                <button type="submit" className="primary-button">
                  <Save size={16} /> Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
