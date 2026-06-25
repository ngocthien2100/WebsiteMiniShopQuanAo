import { useState, FormEvent } from "react";
import { Calendar, Key, Mail, Phone, User as UserIcon, UserPlus, ShieldAlert, CheckCircle2 } from "lucide-react";
import { User } from "@/shared/data/mockDb";
import { registerWithEmail } from "@/shared/services/authService";

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
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: FormEvent) => {
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

    setIsSubmitting(true);
    try {
      const newUser = await registerWithEmail({
        name,
        email,
        password,
        phone,
        birthDate,
        gender,
      });

      setSuccess(true);

      if (newUser) {
        setSuccessMessage("Đăng ký thành công! Đang tự động đăng nhập...");
        setTimeout(() => {
          onRegisterSuccess(newUser);
        }, 1500);
      } else {
        setSuccessMessage("Đăng ký thành công. Vui lòng kiểm tra email xác thực rồi đăng nhập.");
        setTimeout(() => {
          onNavigateToLogin();
        }, 2200);
      }
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : "Không thể đăng ký tài khoản.");
    } finally {
      setIsSubmitting(false);
    }
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
            <span>{successMessage}</span>
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
            <label htmlFor="phone">Số điện thoại</label>
            <div className="input-wrapper">
              <Phone size={18} className="input-icon" />
              <input
                disabled={success}
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0901234567"
                type="tel"
                value={phone}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Ngày sinh</label>
            <div className="input-wrapper">
              <Calendar size={18} className="input-icon" />
              <input
                disabled={success}
                id="birthDate"
                onChange={(e) => setBirthDate(e.target.value)}
                type="date"
                value={birthDate}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Giới tính</label>
            <select
              disabled={success}
              id="gender"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <option value="">Không chọn</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
              <option value="prefer_not_to_say">Không muốn trả lời</option>
            </select>
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

          <button type="submit" className="primary-button auth-submit-btn" disabled={success || isSubmitting}>
            <UserPlus size={18} /> {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
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
