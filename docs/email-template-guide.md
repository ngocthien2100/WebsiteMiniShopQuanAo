# MiniStyle email templates

Thư mục `email-templates/` chứa các mẫu email HTML cùng phong cách với website MiniStyle. Tất cả CSS đều viết inline để tương thích tốt hơn với Gmail và các email client.

## Supabase Auth

Vào Supabase Dashboard:

```text
Authentication -> Email Templates
```

Dán nội dung các file tương ứng:

- `email-templates/supabase-confirm-signup.html`: template `Confirm signup`.
- `email-templates/supabase-reset-password.html`: template `Reset password`.
- `email-templates/supabase-magic-link.html`: template `Magic Link`, dùng khi sau này bật đăng nhập bằng link email.

Subject gợi ý:

```text
Confirm signup: Xác thực tài khoản MiniStyle
Reset password: Đặt lại mật khẩu MiniStyle
Magic Link: Đăng nhập MiniStyle
```

Các biến `{{ .Email }}` và `{{ .ConfirmationURL }}` là biến template của Supabase Auth. Không đổi tên các biến này.

## Email đơn hàng bằng n8n

File `email-templates/order-confirmation.html` dùng cho n8n hoặc hệ thống gửi mail riêng.

Các placeholder cần thay trước khi gửi:

```text
{{customerName}}
{{orderId}}
{{orderTotal}}
{{phone}}
{{address}}
{{notes}}
{{itemsHtml}}
```

Trong n8n, có thể dùng `Code` node để render `itemsHtml`, sau đó dùng Gmail/SMTP node gửi HTML email.

Ví dụ `itemsHtml`:

```html
Áo thun Basic Cotton - Size M - Đen x 2<br />
Túi canvas Mini - Free size - Kem x 1
```

## Ghi chú cấu hình gửi mail

Supabase mặc định có thể gửi email xác thực/reset password. Nếu muốn email gửi chuyên nghiệp hơn, cấu hình SMTP riêng trong:

```text
Authentication -> SMTP Settings
```

Với email thông báo đơn hàng, nên để n8n gửi qua Gmail hoặc SMTP riêng, vì Supabase Auth email chỉ phục vụ xác thực tài khoản và mật khẩu.
