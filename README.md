# MiniStyle - Website bán quần áo

MiniStyle là website bán hàng mini xây bằng Vite + React. Dự án có giao diện cửa hàng, giỏ hàng, đặt hàng mẫu, đăng nhập/đăng ký, phân quyền Admin/Staff/Customer và chatbot tư vấn sản phẩm qua n8n webhook.

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

Tạo file `.env.local` ở thư mục gốc nếu muốn kết nối webhook thật:

```env
VITE_N8N_CHATBOT_WEBHOOK=https://your-n8n-domain/webhook/ministyle-chatbot
```

Nếu không có biến môi trường này, chatbot sẽ dùng câu trả lời fallback nội bộ để demo.

## Cấu trúc chính

```text
src/
  app/            App shell, routing state, cart, chatbot UI, main CSS.
  features/       Các màn hình nghiệp vụ theo vai trò: auth, admin, staff, customer.
  shared/data/    Dữ liệu sản phẩm, mock users, mock orders, localStorage helpers.
  styles/         Global CSS, Tailwind entry, theme và fonts.
```

Chi tiết hơn: xem [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## Tài liệu liên quan

- [docs/chatbot-n8n-guide.md](./docs/chatbot-n8n-guide.md)
- [docs/chatbot-test-cases.md](./docs/chatbot-test-cases.md)
- [docs/prompt-library.md](./docs/prompt-library.md)

## Ghi chú review code

Các file sinh tự động/không còn được app import đã được đưa vào `archive/generated/` để giữ lịch sử nhưng không làm rối source chính trong `src`.
