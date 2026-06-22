# MiniStyle - Website bán hàng (Mini Shop)

Hướng dẫn nhanh để chạy project và đẩy lên GitHub.

## Chạy project (frontend)

Yêu cầu: Node.js 18+, npm hoặc pnpm.

1. Cài dependencies

```powershell
cd "C:\Users\Administrator\WebsiteMiniShopQuanAo"
npm install
```

2. Tạo file biến môi trường frontend (không commit)

Tạo `.env.local` ở gốc project và thêm:

```env
VITE_N8N_CHATBOT_WEBHOOK=http://localhost:5678/webhook/ministyle-chatbot
```

3. Chạy dev server

```powershell
npm run dev
```

## Đẩy lên GitHub

1. Khởi tạo git (nếu chưa)

```powershell
cd "C:\Users\Administrator\WebsiteMiniShopQuanAo"
git init
git add .gitignore README.md
git commit -m "chore: add .gitignore and README"
git branch -M main
```

2. Tạo repo trên GitHub (tùy chọn)

- Tạo repository trên github.com và lấy URL, rồi:

```powershell
git remote add origin https://github.com/USER/REPO.git
git push -u origin main
```

- Hoặc dùng GitHub CLI `gh`:

```powershell
gh repo create USER/REPO --public --source=. --remote=origin --push
```

3. Đừng commit file `.env.local` hoặc API keys.

## Nội dung khác
- Docs: `docs/chatbot-n8n-guide.md`
- Source: `src/`

Nếu muốn, mình có thể: soạn sẵn nội dung `DESCRIPTION.md`, thêm badge CI, hoặc giúp tạo repo & push trực tiếp (nếu bạn đã đăng nhập `gh` CLI trên máy)." 
## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.
  
