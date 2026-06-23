import { useState, FormEvent } from "react";
import { LogIn, Key, Mail, ShieldAlert, UserCheck, Shield } from "lucide-react";
import { getMockUsers, setLoggedUser, User } from "@/shared/data/mockDb";

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onNavigateToRegister: () => void;
  onNavigateHome: () => void;
}

export default function LoginPage({
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateHome,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ email và mật khẩu.");
      return;
    }

    const users = getMockUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      setError("Email hoặc mật khẩu không chính xác.");
      return;
    }

    if (user.status === "blocked") {
      setError("Tài khoản của bạn đã bị khóa bởi Admin.");
      return;
    }

    setLoggedUser(user);
    onLoginSuccess(user);
  };

  // Hàm hỗ trợ đăng nhập nhanh phục vụ chấm điểm đồ án
  const handleQuickLogin = (role: "admin" | "staff" | "customer") => {
    let qEmail = "";
    let qPass = "";

    if (role === "admin") {
      qEmail = "admin@ministyle.com";
      qPass = "admin123";
    } else if (role === "staff") {
      qEmail = "staff@ministyle.com";
      qPass = "staff123";
    } else {
      qEmail = "customer@ministyle.com";
      qPass = "customer123";
    }

    setEmail(qEmail);
    setPassword(qPass);
    
    // Tự động submit sau một nhịp thở nhỏ của CPU để người dùng nhìn thấy dữ liệu điền
    setTimeout(() => {
      const users = getMockUsers();
      const user = users.find((u) => u.email === qEmail && u.password === qPass);
      if (user && user.status === "active") {
        setLoggedUser(user);
        onLoginSuccess(user);
      }
    }, 100);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo" onClick={onNavigateHome}>MS</div>
          <h2>Chào mừng quay lại</h2>
          <p>Đăng nhập tài khoản MiniStyle của bạn</p>
        </div>

        {error && (
          <div className="auth-error-box">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-wrapper">
              <Key size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="primary-button auth-submit-btn">
            <LogIn size={18} /> Đăng nhập
          </button>
        </form>

        <div className="auth-footer">
          Chưa có tài khoản?{" "}
          <button className="text-button inline-btn" onClick={onNavigateToRegister}>
            Đăng ký ngay
          </button>
        </div>

        {/* Khu vực Demo Đăng nhập nhanh - Cực kỳ hữu ích khi chấm điểm đồ án */}
        <div className="quick-login-section">
          <div className="quick-login-divider">
            <span>Dành cho Giảng viên (Demo Quick Login)</span>
          </div>
          <div className="quick-login-buttons">
            <button 
              type="button" 
              className="quick-btn quick-admin"
              onClick={() => handleQuickLogin("admin")}
              title="Tài khoản: admin@ministyle.com | MK: admin123"
            >
              <Shield size={16} /> Admin Panel
            </button>
            <button 
              type="button" 
              className="quick-btn quick-staff"
              onClick={() => handleQuickLogin("staff")}
              title="Tài khoản: staff@ministyle.com | MK: staff123"
            >
              <UserCheck size={16} /> Staff (Nhân viên)
            </button>
            <button 
              type="button" 
              className="quick-btn quick-customer"
              onClick={() => handleQuickLogin("customer")}
              title="Tài khoản: customer@ministyle.com | MK: customer123"
            >
              <UserCheck size={16} /> Customer (Khách)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
