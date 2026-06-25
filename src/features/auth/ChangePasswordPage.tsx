import { FormEvent, useState } from "react";
import { CheckCircle2, Key, ShieldAlert } from "lucide-react";
import { User } from "@/shared/data/mockDb";
import { updateCurrentPassword } from "@/shared/services/authService";

interface ChangePasswordPageProps {
  currentUser: User;
  onNavigateHome: () => void;
}

export default function ChangePasswordPage({
  currentUser,
  onNavigateHome,
}: ChangePasswordPageProps) {
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
      setPassword("");
      setConfirmPassword("");
      setSuccess("Mật khẩu đã được cập nhật thành công.");
    } catch (changeError) {
      setError(changeError instanceof Error ? changeError.message : "Không thể đổi mật khẩu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo" onClick={onNavigateHome}>MS</div>
          <h2>Đổi mật khẩu</h2>
          <p>Tài khoản: {currentUser.email}</p>
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
            <label htmlFor="change-password">Mật khẩu mới</label>
            <div className="input-wrapper">
              <Key size={18} className="input-icon" />
              <input
                id="change-password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
                type="password"
                value={password}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="change-confirm-password">Xác nhận mật khẩu mới</label>
            <div className="input-wrapper">
              <Key size={18} className="input-icon" />
              <input
                id="change-confirm-password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••"
                required
                type="password"
                value={confirmPassword}
              />
            </div>
          </div>

          <button className="primary-button auth-submit-btn" disabled={isSubmitting} type="submit">
            <Key size={18} /> {isSubmitting ? "Đang cập nhật..." : "Đổi mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
}
