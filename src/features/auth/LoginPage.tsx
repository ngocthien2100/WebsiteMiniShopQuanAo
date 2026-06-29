import { useState, FormEvent } from "react";
import { LogIn, Key, Mail, ShieldAlert } from "lucide-react";
import { User } from "@/shared/data/mockDb";
import { loginWithEmail } from "@/shared/services/authService";

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onNavigateToForgotPassword: () => void;
  onNavigateToRegister: () => void;
  onNavigateHome: () => void;
}

export default function LoginPage({
  onLoginSuccess,
  onNavigateToForgotPassword,
  onNavigateToRegister,
  onNavigateHome,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ email và mật khẩu.");
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await loginWithEmail(email, password);
      onLoginSuccess(user);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Không thể đăng nhập.");
    } finally {
      setIsSubmitting(false);
    }
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

          <button type="submit" className="primary-button auth-submit-btn" disabled={isSubmitting}>
            <LogIn size={18} /> {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="auth-helper-actions">
          <button className="text-button inline-btn" onClick={onNavigateToForgotPassword} type="button">
            Quên mật khẩu?
          </button>
        </div>

        <div className="auth-footer">
          Chưa có tài khoản?{" "}
          <button className="text-button inline-btn" onClick={onNavigateToRegister}>
            Đăng ký ngay
          </button>
        </div>

      </div>
    </div>
  );
}
