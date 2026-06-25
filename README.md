# MiniStyle - Website bán quần áo

MiniStyle là website bán hàng mini xây bằng Vite + React. Dự án có giao diện cửa hàng, giỏ hàng, đặt hàng mẫu, đăng nhập/đăng ký, phân quyền Admin/Staff/Customer và chatbot tư vấn sản phẩm bằng package `@n8n/chat`.

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

## Cấu hình chatbot n8n

Chatbot hiện dùng package chính thức `@n8n/chat`, vì vậy workflow n8n nên dùng **Chat Trigger** node và bật public/embedded chat.

Tạo file `.env.local` ở thư mục gốc:

```env
VITE_N8N_CHATBOT_WEBHOOK=https://your-n8n-domain/webhook/your-chat-trigger-id
```

Nếu không có biến môi trường này, widget chat sẽ không hiển thị.

## Cấu hình database Supabase

Dự án có lớp dữ liệu cloud-ready bằng Supabase. Khi chưa cấu hình env, app tự dùng `localStorage` để phục vụ demo. Khi có Supabase, sản phẩm và đơn hàng có thể đọc/ghi qua Postgres.

Tạo `.env.local` theo mẫu:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_N8N_CHATBOT_WEBHOOK=https://your-n8n-domain/webhook/your-chat-trigger-id
```

SQL tạo bảng nằm ở [supabase/schema.sql](./supabase/schema.sql). Hướng dẫn chi tiết: [docs/database-supabase-guide.md](./docs/database-supabase-guide.md).

Đăng ký/đăng nhập hiện dùng Supabase Auth khi có env Supabase. Tài khoản mới mặc định là `customer`; tài khoản admin đầu tiên cần được nâng quyền trong Supabase bằng SQL theo hướng dẫn database.

Supabase Auth cũng xử lý xác thực email, đổi mật khẩu và quên mật khẩu. Cần cấu hình `Authentication -> URL Configuration` trong Supabase để redirect về domain Netlify và `/?auth=reset-password`.

Các mẫu email HTML theo phong cách MiniStyle nằm trong [email-templates](./email-templates) và hướng dẫn sử dụng ở [docs/email-template-guide.md](./docs/email-template-guide.md).

Font chữ được cấu hình theo hướng fashion editorial: `Editorial New` cho heading và `General Sans` cho UI/body. Xem [docs/font-guide.md](./docs/font-guide.md).

## Cấu trúc chính

```text
src/
  app/            App shell, routing state, cart, main CSS.
  features/       Các màn hình nghiệp vụ theo vai trò và chatbot package wrapper.
  shared/services/ Lớp repository đọc/ghi Supabase, có fallback localStorage.
  shared/supabase/ Cấu hình Supabase client phía frontend.
  shared/data/    Dữ liệu sản phẩm, mock users, mock orders, localStorage helpers.
  styles/         Global CSS, Tailwind entry, theme và fonts.
```

Chi tiết hơn: xem [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## Tài liệu liên quan

- [docs/chatbot-n8n-guide.md](./docs/chatbot-n8n-guide.md)
- [docs/database-supabase-guide.md](./docs/database-supabase-guide.md)
- [docs/email-template-guide.md](./docs/email-template-guide.md)
- [docs/font-guide.md](./docs/font-guide.md)
- [docs/chatbot-test-cases.md](./docs/chatbot-test-cases.md)
- [docs/prompt-library.md](./docs/prompt-library.md)

## Ghi chú review code

Các file sinh tự động/không còn được app import đã được đưa vào `archive/generated/` để giữ lịch sử nhưng không làm rối source chính trong `src`.
