import { FormEvent, useMemo, useState } from "react";
import {
  Bot,
  Check,
  ChevronRight,
  MessageCircle,
  Minus,
  Plus,
  Search,
  Send,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { formatCurrency, Product, ProductCategory, products, shippingPolicy } from "@/data/products";
import "./App.css";

type Page = "home" | "products" | "detail" | "cart";
type CartItem = { product: Product; quantity: number; size: string; color: string };
type ChatMessage = { role: "bot" | "user"; text: string };

const categories: { value: "all" | ProductCategory; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "ao", label: "Áo" },
  { value: "quan", label: "Quần" },
  { value: "vay", label: "Váy" },
  { value: "phu-kien", label: "Phụ kiện" },
];

const webhookUrl =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_N8N_CHATBOT_WEBHOOK || "";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ProductCategory>("all");
  const [maxPrice, setMaxPrice] = useState(500000);
  const [orderDone, setOrderDone] = useState(false);

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return products.filter((product) => {
      const inCategory = category === "all" || product.category === category;
      const inPrice = product.price <= maxPrice;
      const inSearch =
        !keyword ||
        [product.name, product.categoryLabel, product.shortDescription, ...product.tags]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return inCategory && inPrice && inSearch;
    });
  }, [category, maxPrice, query]);

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

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOrderDone(true);
  }

  return (
    <div className="shop-app">
      <Header page={page} cartQuantity={cartQuantity} navigate={navigate} />

      <main>
        {page === "home" && (
          <HomePage
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

        {page === "detail" && (
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
          />
        )}
      </main>

      <ChatbotWidget />
      <Footer />
    </div>
  );
}

function Header({
  page,
  cartQuantity,
  navigate,
}: {
  page: Page;
  cartQuantity: number;
  navigate: (page: Page) => void;
}) {
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
          ["detail", "Chi tiết"],
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

      <button className="cart-button" onClick={() => navigate("cart")} type="button">
        <ShoppingBag size={18} />
        <span>{cartQuantity}</span>
      </button>
    </header>
  );
}

