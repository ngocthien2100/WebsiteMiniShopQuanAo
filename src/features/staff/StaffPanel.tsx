import { useState } from "react";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Lock,
  LogOut,
  Save,
} from "lucide-react";
import {
  User,
  getMockProducts,
  saveMockProducts,
} from "@/shared/data/mockDb";
import { Product, ProductCategory, formatCurrency } from "@/shared/data/products";

interface StaffPanelProps {
  currentUser: User;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export default function StaffPanel({ currentUser, onLogout, onNavigateHome }: StaffPanelProps) {
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

  // PRODUCT CRUD LOGIC
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      id: "",
      name: "",
      category: "ao",
      price: 150000,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      badge: "Mới",
      colors: "Trắng, Đen",
      sizes: "S, M, L",
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

  return (
    <div className="admin-layout">
      {/* Sidebar - Dành riêng cho Nhân viên */}
      <aside className="admin-sidebar staff-sidebar-style">
        <div className="sidebar-header" onClick={onNavigateHome}>
          <span className="logo-box staff-logo">NV</span>
          <div>
            <strong>MiniStyle</strong>
            <small>Staff Portal</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <Package size={18} /> Quản lý sản phẩm
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <strong>{currentUser.name}</strong>
            <span>Nhân viên Bán hàng</span>
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
            <h1>Quản lý sản phẩm (Quyền Nhân viên)</h1>
            <p>Cho phép thêm, sửa thông tin sản phẩm. Không được phép xóa sản phẩm.</p>
          </div>
          <button className="secondary-button" onClick={onNavigateHome}>
            Xem trang bán hàng
          </button>
        </header>

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
                  <th>Size</th>
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
                        {/* Nút Xóa bị vô hiệu hóa kèm icon Lock để thể hiện sự phân quyền hạn chế */}
                        <button 
                          className="delete-btn disabled-btn" 
                          disabled 
                          title="Staff không có quyền xóa sản phẩm. Chỉ Admin mới có quyền này."
                        >
                          <Lock size={14} /> <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
