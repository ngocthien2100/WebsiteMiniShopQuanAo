import { FormEvent, ReactNode, useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  Check,
  ChevronRight,
  Clock,
  Key,
  Loader2,
  Mail,
  MapPin,
  Minus,
  MessageCircle,
  Phone,
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
  getMockOrders,
} from "@/shared/data/mockDb";
import { createOrder, loadProducts } from "@/shared/services/shopRepository";
import { getCurrentAuthUser, logoutAuthUser } from "@/shared/services/authService";

import LoginPage from "@/features/auth/LoginPage";
import RegisterPage from "@/features/auth/RegisterPage";
import ForgotPasswordPage from "@/features/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/ResetPasswordPage";
import ChangePasswordPage from "@/features/auth/ChangePasswordPage";
import AdminPanel from "@/features/admin/AdminPanel";
import StaffPanel from "@/features/staff/StaffPanel";
import CustomerPanel from "@/features/customer/CustomerPanel";
import N8nChatWidget from "@/features/chatbot/N8nChatWidget";

import "./App.css";

type Page =
  | "home"
  | "products"
  | "detail"
  | "contact"
  | "cart"
  | "login"
  | "register"
  | "forgot-password"
  | "reset-password"
  | "change-password"
  | "admin"
  | "staff"
  | "customer";
type CartItem = { product: Product; quantity: number; size: string; color: string };
type AsyncStatus = "idle" | "loading" | "success" | "error";

const categories: { value: "all" | ProductCategory; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "ao", label: "Áo" },
  { value: "quan", label: "Quần" },
  { value: "vay", label: "Váy" },
  { value: "phu-kien", label: "Phụ kiện" },
];

const categoryStories: Record<ProductCategory, string> = {
  ao: "Layering gọn gàng cho lịch học, đi làm và cuối tuần.",
  quan: "Phom dễ mặc, cân bằng giữa thoải mái và chỉn chu.",
  vay: "Các dáng váy mềm, nhẹ, hợp cafe, đi học và hẹn gặp.",
  "phu-kien": "Điểm nhấn nhỏ giúp outfit có cá tính hơn.",
};

const roleLabels: Record<User["role"], string> = {
  admin: "Quản trị viên",
  staff: "Nhân viên",
  customer: "Khách hàng",
};

const DEFAULT_PRICE_LIMIT = 20_000_000;
const PRICE_FILTER_STEP = 100_000;
const facebookMessengerUrl =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_FACEBOOK_MESSENGER_URL?.trim() ||
  "https://www.facebook.com/";

