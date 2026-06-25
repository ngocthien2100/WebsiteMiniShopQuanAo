import { FormEvent, useState } from "react";
import { CheckCircle2, Key, ShieldAlert } from "lucide-react";
import { updateCurrentPassword } from "@/shared/services/authService";

interface ResetPasswordPageProps {
  onNavigateToLogin: () => void;
  onNavigateHome: () => void;
}

export default function ResetPasswordPage({
  onNavigateToLogin,
  onNavigateHome,
}: ResetPasswordPageProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Mật khẩu phải chứa ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateCurrentPassword(password);
      setSuccess("Đổi mật khẩu thành công. Bạn có thể đăng nhập bằng mật khẩu mới.");
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(onNavigateToLogin, 1400);
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Không thể đặt lại mật khẩu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo" onClick={onNavigateHome}>MS</div>
          <h2>Đặt lại mật khẩu</h2>
          <p>Nhập mật khẩu mới cho tài khoản MiniStyle.</p>
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
            <span>{success}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="new-password">Mật khẩu mới</label>
            <div className="input-wrapper">
              <Key size={18} className="input-icon" />
              <input
                id="new-password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
                type="password"
                value={password}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-new-password">Xác nhận mật khẩu mới</label>
            <div className="input-wrapper">
              <Key size={18} className="input-icon" />
              <input
                id="confirm-new-password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••"
                required
                type="password"
                value={confirmPassword}
              />
            </div>
          </div>

          <button className="primary-button auth-submit-btn" disabled={isSubmitting} type="submit">
            <Key size={18} /> {isSubmitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
}
