# Huong dan chatbot n8n va Messenger cho MiniStyle

Website hien co hai widget chat:

- Widget chatbot n8n truc tiep tren web.
- Nut Facebook Messenger de chuyen nguoi dung sang Facebook Page hoac link `m.me`.

## 1. Luong chatbot n8n

```text
Nguoi dung tren website
-> Widget n8n chat
-> n8n Chat Trigger URL
-> AI Agent / Chain trong n8n
-> Tra loi ve widget tren website
```

Frontend can bien moi truong:

```env
VITE_N8N_CHATBOT_WEBHOOK=https://your-n8n-domain/webhook/your-chat-trigger-id
```

Neu chua cau hinh bien nay, widget n8n se khong hien thi.

## 2. Luong Messenger

```text
Nguoi dung tren website
-> Bam nut Chat Facebook
-> Mo link Facebook Page hoac m.me
-> Chat truc tiep tren Messenger
```

Frontend can bien moi truong:

```env
VITE_FACEBOOK_MESSENGER_URL=https://m.me/your-facebook-page
```

Neu chua cau hinh bien nay, nut Facebook van hien thi nhung chi mo trang Facebook mac dinh.

## 3. Yeu cau workflow n8n

API key cua AI phai de trong n8n hoac server rieng, khong dua vao code React.

Workflow n8n co the co cau truc toi thieu:

```text
Chat Trigger
-> AI Agent hoac Chain
-> Chat response
```

Trong Chat Trigger:

- Bat public/embedded chat khi demo.
- Them domain website vao Allowed Origin (CORS), vi du `http://localhost:5173`.
- Dung Production Chat URL, khong dung test URL.
- Workflow phai Active.

## 4. Du lieu nen cho chatbot truy van

n8n khong nen phu thuoc vao du lieu gui tu frontend. Neu dung chatbot AI, workflow nen tu query Supabase de lay du lieu moi nhat:

- `products`: san pham, danh muc, gia, tags, ton kho.
- `shop_policies`: giao hang, doi tra, cach dat hang.
- `orders`: tra cuu don hang khi co ma don hoac so dien thoai, neu policy bao mat cho phep.

## 5. System prompt goi y cho AI Agent

```text
Ban la chatbot tu van san pham cua shop quan ao MiniStyle.
Chi duoc tu van dua tren du lieu products va shop_policies lay tu Supabase.
Khong bia gia, khong bia chinh sach, khong tu van ngoai danh sach san pham.
Neu nguoi dung thieu ngan sach, phong cach, gioi tinh, size hoac muc dich su dung, hay hoi lai toi da 1 cau ngan gon.
Neu co du lieu phu hop, tra loi bang tieng Viet tu nhien, ngan gon, gom:
- San pham goi y
- Gia
- Ly do phu hop
- Cach dat hang
Neu khong co san pham phu hop, noi ro chua co san pham trong du lieu hien tai.
```

## 6. Bao mat va dao duc AI

- Khong dua API key len GitHub.
- Khong xu ly thanh toan that trong demo.
- Khong yeu cau nguoi dung nhap thong tin nhay cam.
- Chatbot phai noi khong biet neu du lieu san pham/chinh sach khong co.
- Cau tra loi can duoc kiem thu de tranh hallucination.