const pageVariants = {
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(6px)" },
};

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function createOrderId() {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MS-${Date.now().toString().slice(-8)}-${suffix}`;
}

function App() {
  const [page, setPage] = useState<Page>("home");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [productsStatus, setProductsStatus] = useState<AsyncStatus>("idle");
  const [productsError, setProductsError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ProductCategory>("all");
  const [maxPrice, setMaxPrice] = useState(DEFAULT_PRICE_LIMIT);
  const [orderDone, setOrderDone] = useState(false);
  const [orderError, setOrderError] = useState("");

  // Form đặt hàng
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const refreshProducts = async () => {
    setProductsStatus("loading");
    setProductsError("");
    try {
      const loadedProducts = await loadProducts({ fallbackOnError: false });
      setProductsList(loadedProducts);
      setProductsStatus("success");
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : "Không thể tải danh sách sản phẩm.");
      setProductsStatus("error");
    }
  };

  // Khởi tạo mock DB và đồng bộ dữ liệu
  useEffect(() => {
    let cancelled = false;
    initMockDb();

    const authMode = new URLSearchParams(window.location.search).get("auth");
    if (authMode === "reset-password") {
      setPage("reset-password");
    }

    setProductsStatus("loading");
    setProductsError("");
    loadProducts({ fallbackOnError: false })
      .then((loadedProducts) => {
        if (!cancelled) {
          setProductsList(loadedProducts);
          setProductsStatus("success");
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setProductsError(error instanceof Error ? error.message : "Không thể tải danh sách sản phẩm.");
          setProductsStatus("error");
        }
      });
    getCurrentAuthUser().then((logged) => {
      if (!cancelled && logged) {
        setCurrentUser(logged);
        setCustomerName(logged.name);
        setPhone(logged.phone || "");
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Lắng nghe sự thay đổi của trang để cập nhật lại danh sách sản phẩm (ví dụ sau khi Admin/Staff chỉnh sửa)
  useEffect(() => {
    let cancelled = false;
    if (page === "products" || page === "home" || page === "detail") {
      setProductsStatus("loading");
      setProductsError("");
      loadProducts({ fallbackOnError: false })
        .then((loadedProducts) => {
          if (!cancelled) {
            setProductsList(loadedProducts);
            setProductsStatus("success");
          }
        })
        .catch((error) => {
          if (!cancelled) {
            setProductsError(error instanceof Error ? error.message : "Không thể tải danh sách sản phẩm.");
            setProductsStatus("error");
          }
        });
    }

    return () => {
      cancelled = true;
    };
  }, [page]);

  const productPriceLimit = useMemo(() => {
    const highestPrice = productsList.reduce((highest, product) => Math.max(highest, product.price), 0);
    const roundedHighest = Math.ceil(highestPrice / 1_000_000) * 1_000_000;
    return Math.max(DEFAULT_PRICE_LIMIT, roundedHighest);
  }, [productsList]);

  useEffect(() => {
    setMaxPrice((current) => Math.max(current, productPriceLimit));
  }, [productPriceLimit]);

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
    setOrderError("");
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
  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOrderError("");

    // Tạo đơn hàng mới
    const newOrder: Order = {
      id: createOrderId(),
      customerId: currentUser ? currentUser.id : "guest-customer",
      customerName: customerName || "Khách vãng lai",
      phone: phone.trim() || currentUser?.phone || "",
      address: address,
      notes: notes,
      items: cart,
      total: cartTotal + (cartTotal >= 500000 ? 0 : 30000),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await createOrder(newOrder);

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
    } catch (error) {
      setOrderError(error instanceof Error ? error.message : "Không thể lưu đơn hàng.");
    }
  }

  const handleLogout = async () => {
    await logoutAuthUser();
    setCurrentUser(null);
    setCustomerName("");
    setPhone("");
    navigate("home");
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCustomerName(user.name);
    setPhone(user.phone || "");
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
    setPhone(user.phone || "");
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
          onNavigateToChangePassword={() => navigate("change-password")}
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
                priceLimit={productPriceLimit}
                status={productsStatus}
                error={productsError}
                hasProducts={productsList.length > 0}
                onRetry={refreshProducts}
                openProduct={openProduct}
                addToCart={addToCart}
              />
            )}

            {page === "detail" && selectedProduct && (
              <ProductDetailPage
                product={selectedProduct}
                productsList={productsList}
                addToCart={addToCart}
                openProduct={openProduct}
                navigate={navigate}
              />
            )}

            {page === "contact" && <ContactPage navigate={navigate} />}

            {page === "cart" && (
              <CartPage
                cart={cart}
                cartTotal={cartTotal}
                updateQuantity={updateQuantity}
                removeCartItem={removeCartItem}
                submitOrder={submitOrder}
                orderDone={orderDone}
                orderError={orderError}
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
                onNavigateToForgotPassword={() => navigate("forgot-password")}
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

            {page === "forgot-password" && (
              <ForgotPasswordPage
                onNavigateToLogin={() => navigate("login")}
                onNavigateHome={() => navigate("home")}
              />
            )}

            {page === "reset-password" && (
              <ResetPasswordPage
                onNavigateToLogin={() => navigate("login")}
                onNavigateHome={() => navigate("home")}
              />
            )}

            {page === "change-password" && currentUser && (
              <ChangePasswordPage
                currentUser={currentUser}
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
      {!isDashboardView && <FacebookMessengerWidget />}
      {!isDashboardView && <Footer navigate={navigate} />}
    </div>
  );
}

function FacebookMessengerWidget() {
  return (
    <a
      aria-label="Chat với MiniStyle trên Facebook Messenger"
      className="facebook-chat-link"
      href={facebookMessengerUrl}
      rel="noreferrer"
      target="_blank"
    >
      <MessengerLogo />
    </a>
  );
}

function MessengerLogo() {
  return (
    <svg aria-hidden="true" className="messenger-logo" viewBox="0 0 36 36">
      <defs>
        <linearGradient id="messengerGradient" x1="6" x2="30" y1="30" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#006AFF" />
          <stop offset="0.52" stopColor="#A033FF" />
          <stop offset="1" stopColor="#FF5280" />
        </linearGradient>
      </defs>
      <path
        d="M18 3C9.5 3 3 9.2 3 17.6c0 4.5 1.9 8.4 5 11.1v4.7c0 .4.5.7.8.5l4.5-2.5c1.5.4 3 .7 4.7.7 8.5 0 15-6.2 15-14.6S26.5 3 18 3Z"
        fill="url(#messengerGradient)"
      />
      <path
        d="m9.4 21.8 4.4-7c.7-1.1 2.2-1.4 3.2-.5l3.5 2.6c.3.2.8.2 1.1-.1l4.7-4.5c.6-.6 1.6.2 1.1.9l-4.4 7c-.7 1.1-2.2 1.4-3.2.5l-3.5-2.6c-.3-.2-.8-.2-1.1.1l-4.7 4.5c-.6.6-1.6-.2-1.1-.9Z"
        fill="white"
      />
    </svg>
  );
}

function ContactPage({ navigate }: { navigate: (page: Page) => void }) {
  const contactChannels = [
    {
      icon: MessageCircle,
      title: "Facebook Messenger",
      text: "Nhắn tin trực tiếp để được tư vấn size, màu sắc và cách phối đồ.",
      action: "Mở Messenger",
      href: facebookMessengerUrl,
    },
    {
      icon: Mail,
      title: "Email hỗ trợ",
      text: "Gửi câu hỏi về tài khoản, đơn hàng hoặc phản hồi kỹ thuật.",
      action: "Gửi email",
      href: "mailto:ministyle.support@example.com",
    },
    {
      icon: Phone,
      title: "Tư vấn nhanh",
      text: "Liên hệ trong giờ làm việc để được hỗ trợ chọn sản phẩm.",
      action: "Gọi tư vấn",
      href: "tel:+84900000000",
    },
  ];

  return (
    <section className="page-section contact-page">
      <div className="contact-hero">
        <div>
          <p className="eyebrow">Liên hệ MiniStyle</p>
          <h1>Luôn sẵn sàng hỗ trợ lựa chọn outfit phù hợp.</h1>
          <p>
            Cần tư vấn size, phối đồ, chính sách đổi size hoặc thông tin đơn hàng?
            MiniStyle ưu tiên phản hồi nhanh qua Messenger và các kênh hỗ trợ bên dưới.
          </p>
          <div className="contact-actions">
            <a className="primary-button" href={facebookMessengerUrl} rel="noreferrer" target="_blank">
              Nhắn Messenger <MessageCircle size={18} />
            </a>
            <button className="secondary-button" onClick={() => navigate("products")} type="button">
              Xem bộ sưu tập
            </button>
          </div>
        </div>
        <div className="contact-note">
          <Clock size={22} />
          <strong>Thời gian hỗ trợ</strong>
          <p>08:00 - 21:00 mỗi ngày. Tin nhắn ngoài giờ sẽ được phản hồi vào ca làm việc tiếp theo.</p>
        </div>
      </div>

      <div className="contact-grid">
        {contactChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <a className="contact-card" href={channel.href} key={channel.title} rel="noreferrer" target="_blank">
              <Icon size={24} />
              <span>
                <strong>{channel.title}</strong>
                <small>{channel.text}</small>
              </span>
              <em>{channel.action}</em>
            </a>
          );
        })}
      </div>

      <div className="contact-info-band">
        <article>
          <MapPin size={22} />
          <div>
            <strong>Khu vực phục vụ</strong>
            <p>Giao hàng toàn quốc, phù hợp demo vận hành thương mại điện tử tại Việt Nam.</p>
          </div>
        </article>
        <article>
          <Check size={22} />
          <div>
            <strong>Thông tin cần chuẩn bị</strong>
            <p>Khi cần hỗ trợ đơn hàng, hãy gửi họ tên, số điện thoại và sản phẩm quan tâm.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function Header({
  page,
  cartQuantity,
  navigate,
  currentUser,
  onLogout,
  onNavigateToChangePassword,
}: {
  page: Page;
  cartQuantity: number;
  navigate: (page: Page) => void;
  currentUser: User | null;
  onLogout: () => void;
  onNavigateToChangePassword: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <div className="atelier-bar">
        <span>MiniStyle Studio</span>
        <span>Miễn phí vận chuyển từ 500.000đ</span>
        <span>Đổi size trong 7 ngày</span>
      </div>
      <header className="site-header">
        <button className="brand" onClick={() => navigate("home")} type="button">
          <span className="brand-mark">MS</span>
          <span>
            <strong>MiniStyle</strong>
            <small>Thời trang ứng dụng mỗi ngày</small>
          </span>
        </button>

        <nav className="main-nav" aria-label="Điều hướng chính">
          {[
            ["home", "Trang chủ"],
            ["products", "Bộ sưu tập"],
            ["contact", "Liên hệ"],
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
                  <span className="role-tag">{roleLabels[currentUser.role]}</span>
                </div>
                <hr />
                {currentUser.role === "admin" && (
                  <button onClick={() => { navigate("admin"); setDropdownOpen(false); }}>
                    <Shield size={16} /> Trang quản trị
                  </button>
                )}
                {currentUser.role === "staff" && (
                  <button onClick={() => { navigate("staff"); setDropdownOpen(false); }}>
                    <UserCheck size={16} /> Trang nhân viên
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
                <button onClick={() => { onNavigateToChangePassword(); setDropdownOpen(false); }}>
                  <Key size={16} /> Đổi mật khẩu
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
    </>
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
          <p className="eyebrow">Bộ sưu tập xuân MiniStyle</p>
          <h1>Thời trang hằng ngày, phối đồ có chủ đích.</h1>
          <p>
            Tuyển chọn các item dễ mặc cho sinh viên và người đi làm trẻ: rõ phom,
            dễ phối, có dữ liệu sản phẩm thật, chatbot trực tiếp và kênh Messenger cho nhu cầu mua sắm.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => navigate("products")} type="button">
              Khám phá bộ sưu tập <ChevronRight size={18} />
            </button>
            <button className="secondary-button" onClick={() => navigate("products")} type="button">
              Tư vấn outfit
            </button>
          </div>
          <div className="hero-metrics" aria-label="Điểm nổi bật MiniStyle">
            <span><strong>{productsList.length}</strong>Sản phẩm</span>
            <span><strong>3</strong>Vai trò</span>
            <span><strong>AI</strong>Tư vấn</span>
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
            Auth, database & chatbot đã sẵn sàng
          </motion.div>
        </motion.div>
      </section>

      <section className="editorial-strip" aria-label="Điểm nhấn trải nghiệm">
        <span>Sản phẩm mới</span>
        <span>Đồ đi học</span>
        <span>Đi làm gọn gàng</span>
        <span>Phụ kiện nổi bật</span>
      </section>

      <section className="section">
        <SectionHeading
          title="Chọn theo phong cách"
          description="Danh mục được viết theo nhu cầu phối đồ để người dùng chọn nhanh hơn."
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
              <span>
                <strong>{item.label}</strong>
                <small>{categoryStories[item.value as ProductCategory]}</small>
              </span>
              <ChevronRight size={18} />
            </motion.button>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          title="Sản phẩm được chọn lọc"
          description="Thẻ sản phẩm được tối giản để ảnh, tên, giá và lựa chọn mua nổi bật hơn."
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
  priceLimit,
  status,
  error,
  hasProducts,
  onRetry,
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
  priceLimit: number;
  status: AsyncStatus;
  error: string;
  hasProducts: boolean;
  onRetry: () => void;
  openProduct: (product: Product) => void;
  addToCart: (product: Product) => void;
}) {
  const updateMaxPrice = (value: number) => {
    const safeValue = Number.isFinite(value) ? value : DEFAULT_PRICE_LIMIT;
    setMaxPrice(Math.min(priceLimit, Math.max(0, safeValue)));
  };

  return (
    <section className="page-section">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Danh sách sản phẩm</p>
          <h1>Bộ sưu tập</h1>
          <p>{products.length} sản phẩm đang hiển thị, đồng bộ từ hệ thống dữ liệu của shop.</p>
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

          <label className="price-filter-control">
            <span>Giá tối đa: {formatCurrency(maxPrice)}</span>
            <input
              max={priceLimit}
              min="0"
              onChange={(event) => updateMaxPrice(Number(event.target.value))}
              step={PRICE_FILTER_STEP}
              type="range"
              value={maxPrice}
            />
            <input
              aria-label="Nhập giá tối đa"
              className="price-number-input"
              max={priceLimit}
              min="0"
              onChange={(event) => updateMaxPrice(Number(event.target.value))}
              step={PRICE_FILTER_STEP}
              type="number"
              value={maxPrice}
            />
            <small>Có thể lọc đến {formatCurrency(priceLimit)}</small>
          </label>

          <div className="policy-box">
            <strong>Danh mục đang đồng bộ</strong>
            <p>Quản trị viên và nhân viên chỉnh sửa sản phẩm, danh mục sẽ cập nhật lại trên trang bán hàng sau khi tải lại dữ liệu.</p>
          </div>
        </aside>

        <div className="catalog-results">
          <div className="catalog-toolbar">
            <span>{products.length} sản phẩm</span>
            <span>Sắp xếp theo mức độ phù hợp</span>
          </div>
          {status === "loading" && (
            <StatusState
              description="Hệ thống đang đồng bộ danh sách sản phẩm mới nhất từ cơ sở dữ liệu."
              icon={<Loader2 size={28} />}
              title="Đang tải sản phẩm"
              variant="loading"
            />
          )}

          {status === "error" && (
            <StatusState
              actionLabel="Thử tải lại"
              description={error || "Không thể kết nối dữ liệu sản phẩm. Vui lòng kiểm tra Supabase hoặc mạng."}
              icon={<AlertCircle size={28} />}
              onAction={onRetry}
              title="Không thể tải sản phẩm"
              variant="error"
            />
          )}

          {status !== "loading" && status !== "error" && (
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
              <StatusState
                description={
                  hasProducts
                    ? "Thử đổi danh mục, từ khóa hoặc tăng khoảng giá để xem thêm sản phẩm."
                    : "Kho sản phẩm hiện chưa có dữ liệu. Quản trị viên hoặc nhân viên cần thêm sản phẩm trước."
                }
                icon={<Search size={28} />}
                title={hasProducts ? "Không tìm thấy sản phẩm phù hợp" : "Chưa có sản phẩm"}
              />
            )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StatusState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = "empty",
}: {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: "empty" | "loading" | "error";
}) {
  return (
    <div className={`empty-state status-state ${variant}`}>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && onAction && (
        <button className="secondary-button" onClick={onAction} type="button">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function ProductDetailPage({
  product,
  productsList,
  addToCart,
  openProduct,
  navigate,
}: {
  product: Product;
  productsList: Product[];
  addToCart: (product: Product, size?: string, color?: string) => void;
  openProduct: (product: Product) => void;
  navigate: (page: Page) => void;
}) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

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
  orderError,
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
  orderError: string;
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
                    <button aria-label="Giảm số lượng" title="Giảm số lượng" onClick={() => updateQuantity(item.product.id, -1)} type="button">
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button aria-label="Tăng số lượng" title="Tăng số lượng" onClick={() => updateQuantity(item.product.id, 1)} type="button">
                      <Plus size={16} />
                    </button>
                  </div>
                  <button aria-label="Xóa sản phẩm khỏi giỏ hàng" className="icon-button" title="Xóa sản phẩm khỏi giỏ hàng" onClick={() => removeCartItem(item.product.id)} type="button">
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
                  <MessageCircle size={18} />
                  <div>
                    <strong>Chat hỗ trợ</strong>
                    <p>Có thể hỏi chatbot trực tiếp hoặc nhắn Messenger về size, ngân sách, cách đặt hàng và chính sách đổi trả.</p>
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
            Số điện thoại liên hệ <span className="optional-note">(bắt buộc nhập)</span>
            <input
              inputMode="tel"
              placeholder="Ví dụ: số của bạn hoặc người thân nhận hàng"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <small className="field-hint">Nếu để trống, đơn hàng vẫn được lưu và bạn có thể dùng số của người nhận khác sau.</small>
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

          {orderError && (
            <div className="modal-error">
              {orderError}
            </div>
          )}

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
        <span className="image-quick-view">Xem chi tiết</span>
      </button>
      <div className="product-body">
        <span>{product.categoryLabel}</span>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <div className="product-meta-row">
          <span>{product.colors.slice(0, 3).join(" / ")}</span>
          <span>{product.sizes.slice(0, 3).join(", ")}</span>
        </div>
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
        <p>Website bán hàng mini theo hướng thương mại thời trang, có xác thực Supabase, cơ sở dữ liệu, chatbot trực tiếp và kênh tư vấn Messenger.</p>
      </div>
      <div>
        <strong>Liên kết</strong>
        <button className="footer-nav-link" onClick={() => navigate("home")} type="button">Trang chủ</button>
        <button className="footer-nav-link" onClick={() => navigate("products")} type="button">Sản phẩm</button>
        <button className="footer-nav-link" onClick={() => navigate("cart")} type="button">Giỏ hàng</button>
        <button className="footer-nav-link" onClick={() => navigate("contact")} type="button">Liên hệ</button>
      </div>
      <div>
        <strong>Mạng xã hội</strong>
        <a className="footer-link" href={facebookMessengerUrl} rel="noreferrer" target="_blank">
          Facebook
        </a>
      </div>
    </footer>
  );
}

export default App;
