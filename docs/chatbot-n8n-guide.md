# Huong dan tich hop Chatbot n8n cho MiniStyle

Tai lieu nay dung de trinh bay minh chung cho do an cuoi ky: website ban hang mini tich hop chatbot tu van san pham bang package `@n8n/chat`.

## 1. Luong xu ly

```text
Nguoi dung tren website
-> @n8n/chat widget
-> n8n Chat Trigger URL
-> AI Agent / Chain trong n8n
-> Tra loi ve widget chat
```

Frontend chi hien thi widget va truyen cau hoi sang n8n. API key cua AI phai de trong n8n, khong dua vao code React.

## 2. Yeu cau workflow n8n

Workflow nen co cau truc toi thieu:

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

## 3. Bien moi truong frontend

Tao file `.env.local` o thu muc goc project:

```env
VITE_N8N_CHATBOT_WEBHOOK=https://your-n8n-domain/webhook/your-chat-trigger-id
```

Neu chua cau hinh bien nay, widget chat se khong hien thi.

## 4. Du lieu gui kem sang n8n

Component `N8nChatWidget` truyen du lieu san pham va chinh sach qua `metadata` cua package `@n8n/chat`:

```json
{
  "source": "ministyle-website",
  "products": [],
  "policy": {}
}
```

Trong workflow n8n, hay dung metadata nay lam context cho AI Agent de chatbot chi tu van dua tren san pham va chinh sach cua shop.

## 5. System prompt goi y cho AI Agent

```text
Ban la chatbot tu van san pham cua shop quan ao MiniStyle.
Chi duoc tu van dua tren metadata.products va metadata.policy ma Chat Trigger nhan duoc.
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
