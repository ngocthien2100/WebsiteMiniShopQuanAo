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
- `.env.example`: mẫu biến môi trường cho local và Netlify.

## Cách tạo database

1. Tạo project mới trên Supabase.
2. Vào `SQL Editor`.
3. Copy toàn bộ nội dung trong `supabase/schema.sql`.
4. Chạy script một lần để tạo bảng và seed dữ liệu.

Các bảng chính:

- `profiles`: hồ sơ người dùng, role `admin | staff | customer`, trạng thái tài khoản.
- `products`: sản phẩm quần áo, danh mục, giá, ảnh, size, màu, tags.
- `orders`: đơn hàng.
- `order_items`: chi tiết sản phẩm trong đơn hàng.
- `shop_policies`: chính sách giao hàng, đổi trả, hướng dẫn đặt hàng.

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

## Cấu hình Netlify

Vào `Site configuration` -> `Environment variables` và thêm:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_N8N_CHATBOT_WEBHOOK`

Sau khi thêm biến môi trường, cần redeploy site.

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

Phần hiện tại đã đưa database cloud vào luồng sản phẩm và đơn hàng. Bước tiếp theo nên làm là chuyển đăng nhập/đăng ký sang Supabase Auth để role `admin/staff/customer` thật sự được bảo vệ bằng tài khoản cloud thay vì tài khoản demo trong `localStorage`.
