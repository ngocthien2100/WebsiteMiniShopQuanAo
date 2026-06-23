import { FormEvent, useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bot,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  User as UserIcon,
  Shield,
  UserCheck,
  LogOut,
} from "lucide-react";
import { formatCurrency, Product, ProductCategory, shippingPolicy } from "@/shared/data/products";
import {
  User,
  Order,
  initMockDb,
  getMockProducts,
  getLoggedUser,
  getMockUsers,
  setLoggedUser,
  getMockOrders,
  saveMockOrders,
} from "@/shared/data/mockDb";

import LoginPage from "@/features/auth/LoginPage";
import RegisterPage from "@/features/auth/RegisterPage";
import AdminPanel from "@/features/admin/AdminPanel";
import StaffPanel from "@/features/staff/StaffPanel";
import CustomerPanel from "@/features/customer/CustomerPanel";
import N8nChatWidget from "@/features/chatbot/N8nChatWidget";

import "./App.css";

type Page = "home" | "products" | "detail" | "cart" | "login" | "register" | "admin" | "staff" | "customer";
type CartItem = { product: Product; quantity: number; size: string; color: string };

const categories: { value: "all" | ProductCategory; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "ao", label: "Áo" },
  { value: "quan", label: "Quần" },
  { value: "vay", label: "Váy" },
  { value: "phu-kien", label: "Phụ kiện" },
];

