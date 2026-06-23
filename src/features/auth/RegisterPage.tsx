import { useState, FormEvent } from "react";
import { UserPlus, Key, Mail, User as UserIcon, ShieldAlert, CheckCircle2 } from "lucide-react";
import { getMockUsers, saveMockUsers, setLoggedUser, User } from "@/shared/data/mockDb";

interface RegisterPageProps {
  onRegisterSuccess: (user: User) => void;
  onNavigateToLogin: () => void;
  onNavigateHome: () => void;
}

export default function RegisterPage({
  onRegisterSuccess,
  onNavigateToLogin,
  onNavigateHome,
}: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ tất cả các trường.");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải chứa ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    const users = getMockUsers();
    const emailExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      setError("Email này đã được sử dụng bởi một tài khoản khác.");
      return;
    }

    const newUser: User = {
      id: "user-" + Date.now(),
      name,
      email,
      password,
      role: "customer", // Mặc định khi đăng ký là Customer
      status: "active",
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    saveMockUsers(updatedUsers);

    setSuccess(true);
    
    // Đăng nhập tự động sau khi đăng ký thành công sau 1.5 giây
    setTimeout(() => {
      setLoggedUser(newUser);
      onRegisterSuccess(newUser);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo" onClick={onNavigateHome}>MS</div>
          <h2>Tạo tài khoản mới</h2>
          <p>Tham gia MiniStyle để mua sắm và theo dõi đơn hàng</p>
        </div>

        {error && (
          <div className="auth-error-box">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="auth-success-box">
            <CheckCircle2 size={18} />
            <span>Đăng ký thành công! Đang tự động đăng nhập...</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Họ và tên</label>
            <div className="input-wrapper">
              <UserIcon size={18} className="input-icon" />
              <input
                id="name"
                type="text"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={success}
              />
            </div>
          </div>

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
                disabled={success}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu (tối thiểu 6 ký tự)</label>
            <div className="input-wrapper">
              <Key size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={success}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <div className="input-wrapper">
              <Key size={18} className="input-icon" />
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={success}
              />
            </div>
          </div>

          <button type="submit" className="primary-button auth-submit-btn" disabled={success}>
            <UserPlus size={18} /> Đăng ký
          </button>
        </form>

        <div className="auth-footer">
          Đã có tài khoản?{" "}
          <button className="text-button inline-btn" onClick={onNavigateToLogin} disabled={success}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
