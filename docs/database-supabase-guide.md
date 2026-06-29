# Hướng dẫn database Supabase cho MiniStyle

## Mục tiêu

Dự án đang có hai chế độ dữ liệu:

- `Local demo`: không cấu hình Supabase, app dùng `localStorage` để vẫn demo được trên máy cá nhân.
- `Supabase cloud`: có biến môi trường Supabase, app đọc sản phẩm và ghi đơn hàng lên Postgres để deploy thật hơn.

Supabase được chọn vì một project có sẵn Postgres database, Auth, Storage, REST API và Row Level Security. Frontend chỉ được dùng `anon key`; `service_role key` chỉ dùng trong n8n hoặc server riêng.

## File đã thêm

- `supabase/schema.sql`: tạo bảng, policy RLS và seed sản phẩm/chính sách mẫu.
- `src/shared/supabase/client.ts`: tạo Supabase client từ biến môi trường.
- `src/shared/services/shopRepository.ts`: lớp đọc/ghi dữ liệu, có fallback localStorage.
- `.env.example`: mẫu biến môi trường cho local và Vercel.

## Cách tạo database

1. Tạo project mới trên Supabase.
2. Vào `SQL Editor`.
3. Copy toàn bộ nội dung trong `supabase/schema.sql`.
4. Chạy script một lần để tạo bảng và seed dữ liệu.

Các bảng chính:

- `profiles`: hồ sơ người dùng, họ tên, email, số điện thoại, ngày sinh, giới tính, địa chỉ giao hàng mặc định, role `admin | staff | customer`, trạng thái tài khoản.
- `customer_addresses`: danh sách địa chỉ giao hàng của từng khách hàng.
- `products`: sản phẩm quần áo, danh mục, giá, ảnh, size, màu, tags.
- `orders`: đơn hàng.
- `order_items`: chi tiết sản phẩm trong đơn hàng.
- `shop_policies`: chính sách giao hàng, đổi trả, hướng dẫn đặt hàng.

## Tài khoản, mật khẩu và phân quyền

Không tạo bảng riêng để lưu mật khẩu. Với hệ thống deploy thật, mật khẩu phải để Supabase Auth quản lý trong schema nội bộ `auth`, bao gồm đăng ký, đăng nhập, hash mật khẩu, đổi mật khẩu và xác thực email.

Thiết kế đúng trong dự án:

- `auth.users`: bảng nội bộ của Supabase Auth, lưu tài khoản đăng nhập và mật khẩu đã hash. Không truy cập trực tiếp từ frontend.
- `public.profiles`: bảng hồ sơ mở rộng, liên kết với `auth.users.id`, lưu họ tên, số điện thoại, ngày sinh, giới tính, địa chỉ mặc định, role và trạng thái.
- `public.customer_addresses`: lưu nhiều địa chỉ giao hàng nếu khách có nhiều nơi nhận hàng.

Khi người dùng đăng ký qua Supabase Auth, trigger `on_auth_user_created` sẽ tự tạo một dòng trong `profiles` với role mặc định là `customer`. Admin/staff không được tự đăng ký bằng metadata; quyền cao hơn phải được admin cập nhật sau.

Trigger `before_profile_update` chặn người dùng thường tự đổi `role` hoặc `status`. Người dùng chỉ nên tự cập nhật các trường hồ sơ như họ tên, số điện thoại, ngày sinh, giới tính và địa chỉ.

## Tạo tài khoản admin đầu tiên

1. Đăng ký tài khoản trên website bằng email thật của bạn.
2. Vào Supabase `Table Editor` -> `profiles` để kiểm tra profile đã được tạo.
3. Mở `SQL Editor` và chạy:

```sql
update public.profiles
set role = 'admin'
where email = 'email-cua-ban@example.com';
```

Sau đó đăng xuất và đăng nhập lại trên website. Tài khoản đó sẽ vào được trang quản trị. Các tài khoản đăng ký mới vẫn mặc định là `customer`; quản trị viên có thể đổi role sang `staff` hoặc khóa tài khoản trong màn quản trị.

Nếu Supabase đang bật xác thực email, người dùng phải bấm link xác thực trong email trước khi đăng nhập. Nếu muốn demo nhanh trên lớp, có thể vào `Authentication` -> `Providers` -> `Email` và tắt yêu cầu confirm email.

## Cấu hình xác thực email và quên mật khẩu

Trong Supabase Dashboard, vào `Authentication` -> `URL Configuration`.

Thiết lập:

```text
Site URL: https://websiteminishopquanao.vercel.app
```

Thêm `Redirect URLs`:

```text
https://websiteminishopquanao.vercel.app
https://websiteminishopquanao.vercel.app/?auth=reset-password
http://localhost:5173
http://localhost:5173/?auth=reset-password
```

Luồng đang dùng trong code:

- Đăng ký: `supabase.auth.signUp()` gửi email xác thực nếu Supabase bật confirm email.
- Đăng nhập: `supabase.auth.signInWithPassword()`.
- Quên mật khẩu: `supabase.auth.resetPasswordForEmail()` gửi link về `/?auth=reset-password`.
- Đặt lại/đổi mật khẩu: `supabase.auth.updateUser({ password })`.

Email xác thực và email quên mật khẩu sẽ được Supabase gửi tới địa chỉ Gmail/email mà người dùng nhập. Nếu muốn email gửi bằng domain riêng hoặc Gmail SMTP riêng, cấu hình thêm ở `Authentication` -> `SMTP Settings`.

## Cấu hình local

Tạo file `.env.local` ở thư mục gốc:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_N8N_CHATBOT_WEBHOOK=https://your-n8n-domain/webhook/your-chat-trigger-id
```

Sau đó chạy lại dev server:

```bash
npm run dev
```

## Cấu hình Vercel

Vào project Vercel -> `Settings` -> `Environment Variables` và thêm:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_N8N_CHATBOT_WEBHOOK`

Sau khi thêm hoặc sửa biến môi trường, cần redeploy site. Dự án có [vercel.json](../vercel.json) để rewrite mọi route client-side về `index.html`, giúp các luồng như quên mật khẩu hoặc mở trực tiếp URL không bị 404.

## Kết nối n8n với database

Chatbot không nên phụ thuộc vào dữ liệu gửi từ frontend. Workflow n8n nên tự query Supabase:

1. Trong n8n, tạo credential Supabase.
2. Dùng `Supabase` node hoặc `HTTP Request` node gọi Supabase REST API.
3. Cho chatbot truy vấn các bảng cần thiết:
   - `products`: tư vấn sản phẩm, lọc theo danh mục/giá/tags.
   - `shop_policies`: trả lời giao hàng, đổi size, cách đặt hàng.
   - `orders`: tra cứu đơn hàng khi có số điện thoại hoặc mã đơn.
4. Nếu cần đọc dữ liệu nhạy cảm như `orders`, dùng key bảo mật trong n8n, không đưa key đó vào React.

## Giai đoạn tiếp theo

Phần hiện tại đã đưa database cloud vào luồng sản phẩm, đơn hàng, đăng ký, đăng nhập và phân quyền hồ sơ. Quick Login vẫn là tài khoản demo local để hỗ trợ chấm điểm nhanh khi chưa tạo tài khoản Supabase mẫu.
