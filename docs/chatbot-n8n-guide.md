# Ghi chu chatbot n8n cho MiniStyle

Tai lieu nay giu lai phan thiet ke chatbot n8n neu sau nay can mo rong. Phien ban frontend hien tai khong con nhung widget chat truc tiep vao website; website dang dung nut Messenger de chuyen nguoi dung sang Facebook Page chat truc tiep.

## 1. Luong dang dung hien tai

```text
Nguoi dung tren website
-> Bam nut Chat Facebook
-> Mo link Facebook Page hoac m.me
-> Chat truc tiep tren Messenger
```

Frontend chi can bien moi truong:

```env
VITE_FACEBOOK_MESSENGER_URL=https://m.me/your-facebook-page
```

Neu chua cau hinh bien nay, nut chat van hien thi nhung chi mo trang Facebook mac dinh.

## 2. Neu muon dung lai n8n sau nay

n8n van co the dung lam he thong xu ly hoi dap rieng, nhung nen de no o tang workflow/backend thay vi nhung widget truc tiep vao website. API key cua AI phai de trong n8n hoac server rieng, khong dua vao code React.

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

## 3. Du lieu nen cho chatbot truy van

n8n khong nen phu thuoc vao du lieu gui tu frontend. Neu dung chatbot AI, workflow nen tu query Supabase de lay du lieu moi nhat:

- `products`: san pham, danh muc, gia, tags, ton kho.
- `shop_policies`: giao hang, doi tra, cach dat hang.
- `orders`: tra cuu don hang khi co ma don hoac so dien thoai, neu policy bao mat cho phep.

## 4. System prompt goi y cho AI Agent

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

## 5. Bao mat va dao duc AI

- Khong dua API key len GitHub.
- Khong xu ly thanh toan that trong demo.
- Khong yeu cau nguoi dung nhap thong tin nhay cam.
- Chatbot phai noi khong biet neu du lieu san pham/chinh sach khong co.
- Cau tra loi can duoc kiem thu de tranh hallucination.
