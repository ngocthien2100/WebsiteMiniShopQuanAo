import { FormEvent, useState } from "react";
import { CheckCircle2, KeyRound, Mail, ShieldAlert } from "lucide-react";
import { requestPasswordReset } from "@/shared/services/authService";

interface ForgotPasswordPageProps {
  onNavigateToLogin: () => void;
  onNavigateHome: () => void;
}

export default function ForgotPasswordPage({
  onNavigateToLogin,
  onNavigateHome,
}: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Vui lòng nhập email tài khoản.");
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPasswordReset(email);
      setSuccess("Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra Gmail của bạn.");
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Không thể gửi email đặt lại mật khẩu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo" onClick={onNavigateHome}>MS</div>
          <h2>Quên mật khẩu</h2>
          <p>Nhập email để nhận liên kết đặt lại mật khẩu.</p>
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
            <label htmlFor="reset-email">Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="reset-email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email@example.com"
                required
                type="email"
                value={email}
              />
            </div>
          </div>

          <button className="primary-button auth-submit-btn" disabled={isSubmitting} type="submit">
            <KeyRound size={18} /> {isSubmitting ? "Đang gửi..." : "Gửi email đặt lại"}
          </button>
        </form>

        <div className="auth-footer">
          <button className="text-button inline-btn" onClick={onNavigateToLogin}>
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
