# MiniStyle - Website bán quần áo

MiniStyle là website bán hàng mini xây bằng Vite + React. Dự án có giao diện cửa hàng, giỏ hàng, đặt hàng mẫu, đăng nhập/đăng ký, phân quyền quản trị viên/nhân viên/khách hàng, widget chatbot n8n trực tiếp và nút Messenger dẫn tới Facebook Page của shop.

## Chạy dự án

Yêu cầu: Node.js 18+.

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## Deploy trên Vercel cho tài khoản khác

Phần này dành cho người pull/fork repo và deploy bằng tài khoản Vercel riêng.

### 1. Chuẩn bị project Supabase

1. Tạo một project mới trên [Supabase](https://supabase.com).
2. Vào `SQL Editor`.
3. Copy toàn bộ nội dung file [supabase/schema.sql](./supabase/schema.sql) và chạy một lần.
4. Vào `Project Settings -> API` để lấy:
   - `Project URL` -> dùng cho `VITE_SUPABASE_URL`
   - `anon public key` -> dùng cho `VITE_SUPABASE_ANON_KEY`

Không đưa `service_role key` vào Vercel hoặc frontend.

### 2. Deploy bằng Vercel

1. Đăng nhập [Vercel](https://vercel.com).
2. Chọn `Add New -> Project`.
3. Import repo GitHub này hoặc repo đã fork.
4. Giữ cấu hình mặc định của Vercel cho Vite:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Trước khi bấm deploy, thêm Environment Variables:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_N8N_CHATBOT_WEBHOOK=https://your-n8n-domain/webhook/your-chat-trigger-id
VITE_FACEBOOK_MESSENGER_URL=https://m.me/your-facebook-page
```

`VITE_N8N_CHATBOT_WEBHOOK` là Production Chat/Webhook URL của n8n. Nếu thiếu biến này, widget chatbot trực tiếp sẽ không hiển thị.

`VITE_FACEBOOK_MESSENGER_URL` có thể là link `m.me` hoặc link Facebook Page. Nếu chưa có Page, có thể tạm để trống; nút Facebook sẽ mở trang Facebook mặc định.

### 3. Cấu hình Supabase Auth sau khi có domain Vercel

Sau khi Vercel deploy xong, copy domain production, ví dụ:

```text
https://ten-project.vercel.app
```

Vào Supabase `Authentication -> URL Configuration` và cấu hình:

```text
Site URL:
https://ten-project.vercel.app

Redirect URLs:
https://ten-project.vercel.app
https://ten-project.vercel.app/?auth=reset-password
http://localhost:5173
http://localhost:5173/?auth=reset-password
```

Nếu đổi domain Vercel hoặc gắn custom domain, cần cập nhật lại các URL này.

### 4. Redeploy sau khi sửa env

Vite chỉ đọc các biến `VITE_*` tại thời điểm build. Vì vậy sau khi thêm hoặc sửa env trên Vercel, cần vào `Deployments -> Redeploy` để site nhận cấu hình mới.

### 5. Kiểm tra sau deploy

1. Mở trang chủ và trang sản phẩm.
2. Đăng ký tài khoản bằng email thật.
3. Kiểm tra email xác thực Supabase.
4. Đăng nhập sau khi xác thực.
5. Thêm sản phẩm vào giỏ và đặt hàng.
6. Vào Supabase `Table Editor` kiểm tra bảng `orders` và `order_items`.
7. Kiểm tra widget chatbot trực tiếp có hiển thị và gửi tin nhắn về n8n không.
8. Kiểm tra nút `Chat Facebook` có mở đúng Facebook Page/Messenger không.

Tài khoản mới luôn mặc định là `customer`. Muốn tạo admin đầu tiên, đăng ký một tài khoản trước, sau đó nâng quyền trong Supabase bằng SQL theo hướng dẫn ở [docs/database-supabase-guide.md](./docs/database-supabase-guide.md).

## Cấu hình chatbot và Messenger

Website hiện có hai widget ở góc màn hình:

- Widget chatbot n8n trực tiếp trên web.
- Nút Messenger mở Facebook Page hoặc link `m.me` trong tab mới.

Tạo file `.env.local` ở thư mục gốc:

```env
VITE_N8N_CHATBOT_WEBHOOK=https://your-n8n-domain/webhook/your-chat-trigger-id
VITE_FACEBOOK_MESSENGER_URL=https://m.me/your-facebook-page
```

Nếu chưa có `VITE_N8N_CHATBOT_WEBHOOK`, widget n8n sẽ không hiển thị. Nếu chưa có `VITE_FACEBOOK_MESSENGER_URL`, nút Facebook vẫn hiển thị nhưng chỉ mở trang Facebook mặc định.

## Cấu hình database Supabase

Dự án có lớp dữ liệu cloud-ready bằng Supabase. Khi chưa cấu hình env, app tự dùng `localStorage` để phục vụ demo. Khi có Supabase, sản phẩm và đơn hàng có thể đọc/ghi qua Postgres.

Tạo `.env.local` theo mẫu:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_N8N_CHATBOT_WEBHOOK=https://your-n8n-domain/webhook/your-chat-trigger-id
VITE_FACEBOOK_MESSENGER_URL=https://m.me/your-facebook-page
```

SQL tạo bảng nằm ở [supabase/schema.sql](./supabase/schema.sql). Hướng dẫn chi tiết: [docs/database-supabase-guide.md](./docs/database-supabase-guide.md).

Đăng ký/đăng nhập hiện dùng Supabase Auth khi có env Supabase. Tài khoản mới mặc định là `customer`; tài khoản admin đầu tiên cần được nâng quyền trong Supabase bằng SQL theo hướng dẫn database.

Supabase Auth cũng xử lý xác thực email, đổi mật khẩu và quên mật khẩu. Cần cấu hình `Authentication -> URL Configuration` trong Supabase để redirect về domain Vercel và `/?auth=reset-password`.

Các mẫu email HTML theo phong cách MiniStyle nằm trong [email-templates](./email-templates) và hướng dẫn sử dụng ở [docs/email-template-guide.md](./docs/email-template-guide.md).

Font chữ được cấu hình theo hướng dễ đọc và phù hợp website thời trang: `Georgia` cho heading/editorial và `Verdana` cho nội dung, form, nút bấm. Xem [docs/font-guide.md](./docs/font-guide.md).

## Cấu trúc chính

```text
src/
  app/            App shell, routing state, cart, main CSS.
  features/       Các màn hình nghiệp vụ theo vai trò và widget chatbot.
  shared/services/ Lớp repository đọc/ghi Supabase, có fallback localStorage.
  shared/supabase/ Cấu hình Supabase client phía frontend.
  shared/data/    Dữ liệu sản phẩm, mock users, mock orders, localStorage helpers.
  styles/         Global CSS, Tailwind entry, theme và fonts.
```

Deploy hiện tại dùng Vercel. File [vercel.json](./vercel.json) cấu hình rewrite để các route client-side của React/Vite không bị 404 khi refresh hoặc mở trực tiếp.

Chi tiết hơn: xem [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## Tài liệu liên quan

- [docs/database-supabase-guide.md](./docs/database-supabase-guide.md)
- [docs/chatbot-n8n-guide.md](./docs/chatbot-n8n-guide.md)
- [docs/email-template-guide.md](./docs/email-template-guide.md)
- [docs/font-guide.md](./docs/font-guide.md)
- [docs/ui-ux-improvement-notes.md](./docs/ui-ux-improvement-notes.md)
- [docs/chatbot-test-cases.md](./docs/chatbot-test-cases.md)
- [docs/prompt-library.md](./docs/prompt-library.md)

## Ghi chú review code

Các file sinh tự động/không còn được app import đã được đưa vào `archive/generated/` để giữ lịch sử nhưng không làm rối source chính trong `src`.