function HomePage({
  navigate,
  openProduct,
  addToCart,
}: {
  navigate: (page: Page) => void;
  openProduct: (product: Product) => void;
  addToCart: (product: Product) => void;
}) {
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
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
        </div>
        <div className="hero-media" aria-label="Ảnh lookbook thời trang">
          <img
            alt="Người mẫu mặc trang phục tối giản"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
          />
          <div className="floating-note">
            <Sparkles size={18} />
            8 sản phẩm mẫu, sẵn sàng cho chatbot tư vấn
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          title="Danh mục nổi bật"
          description="Bố cục rõ ràng để người xem demo hiểu nhanh shop đang bán gì."
        />
        <div className="category-grid">
          {categories.slice(1).map((item) => (
            <button
              className="category-card"
              key={item.value}
              onClick={() => navigate("products")}
              type="button"
            >
              <span>{item.label}</span>
              <ChevronRight size={18} />
            </button>
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
        ].map(([title, text]) => (
          <article key={title}>
            <Check size={22} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
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
          <p>Hiển thị {products.length} trên {products.length === 1 ? "1 sản phẩm" : "8 sản phẩm mẫu"}.</p>
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
              max="500000"
              min="100000"
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              step="50000"
              type="range"
              value={maxPrice}
            />
          </label>

          <div className="policy-box">
            <strong>Dữ liệu chatbot</strong>
            <p>Danh mục, giá, mô tả và chính sách ở trang này sẽ được gửi cho N8N khi tư vấn.</p>
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

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

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
            <button className="secondary-button" onClick={() => navigate("cart")} type="button">
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
}: {
  cart: CartItem[];
  cartTotal: number;
  updateQuantity: (productId: string, delta: number) => void;
  removeCartItem: (productId: string) => void;
  submitOrder: (event: FormEvent<HTMLFormElement>) => void;
  orderDone: boolean;
  navigate: (page: Page) => void;
}) {
  const shippingFee = cartTotal >= 500000 || cartTotal === 0 ? 0 : 30000;
  const finalTotal = cartTotal + shippingFee;

  return (
    <section className="page-section">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Giỏ hàng & thanh toán</p>
          <h1>Hoàn tất đơn hàng</h1>
          <p>Form đặt hàng mẫu, không xử lý thanh toán thật để đảm bảo an toàn đồ án.</p>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="cart-list">
          {cart.length > 0 ? (
            cart.map((item) => (
              <article className="cart-item" key={`${item.product.id}-${item.size}-${item.color}`}>
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
              </article>
            ))
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
          <label>
            Họ và tên
            <input required placeholder="Nguyễn Văn A" />
          </label>
          <label>
            Số điện thoại
            <input required pattern="[0-9 ]{9,13}" placeholder="090 123 4567" />
          </label>
          <label>
            Địa chỉ giao hàng
            <input required placeholder="Số nhà, đường, phường/xã..." />
          </label>
          <label>
            Ghi chú
            <textarea placeholder="Giao giờ hành chính, gọi trước khi đến..." />
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
              Đơn hàng mẫu đã được ghi nhận. Khi demo, bạn có thể nói đây là bước mô phỏng.
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
    <article className="product-card">
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
    </article>
  );
}

function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Chào bạn, mình là chatbot tư vấn của MiniStyle. Bạn có thể hỏi: 'Tôi có 200.000đ nên mua gì?' hoặc 'Sản phẩm nào hợp sinh viên?'",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    setInput("");
    setMessages((current) => [...current, { role: "user", text }]);
    setLoading(true);

    try {
      const answer = webhookUrl ? await askN8n(text) : buildLocalAnswer(text);
      setMessages((current) => [...current, { role: "bot", text: answer }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "bot",
          text: "Mình chưa kết nối được N8N webhook. Bạn kiểm tra biến VITE_N8N_CHATBOT_WEBHOOK hoặc thử lại sau nhé.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chatbot">
      {open && (
        <section className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <strong>MiniStyle AI</strong>
              <small>{webhookUrl ? "Đang dùng N8N webhook" : "Demo fallback nội bộ"}</small>
            </div>
            <button onClick={() => setOpen(false)} type="button">
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
                {message.text}
              </div>
            ))}
            {loading && <div className="message bot">Đang tư vấn...</div>}
          </div>

          <form className="chatbot-input" onSubmit={sendMessage}>
            <input
              onChange={(event) => setInput(event.target.value)}
              placeholder="Nhập câu hỏi tư vấn..."
              value={input}
            />
            <button type="submit">
              <Send size={18} />
            </button>
          </form>
        </section>
      )}

      <button className="chatbot-toggle" onClick={() => setOpen((value) => !value)} type="button">
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

async function askN8n(question: string) {
  const response = await fetch(webhookUrl, {
    body: JSON.stringify({
      question,
      products,
      policy: shippingPolicy,
      instruction:
        "Bạn là nhân viên tư vấn bán quần áo MiniStyle. Chỉ tư vấn dựa trên dữ liệu sản phẩm và chính sách được gửi kèm. Nếu thiếu thông tin, hãy hỏi lại ngắn gọn.",
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("N8N webhook request failed");
  }

  const data = await response.json();
  return data.answer || data.message || data.text || "Mình đã nhận câu hỏi nhưng N8N chưa trả về trường answer.";
}

function buildLocalAnswer(question: string) {
  const normalized = question.toLowerCase();
  const budgetMatch = normalized.match(/(\d+)\s*(k|nghìn|000|đ|vnd)?/);
  const budget = budgetMatch ? Number(budgetMatch[1]) * (budgetMatch[1].length <= 3 ? 1000 : 1) : 0;

  if (normalized.includes("giao") || normalized.includes("ship")) {
    return shippingPolicy.delivery;
  }

  if (normalized.includes("đổi") || normalized.includes("size")) {
    return shippingPolicy.returnPolicy;
  }

  if (normalized.includes("đặt") || normalized.includes("mua")) {
    return shippingPolicy.orderGuide;
  }

  const matched = products
    .filter((product) => (budget ? product.price <= budget : true))
    .filter((product) =>
      normalized.includes("sinh viên")
        ? product.suitableFor.some((item) => item.toLowerCase().includes("sinh viên"))
        : true,
    )
    .slice(0, 3);

  const suggestions = matched.length ? matched : products.slice(0, 3);

  return `Mình gợi ý ${suggestions
    .map((product) => `${product.name} (${formatCurrency(product.price)})`)
    .join(", ")}. Lý do: các sản phẩm này dễ phối, giá rõ ràng và có mô tả phù hợp trong dữ liệu shop.`;
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

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h2>MiniStyle</h2>
        <p>Website bán hàng mini tích hợp chatbot tư vấn sản phẩm qua N8N.</p>
      </div>
      <div>
        <strong>Liên kết</strong>
        <span>Trang chủ</span>
        <span>Sản phẩm</span>
        <span>Giỏ hàng</span>
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

export default App;
