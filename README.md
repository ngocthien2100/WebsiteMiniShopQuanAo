# MiniStyle - Website bán quần áo

MiniStyle là website bán hàng mini xây bằng Vite + React. Dự án có giao diện cửa hàng, giỏ hàng, đặt hàng mẫu, đăng nhập/đăng ký, phân quyền quản trị viên/nhân viên/khách hàng và nút liên hệ Messenger dẫn tới Facebook Page của shop.

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

## Cấu hình Messenger

Website hiện dùng nút Messenger cố định ở góc màn hình. Khi bấm vào, người dùng được chuyển sang Facebook Page hoặc link `m.me` để chat trực tiếp.

Tạo file `.env.local` ở thư mục gốc:

```env
VITE_FACEBOOK_MESSENGER_URL=https://m.me/your-facebook-page
```

Nếu chưa có biến môi trường này, nút chat vẫn hiển thị nhưng chỉ mở trang Facebook mặc định.

## Cấu hình database Supabase

Dự án có lớp dữ liệu cloud-ready bằng Supabase. Khi chưa cấu hình env, app tự dùng `localStorage` để phục vụ demo. Khi có Supabase, sản phẩm và đơn hàng có thể đọc/ghi qua Postgres.

Tạo `.env.local` theo mẫu:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
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
  features/       Các màn hình nghiệp vụ theo vai trò.
  shared/services/ Lớp repository đọc/ghi Supabase, có fallback localStorage.
  shared/supabase/ Cấu hình Supabase client phía frontend.
  shared/data/    Dữ liệu sản phẩm, mock users, mock orders, localStorage helpers.
  styles/         Global CSS, Tailwind entry, theme và fonts.
```

Deploy hiện tại dùng Vercel. File [vercel.json](./vercel.json) cấu hình rewrite để các route client-side của React/Vite không bị 404 khi refresh hoặc mở trực tiếp.

Chi tiết hơn: xem [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## Tài liệu liên quan

- [docs/database-supabase-guide.md](./docs/database-supabase-guide.md)
- [docs/email-template-guide.md](./docs/email-template-guide.md)
- [docs/font-guide.md](./docs/font-guide.md)
- [docs/ui-ux-improvement-notes.md](./docs/ui-ux-improvement-notes.md)
- [docs/chatbot-test-cases.md](./docs/chatbot-test-cases.md)
- [docs/prompt-library.md](./docs/prompt-library.md)

## Ghi chú review code

Các file sinh tự động/không còn được app import đã được đưa vào `archive/generated/` để giữ lịch sử nhưng không làm rối source chính trong `src`.
