import { useState } from "react";
import {
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  User as UserIcon,
  XCircle,
  ChevronRight,
  UserCheck,
  Calendar,
  Mail,
  Lock,
} from "lucide-react";
import {
  User,
  Order,
  OrderStatus,
  getMockOrders,
  saveMockOrders,
} from "@/shared/data/mockDb";
import { formatCurrency } from "@/shared/data/products";

interface CustomerPanelProps {
  currentUser: User;
  onNavigateHome: () => void;
}

export default function CustomerPanel({ currentUser, onNavigateHome }: CustomerPanelProps) {
  const [orders, setOrders] = useState<Order[]>(() => {
    const allOrders = getMockOrders();
    // Lọc ra các đơn hàng của khách hàng hiện tại
    return allOrders.filter((o) => o.customerId === currentUser.id);
  });
  
  const [activeSubTab, setActiveSubTab] = useState<"orders" | "profile">("orders");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | OrderStatus>("all");

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      const allOrders = getMockOrders();
      const updatedAll = allOrders.map((o) => {
        if (o.id === orderId && o.customerId === currentUser.id) {
          return { ...o, status: "cancelled" as OrderStatus };
        }
        return o;
      });
      saveMockOrders(updatedAll);

      // Cập nhật lại state của trang này
      setOrders(updatedAll.filter((o) => o.customerId === currentUser.id));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: "cancelled" });
      }
    }
  };

  return (
    <section className="page-section customer-portal">
      <div className="portal-header">
        <div>
          <p className="eyebrow">Trang khách hàng</p>
          <h1>Xin chào, {currentUser.name}</h1>
          <p>Quản lý đơn hàng cá nhân, lịch sử mua sắm và thông tin tài khoản.</p>
        </div>
        <button className="primary-button" onClick={onNavigateHome}>
          Tiếp tục mua sắm
        </button>
      </div>

      <div className="portal-layout">
        {/* Sidebar điều hướng con */}
        <aside className="portal-menu">
          <button
            className={activeSubTab === "orders" ? "active" : ""}
            onClick={() => {
              setActiveSubTab("orders");
              setSelectedOrder(null);
            }}
          >
            <ShoppingBag size={18} /> Đơn hàng của tôi ({orders.length})
          </button>
          <button
            className={activeSubTab === "profile" ? "active" : ""}
            onClick={() => setActiveSubTab("profile")}
          >
            <UserIcon size={18} /> Thông tin cá nhân
          </button>
        </aside>

        {/* Khu vực nội dung */}
        <div className="portal-content">
          {activeSubTab === "orders" && (
            <div className="orders-tab-view">
              {!selectedOrder ? (
                <>
                  {/* Bộ lọc trạng thái */}
                  <div className="status-filters">
                    <button
                      className={filterStatus === "all" ? "active" : ""}
                      onClick={() => setFilterStatus("all")}
                    >
                      Tất cả
                    </button>
                    <button
                      className={filterStatus === "pending" ? "active" : ""}
                      onClick={() => setFilterStatus("pending")}
                    >
                      Chờ xác nhận
                    </button>
                    <button
                      className={filterStatus === "processing" ? "active" : ""}
                      onClick={() => setFilterStatus("processing")}
                    >
                      Đang xử lý
                    </button>
                    <button
                      className={filterStatus === "shipping" ? "active" : ""}
                      onClick={() => setFilterStatus("shipping")}
                    >
                      Đang giao
                    </button>
                    <button
                      className={filterStatus === "delivered" ? "active" : ""}
                      onClick={() => setFilterStatus("delivered")}
                    >
                      Đã giao
                    </button>
                    <button
                      className={filterStatus === "cancelled" ? "active" : ""}
                      onClick={() => setFilterStatus("cancelled")}
                    >
                      Đã hủy
                    </button>
                  </div>

                  {/* Danh sách đơn hàng */}
                  <div className="orders-list">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <article className="order-summary-card" key={order.id}>
                          <div className="card-header">
                            <div>
                              <strong>Mã đơn: {order.id}</strong>
                              <span className="order-date">
                                <Clock size={12} /> {new Date(order.createdAt).toLocaleString("vi-VN")}
                              </span>
                            </div>
                            <span className={`badge-status ${order.status}`}>
                              {order.status === "pending" && "Chờ xác nhận"}
                              {order.status === "processing" && "Đang xử lý"}
                              {order.status === "shipping" && "Đang giao"}
                              {order.status === "delivered" && "Đã giao"}
                              {order.status === "cancelled" && "Đã hủy"}
                            </span>
                          </div>

                          <div className="card-body">
                            <div className="items-preview">
                              {order.items.map((item, idx) => (
                                <span key={idx}>
                                  {item.product.name} ({item.size}/{item.color}) x{item.quantity}
                                </span>
                              ))}
                            </div>
                            <div className="order-total-price">
                              Tổng thanh toán: <strong>{formatCurrency(order.total)}</strong>
                            </div>
                          </div>

                          <div className="card-actions">
                            <button
                              className="text-button"
                              onClick={() => setSelectedOrder(order)}
                            >
                              Xem chi tiết <ChevronRight size={16} />
                            </button>
                            {(order.status === "pending" || order.status === "processing") && (
                              <button
                                className="cancel-btn-action"
                                onClick={() => handleCancelOrder(order.id)}
                              >
                                Hủy đơn hàng
                              </button>
                            )}
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="empty-state">
                        <ShoppingBag size={32} />
                        <h3>Không tìm thấy đơn hàng nào</h3>
                        <p>Bạn chưa đặt đơn hàng nào ở trạng thái này.</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Chi tiết một đơn hàng cụ thể */
                <div className="order-detail-view">
                  <button
                    className="text-button back-btn"
                    onClick={() => setSelectedOrder(null)}
                  >
                    ← Quay lại danh sách đơn hàng
                  </button>

                  <div className="detail-card">
                    <div className="detail-card-header">
                      <div>
                        <h2>Chi tiết đơn hàng {selectedOrder.id}</h2>
                        <span className="order-date">
                          Đặt lúc: {new Date(selectedOrder.createdAt).toLocaleString("vi-VN")}
                        </span>
                      </div>
                      <span className={`badge-status ${selectedOrder.status}`}>
                        {selectedOrder.status === "pending" && "Chờ xác nhận"}
                        {selectedOrder.status === "processing" && "Đang xử lý"}
                        {selectedOrder.status === "shipping" && "Đang giao"}
                        {selectedOrder.status === "delivered" && "Đã giao"}
                        {selectedOrder.status === "cancelled" && "Đã hủy"}
                      </span>
                    </div>

                    <div className="shipping-info-grid">
                      <div className="info-block">
                        <h3><MapPin size={16} /> Địa chỉ nhận hàng</h3>
                        <strong>{selectedOrder.customerName}</strong>
                        <p>{selectedOrder.address}</p>
                      </div>
                      <div className="info-block">
                        <h3><Phone size={16} /> Thông tin liên hệ</h3>
                        <p>Số điện thoại: {selectedOrder.phone}</p>
                        {selectedOrder.notes && <p className="notes-text">Ghi chú: {selectedOrder.notes}</p>}
                      </div>
                    </div>

                    <div className="order-products-table">
                      <h3>Danh sách sản phẩm</h3>
                      <div className="products-list-wrapper">
                        {selectedOrder.items.map((item, idx) => (
                          <div className="detail-product-row" key={idx}>
                            <img src={item.product.image} alt={item.product.name} />
                            <div className="prod-name-meta">
                              <h4>{item.product.name}</h4>
                              <span>Size: {item.size} | Màu: {item.color}</span>
                            </div>
                            <div className="prod-qty-price">
                              <span>{formatCurrency(item.product.price)} x{item.quantity}</span>
                              <strong>{formatCurrency(item.product.price * item.quantity)}</strong>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="order-summary-footer">
                      <div className="summary-line">
                        <span>Tạm tính</span>
                        <span>{formatCurrency(selectedOrder.total)}</span>
                      </div>
                      <div className="summary-line">
                        <span>Phí vận chuyển</span>
                        <span>Miễn phí</span>
                      </div>
                      <hr />
                      <div className="summary-line total-line">
                        <span>Tổng cộng</span>
                        <strong>{formatCurrency(selectedOrder.total)}</strong>
                      </div>
                    </div>

                    {(selectedOrder.status === "pending" || selectedOrder.status === "processing") && (
                      <div className="detail-card-actions">
                        <button
                          className="cancel-btn-action-large"
                          onClick={() => handleCancelOrder(selectedOrder.id)}
                        >
                          <XCircle size={18} /> Hủy đơn hàng này
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSubTab === "profile" && (
            <div className="profile-tab-view">
              <div className="profile-card">
                <h2>Thông tin tài khoản</h2>
                <div className="profile-info-list">
                  <div className="profile-info-item">
                    <UserIcon size={18} />
                    <div>
                      <small>Họ và tên</small>
                      <strong>{currentUser.name}</strong>
                    </div>
                  </div>
                  <div className="profile-info-item">
                    <Mail size={18} />
                    <div>
                      <small>Email tài khoản</small>
                      <strong>{currentUser.email}</strong>
                    </div>
                  </div>
                  <div className="profile-info-item">
                    <UserCheck size={18} />
                    <div>
                      <small>Vai trò hệ thống</small>
                      <strong style={{ textTransform: "capitalize" }}>{currentUser.role}</strong>
                    </div>
                  </div>
                  <div className="profile-info-item">
                    <Calendar size={18} />
                    <div>
                      <small>Ngày tham gia</small>
                      <strong>{new Date(currentUser.createdAt).toLocaleDateString("vi-VN")}</strong>
                    </div>
                  </div>
                </div>

                <div className="change-password-box">
                  <h3>Đổi mật khẩu</h3>
                  <div className="password-form-mock">
                    <label>
                      Mật khẩu hiện tại
                      <input type="password" placeholder="••••••••" disabled />
                    </label>
                    <label>
                      Mật khẩu mới
                      <input type="password" placeholder="••••••••" disabled />
                    </label>
                    <button className="secondary-button" disabled>
                      <Lock size={14} /> Cập nhật (Demo)
                    </button>
                    <small style={{ color: "#64748b", marginTop: "4px", display: "block" }}>
                      * Chức năng thay đổi thông tin cá nhân đã được thiết kế khung giao diện.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
