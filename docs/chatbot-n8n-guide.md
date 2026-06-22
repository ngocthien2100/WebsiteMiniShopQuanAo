# Huong dan tich hop Chatbot N8N cho MiniStyle

Tai lieu nay dung de trinh bay minh chung cho do an cuoi ky: website ban hang mini tich hop chatbot tu van san pham.

## 1. Luong xu ly

```text
Nguoi dung tren website
-> Chatbot widget React
-> N8N Webhook
-> Node xu ly prompt + du lieu san pham
-> OpenAI/Gemini hoac AI provider
-> Tra ve JSON { "answer": "..." }
-> Website hien thi cau tra loi
```

Frontend chi goi webhook N8N. API key cua AI phai de trong N8N, khong dua vao code React.

## 2. Bien moi truong frontend

Tao file `.env.local` o thu muc goc project:

```env
VITE_N8N_CHATBOT_WEBHOOK=https://your-n8n-domain/webhook/ministyle-chatbot
```

Neu chua cau hinh bien nay, website se dung che do tra loi fallback noi bo de demo nhanh.

## 3. Payload gui tu website sang N8N

```json
{
  "question": "Toi co 200.000d nen mua gi?",
  "products": [
    {
      "id": "ao-thun-basic-cotton",
      "name": "Ao thun Basic Cotton",
      "price": 189000,
      "categoryLabel": "Ao",
      "shortDescription": "Ao thun cotton mem, de phoi do..."
    }
  ],
  "policy": {
    "delivery": "Giao hang toan quoc tu 2-4 ngay lam viec...",
    "returnPolicy": "Doi size trong 7 ngay...",
    "orderGuide": "Chon san pham, them vao gio hang..."
  },
  "instruction": "Ban la nhan vien tu van ban quan ao MiniStyle..."
}
```

## 4. System prompt goi y cho N8N

```text
Ban la chatbot tu van san pham cua shop quan ao MiniStyle.
Chi duoc tu van dua tren du lieu products va policy ma webhook nhan duoc.
Khong bia gia, khong bia chinh sach, khong tu van ngoai danh sach san pham.
Neu nguoi dung thieu ngan sach, phong cach, gioi tinh, size hoac muc dich su dung, hay hoi lai toi da 1 cau ngan gon.
Neu co du lieu phu hop, tra loi bang tieng Viet tu nhien, ngan gon, gom:
- San pham goi y
- Gia
- Ly do phu hop
- Cach dat hang
Neu khong co san pham phu hop, noi ro chua co san pham trong du lieu hien tai.
```

## 5. Output mong muon

N8N nen tra ve JSON:

```json
{
  "answer": "Voi ngan sach 200.000d, ban co the chon Ao thun Basic Cotton gia 189.000d..."
}
```

## 6. Bao mat va dao duc AI

- Khong dua API key len GitHub.
- Khong xu ly thanh toan that trong demo.
- Khong yeu cau nguoi dung nhap thong tin nhay cam.
- Chatbot phai noi khong biet neu du lieu san pham/chinh sach khong co.
- Cau tra loi can duoc kiem thu de tranh hallucination.