const pageVariants = {
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(6px)" },
};

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [page, setPage] = useState<Page>("home");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ProductCategory>("all");
  const [maxPrice, setMaxPrice] = useState(500000);
  const [orderDone, setOrderDone] = useState(false);

  // Form đặt hàng
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Khởi tạo mock DB và đồng bộ dữ liệu
  useEffect(() => {
    initMockDb();
    setProductsList(getMockProducts());
    const logged = getLoggedUser();
    if (logged) {
      setCurrentUser(logged);
      setCustomerName(logged.name);
    }
  }, []);

  // Lắng nghe sự thay đổi của trang để cập nhật lại danh sách sản phẩm (ví dụ sau khi Admin/Staff chỉnh sửa)
  useEffect(() => {
    if (page === "products" || page === "home" || page === "detail") {
      setProductsList(getMockProducts());
    }
  }, [page]);

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return productsList.filter((product) => {
      const inCategory = category === "all" || product.category === category;
      const inPrice = product.price <= maxPrice;
      const inSearch =
        !keyword ||
        [product.name, product.categoryLabel, product.shortDescription, ...(product.tags || [])]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return inCategory && inPrice && inSearch;
    });
  }, [category, maxPrice, query, productsList]);

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  function navigate(next: Page) {
    setPage(next);
    setOrderDone(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openProduct(product: Product) {
    setSelectedProduct(product);
    navigate("detail");
  }

  function addToCart(product: Product, size = product.sizes[0], color = product.colors[0]) {
    setCart((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color,
      );

      if (existing) {
        return current.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...current, { product, quantity: 1, size, color }];
    });
  }

  function updateQuantity(productId: string, delta: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeCartItem(productId: string) {
    setCart((current) => current.filter((item) => item.product.id !== productId));
  }

  // Đặt hàng thực tế & Lưu vào Mock DB
  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Tạo đơn hàng mới
    const newOrder: Order = {
      id: "MS-" + (1000 + getMockOrders().length + 1),
      customerId: currentUser ? currentUser.id : "guest-customer",
      customerName: customerName || "Khách vãng lai",
      phone: phone,
      address: address,
      notes: notes,
      items: cart,
      total: cartTotal + (cartTotal >= 500000 ? 0 : 30000),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Lưu vào Mock DB
    const allOrders = getMockOrders();
    saveMockOrders([...allOrders, newOrder]);

    setCart([]);
    setOrderDone(true);

    // Chuyển hướng
    setTimeout(() => {
      if (currentUser) {
        navigate("customer"); // Chuyển sang quản lý đơn hàng của Customer
      } else {
        alert("Đặt hàng thành công! (Bạn đang mua sắm với tư cách khách)");
        navigate("home");
      }
    }, 1500);
  }

  const handleLogout = () => {
    setLoggedUser(null);
    setCurrentUser(null);
    setCustomerName("");
    navigate("home");
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCustomerName(user.name);
    if (user.role === "admin") {
      navigate("admin");
    } else if (user.role === "staff") {
      navigate("staff");
    } else {
      navigate("home");
    }
  };

  const handleRegisterSuccess = (user: User) => {
    setCurrentUser(user);
    setCustomerName(user.name);
    navigate("home");
  };

  // Tránh hiển thị Header và Footer của cửa hàng khi đang ở trang quản trị Admin hoặc Staff
  const isDashboardView = page === "admin" || page === "staff";

  return (
    <div className="shop-app">
      {!isDashboardView && (
        <Header 
          page={page} 
          cartQuantity={cartQuantity} 
          navigate={navigate} 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      <main className={isDashboardView ? "no-padding" : ""}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            animate="animate"
            className="page-motion-frame"
            exit="exit"
            initial="initial"
            key={page}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            variants={pageVariants}
          >
            {page === "home" && (
              <HomePage
                productsList={productsList}
                navigate={navigate}
                openProduct={openProduct}
                addToCart={addToCart}
              />
            )}

            {page === "products" && (
              <ProductsPage
                products={filteredProducts}
                query={query}
                setQuery={setQuery}
                category={category}
                setCategory={setCategory}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                openProduct={openProduct}
                addToCart={addToCart}
              />
            )}

            {page === "detail" && selectedProduct && (
              <ProductDetailPage
                product={selectedProduct}
                addToCart={addToCart}
                openProduct={openProduct}
                navigate={navigate}
              />
            )}

            {page === "cart" && (
              <CartPage
                cart={cart}
                cartTotal={cartTotal}
                updateQuantity={updateQuantity}
                removeCartItem={removeCartItem}
                submitOrder={submitOrder}
                orderDone={orderDone}
                navigate={navigate}
                currentUser={currentUser}
                customerName={customerName}
                setCustomerName={setCustomerName}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
                notes={notes}
                setNotes={setNotes}
              />
            )}

            {page === "login" && (
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onNavigateToRegister={() => navigate("register")}
                onNavigateHome={() => navigate("home")}
              />
            )}

            {page === "register" && (
              <RegisterPage
                onRegisterSuccess={handleRegisterSuccess}
                onNavigateToLogin={() => navigate("login")}
                onNavigateHome={() => navigate("home")}
              />
            )}

            {page === "admin" && currentUser && currentUser.role === "admin" && (
              <AdminPanel
                currentUser={currentUser}
                onLogout={handleLogout}
                onNavigateHome={() => navigate("home")}
              />
            )}

            {page === "staff" && currentUser && currentUser.role === "staff" && (
              <StaffPanel
                currentUser={currentUser}
                onLogout={handleLogout}
                onNavigateHome={() => navigate("home")}
              />
            )}

            {page === "customer" && currentUser && (
              <CustomerPanel
                currentUser={currentUser}
                onNavigateHome={() => navigate("home")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {!isDashboardView && <N8nChatWidget />}
      {!isDashboardView && <Footer navigate={navigate} />}

      {/* QUICK ROLE SWITCHER FOR DEMO/TESTING */}
      <QuickRoleSwitcher 
        currentUser={currentUser} 
        onSwitchRole={(role) => {
          if (role === null) {
            handleLogout();
            return;
          }
          // Tìm user tương ứng trong Mock DB
          const users = getMockUsers();
          const target = users.find(u => u.role === role);
          if (target) {
            setLoggedUser(target);
            setCurrentUser(target);
            setCustomerName(target.name);
            navigate(role === "admin" ? "admin" : role === "staff" ? "staff" : "home");
          }
        }}
      />
    </div>
  );
}

function Header({
  page,
  cartQuantity,
  navigate,
  currentUser,
  onLogout,
}: {
  page: Page;
  cartQuantity: number;
  navigate: (page: Page) => void;
  currentUser: User | null;
  onLogout: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="site-header">
      <button className="brand" onClick={() => navigate("home")} type="button">
        <span className="brand-mark">MS</span>
        <span>
          <strong>MiniStyle</strong>
          <small>Clothing shop</small>
        </span>
      </button>

      <nav className="main-nav">
        {[
          ["home", "Trang chủ"],
          ["products", "Sản phẩm"],
          ["cart", "Giỏ hàng"],
        ].map(([id, label]) => (
          <button
            className={page === id ? "active" : ""}
            key={id}
            onClick={() => navigate(id as Page)}
            type="button"
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button className="cart-button" onClick={() => navigate("cart")} type="button">
          <ShoppingBag size={18} />
          <span>{cartQuantity}</span>
        </button>

        {currentUser ? (
          <div className="user-profile-menu">
            <button 
              className="profile-trigger" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              type="button"
            >
              <div className="avatar-placeholder">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="user-display-name">{currentUser.name}</span>
            </button>

            {dropdownOpen && (
              <div className="profile-dropdown-menu">
                <div className="dropdown-user-info">
                  <strong>{currentUser.name}</strong>
                  <span className="role-tag">{currentUser.role}</span>
                </div>
                <hr />
                {currentUser.role === "admin" && (
                  <button onClick={() => { navigate("admin"); setDropdownOpen(false); }}>
                    <Shield size={16} /> Admin Portal
                  </button>
                )}
                {currentUser.role === "staff" && (
                  <button onClick={() => { navigate("staff"); setDropdownOpen(false); }}>
                    <UserCheck size={16} /> Staff Portal
                  </button>
                )}
                {currentUser.role === "customer" && (
                  <button onClick={() => { navigate("customer"); setDropdownOpen(false); }}>
                    <ShoppingBag size={16} /> Đơn hàng của tôi
                  </button>
                )}
                <button onClick={() => { navigate("customer"); setDropdownOpen(false); }}>
                  <UserIcon size={16} /> Trang cá nhân
                </button>
                <hr />
                <button className="dropdown-logout" onClick={() => { onLogout(); setDropdownOpen(false); }}>
                  <LogOut size={16} /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="primary-button login-nav-btn" onClick={() => navigate("login")} type="button">
            <UserIcon size={16} /> Đăng nhập
          </button>
        )}
      </div>
    </header>
  );
}

function HomePage({
  productsList,
  navigate,
  openProduct,
  addToCart,
}: {
  productsList: Product[];
  navigate: (page: Page) => void;
  openProduct: (product: Product) => void;
  addToCart: (product: Product) => void;
}) {
  const featured = productsList.slice(0, 4);

  return (
    <>
      <section className="hero-section">
        <motion.div
          animate="visible"
          className="hero-copy"
          initial="hidden"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          variants={revealVariants}
        >
          <p className="eyebrow">Bộ sưu tập mini cho sinh viên</p>
          <h1>Nâng tầm phong cách mỗi ngày</h1>
          <p>
            MiniStyle gợi ý các item dễ mặc, giá hợp lý và có chatbot tư vấn theo nhu cầu,
            ngân sách, danh mục sản phẩm.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => navigate("products")} type="button">
              Mua ngay <ChevronRight size={18} />
            </button>
            <button className="secondary-button" onClick={() => navigate("products")} type="button">
              Xem bộ sưu tập
            </button>
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          aria-label="Ảnh lookbook thời trang"
          className="hero-media"
          initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <img
            alt="Người mẫu mặc trang phục tối giản"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
          />
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="floating-note"
            initial={{ opacity: 0, y: 16 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            <Sparkles size={18} />
            Hệ thống phân quyền & Chatbot tư vấn sẵn sàng!
          </motion.div>
        </motion.div>
      </section>

      <section className="section">
        <SectionHeading
          title="Danh mục nổi bật"
          description="Bố cục rõ ràng để người xem demo hiểu nhanh shop đang bán gì."
        />
        <div className="category-grid">
          {categories.slice(1).map((item, index) => (
            <motion.button
              className="category-card"
              initial="hidden"
              key={item.value}
              onClick={() => navigate("products")}
              transition={{ delay: index * 0.06, duration: 0.38 }}
              type="button"
              variants={revealVariants}
              viewport={{ once: true, amount: 0.35 }}
              whileHover={{ y: -6, scale: 1.015 }}
              whileInView="visible"
              whileTap={{ scale: 0.98 }}
            >
              <span>{item.label}</span>
              <ChevronRight size={18} />
            </motion.button>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          title="Sản phẩm bán chạy"
          description="Các sản phẩm mẫu dùng chung cho website, chatbot và bảng kiểm thử."
        />
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard
              addToCart={addToCart}
              key={product.id}
              openProduct={openProduct}
              product={product}
            />
          ))}
        </div>
      </section>

      <section className="trust-band">
        {[
          ["Giao hàng nhanh", shippingPolicy.delivery],
          ["Đổi size dễ dàng", shippingPolicy.returnPolicy],
          ["Chatbot tư vấn", "Hỏi theo ngân sách, phong cách, danh mục hoặc cách đặt hàng."],
        ].map(([title, text], index) => (
          <motion.article
            initial="hidden"
            key={title}
            transition={{ delay: index * 0.08, duration: 0.38 }}
            variants={revealVariants}
            viewport={{ once: true, amount: 0.25 }}
            whileInView="visible"
          >
            <Check size={22} />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </section>
    </>
  );
}

function ProductsPage({
  products,
  query,
  setQuery,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  openProduct,
  addToCart,
}: {
  products: Product[];
  query: string;
  setQuery: (value: string) => void;
  category: "all" | ProductCategory;
  setCategory: (value: "all" | ProductCategory) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  openProduct: (product: Product) => void;
  addToCart: (product: Product) => void;
}) {
  return (
    <section className="page-section">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Danh sách sản phẩm</p>
          <h1>Sản phẩm MiniStyle</h1>
          <p>Hiển thị {products.length} sản phẩm trong hệ thống.</p>
        </div>
        <div className="search-box">
          <Search size={18} />
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm áo, quần, váy..."
            value={query}
          />
        </div>
      </div>

      <div className="catalog-layout">
        <aside className="filters-panel">
          <div className="filter-title">
            <SlidersHorizontal size={18} />
            Bộ lọc
          </div>

          <label>
            Danh mục
            <select
              onChange={(event) => setCategory(event.target.value as "all" | ProductCategory)}
              value={category}
            >
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Giá tối đa: {formatCurrency(maxPrice)}
            <input
              max="1000000"
              min="100000"
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              step="50000"
              type="range"
              value={maxPrice}
            />
          </label>

          <div className="policy-box">
            <strong>Dữ liệu phân quyền</strong>
            <p>Admin và Staff có thể thêm, chỉnh sửa sản phẩm và sự thay đổi sẽ xuất hiện ngay tại đây.</p>
          </div>
        </aside>

        <div className="product-grid catalog-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                addToCart={addToCart}
                key={product.id}
                openProduct={openProduct}
                product={product}
              />
            ))
          ) : (
            <div className="empty-state">
              <Search size={24} />
              <h3>Không tìm thấy sản phẩm</h3>
              <p>Thử đổi danh mục, từ khóa hoặc tăng khoảng giá.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProductDetailPage({
  product,
  addToCart,
  openProduct,
  navigate,
}: {
  product: Product;
  addToCart: (product: Product, size?: string, color?: string) => void;
  openProduct: (product: Product) => void;
  navigate: (page: Page) => void;
}) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

  // Cần lấy danh sách sản phẩm từ localStorage để liên quan hiển thị đúng
  const productsList = getMockProducts();
  const related = productsList.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <section className="page-section">
      <button className="text-button" onClick={() => navigate("products")} type="button">
        Quay lại sản phẩm
      </button>

      <div className="detail-layout">
        <div className="detail-gallery">
          <img alt={product.name} src={product.image} />
        </div>

        <div className="detail-info">
          <p className="eyebrow">{product.categoryLabel}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">{formatCurrency(product.price)}</p>
          <p>{product.description}</p>

          <label>
            Chọn size
            <select onChange={(event) => setSize(event.target.value)} value={size}>
              {product.sizes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Chọn màu
            <select onChange={(event) => setColor(event.target.value)} value={color}>
              {product.colors.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <div className="detail-actions">
            <button className="primary-button" onClick={() => addToCart(product, size, color)} type="button">
              Thêm vào giỏ
            </button>
            <button className="secondary-button" onClick={() => { addToCart(product, size, color); navigate("cart"); }} type="button">
              Mua ngay
            </button>
          </div>

          <div className="size-guide">
            <strong>Gợi ý chọn size</strong>
            <p>S: 40-48kg, M: 49-57kg, L: 58-66kg, XL: 67-75kg. Có thể đổi size trong 7 ngày.</p>
          </div>
        </div>
      </div>

      <section className="section nested">
        <SectionHeading title="Sản phẩm liên quan" description="Gợi ý theo cùng danh mục." />
        <div className="product-grid related-grid">
          {related.map((item) => (
            <ProductCard addToCart={addToCart} key={item.id} openProduct={openProduct} product={item} />
          ))}
        </div>
      </section>
    </section>
  );
}

function CartPage({
  cart,
  cartTotal,
  updateQuantity,
  removeCartItem,
  submitOrder,
  orderDone,
  navigate,
  currentUser,
  customerName,
  setCustomerName,
  phone,
  setPhone,
  address,
  setAddress,
  notes,
  setNotes,
}: {
  cart: CartItem[];
  cartTotal: number;
  updateQuantity: (productId: string, delta: number) => void;
  removeCartItem: (productId: string) => void;
  submitOrder: (event: FormEvent<HTMLFormElement>) => void;
  orderDone: boolean;
  navigate: (page: Page) => void;
  currentUser: User | null;
  customerName: string;
  setCustomerName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
}) {
  const shippingFee = cartTotal >= 500000 || cartTotal === 0 ? 0 : 30000;
  const finalTotal = cartTotal + shippingFee;

  return (
    <section className="page-section">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Giỏ hàng & thanh toán</p>
          <h1>Hoàn tất đơn hàng</h1>
          <p>Đặt hàng mẫu để lưu trữ thông tin đơn hàng vào hệ thống.</p>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="cart-list">
          {cart.length > 0 ? (
            <>
              {cart.map((item, index) => (
                <motion.article
                  animate={{ opacity: 1, x: 0 }}
                  className="cart-item"
                  initial={{ opacity: 0, x: -16 }}
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  transition={{ delay: index * 0.04, duration: 0.28 }}
                >
                  <img alt={item.product.name} src={item.product.image} />
                  <div>
                    <h3>{item.product.name}</h3>
                    <p>{item.size} / {item.color}</p>
                    <strong>{formatCurrency(item.product.price)}</strong>
                  </div>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.product.id, -1)} type="button">
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, 1)} type="button">
                      <Plus size={16} />
                    </button>
                  </div>
                  <button className="icon-button" onClick={() => removeCartItem(item.product.id)} type="button">
                    <Trash2 size={18} />
                  </button>
                </motion.article>
              ))}
              <div className="cart-support">
                <article>
                  <Check size={18} />
                  <div>
                    <strong>Giao hàng</strong>
                    <p>{shippingPolicy.delivery}</p>
                  </div>
                </article>
                <article>
                  <Bot size={18} />
                  <div>
                    <strong>Chatbot hỗ trợ</strong>
                    <p>Có thể hỏi chatbot về size, ngân sách, cách đặt hàng và chính sách đổi trả.</p>
                  </div>
                </article>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <ShoppingBag size={24} />
              <h3>Giỏ hàng đang trống</h3>
              <p>Hãy thêm vài sản phẩm để demo luồng đặt hàng.</p>
              <button className="primary-button" onClick={() => navigate("products")} type="button">
                Xem sản phẩm
              </button>
            </div>
          )}
        </div>

        <form className="checkout-form" onSubmit={submitOrder}>
          <h2>Thông tin khách hàng</h2>
          {!currentUser && (
            <div className="auth-alert-cart">
              Bạn chưa đăng nhập. Hãy <button type="button" className="text-button inline-btn" onClick={() => navigate("login")}>Đăng nhập</button> để lưu đơn hàng vào trang cá nhân.
            </div>
          )}
          <label>
            Họ và tên
            <input required placeholder="Nguyễn Văn A" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </label>
          <label>
            Số điện thoại
            <input required pattern="[0-9 ]{9,13}" placeholder="090 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <label>
            Địa chỉ giao hàng
            <input required placeholder="Số nhà, đường, phường/xã..." value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <label>
            Ghi chú
            <textarea placeholder="Giao giờ hành chính, gọi trước khi đến..." value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>

          <div className="summary">
            <span>Tạm tính</span>
            <strong>{formatCurrency(cartTotal)}</strong>
            <span>Phí vận chuyển</span>
            <strong>{shippingFee === 0 ? "Miễn phí" : formatCurrency(shippingFee)}</strong>
            <span>Tổng cộng</span>
            <strong>{formatCurrency(finalTotal)}</strong>
          </div>

          <button className="primary-button full-width" disabled={cart.length === 0} type="submit">
            Đặt hàng
          </button>

          {orderDone && (
            <div className="success-message">
              <Check size={18} />
              Đơn hàng mẫu đã được ghi nhận. Bạn đang được tự động chuyển hướng...
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  openProduct,
  addToCart,
}: {
  product: Product;
  openProduct: (product: Product) => void;
  addToCart: (product: Product) => void;
}) {
  return (
    <motion.article
      className="product-card"
      initial="hidden"
      layout
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      variants={revealVariants}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -7 }}
      whileInView="visible"
    >
      <button className="product-image" onClick={() => openProduct(product)} type="button">
        {product.badge && <span className="badge">{product.badge}</span>}
        <img alt={product.name} src={product.image} />
      </button>
      <div className="product-body">
        <span>{product.categoryLabel}</span>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <div className="product-footer">
          <strong>{formatCurrency(product.price)}</strong>
          <button onClick={() => addToCart(product)} type="button">
            Thêm
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">MiniStyle</p>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="site-footer">
      <div>
        <h2>MiniStyle</h2>
        <p>Website bán hàng mini tích hợp chatbot tư vấn sản phẩm qua N8N.</p>
      </div>
      <div>
        <strong>Liên kết</strong>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("home")}>Trang chủ</span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("products")}>Sản phẩm</span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("cart")}>Giỏ hàng</span>
      </div>
      <div>
        <strong>Mạng xã hội</strong>
        <span>Facebook</span>
        <span>Instagram</span>
        <span>TikTok</span>
      </div>
    </footer>
  );
}

// BỘ CHUYỂN VAI TRÒ NHANH PHỤC VỤ DEMO DỄ DÀNG
function QuickRoleSwitcher({ 
  currentUser, 
  onSwitchRole 
}: { 
  currentUser: User | null;
  onSwitchRole: (role: "admin" | "staff" | "customer" | null) => void;
}) {
  const [collapsed, setCollapsed] = useState(true);

  if (collapsed) {
    return (
      <button 
        className="quick-switcher-collapsed-btn" 
        onClick={() => setCollapsed(false)}
        title="Mở bảng chuyển quyền nhanh"
      >
        <Shield size={18} /> Chuyển Quyền
      </button>
    );
  }

  return (
    <div className="quick-role-switcher-widget">
      <div className="widget-header">
        <strong>Demo Switcher (Chuyển vai trò)</strong>
        <button onClick={() => setCollapsed(true)}>×</button>
      </div>
      <div className="widget-body">
        <p>Hiện tại: <strong>{currentUser ? `${currentUser.name} (${currentUser.role})` : "Khách vãng lai"}</strong></p>
        <div className="switcher-btn-grid">
          <button 
            className={`btn-sw admin-sw ${currentUser?.role === "admin" ? "active" : ""}`}
            onClick={() => onSwitchRole("admin")}
          >
            Admin
          </button>
          <button 
            className={`btn-sw staff-sw ${currentUser?.role === "staff" ? "active" : ""}`}
            onClick={() => onSwitchRole("staff")}
          >
            Staff
          </button>
          <button 
            className={`btn-sw customer-sw ${currentUser?.role === "customer" ? "active" : ""}`}
            onClick={() => onSwitchRole("customer")}
          >
            Customer
          </button>
          <button 
            className="btn-sw logout-sw"
            onClick={() => onSwitchRole(null)}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
