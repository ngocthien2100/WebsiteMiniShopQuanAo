# MiniStyle n8n workflows

## File fixed

- `ministyle-facebook-chatbot-fixed.json`: workflow Facebook Messenger da duoc don lai de on dinh hon.

## Diem da sua

- Bo Page Access Token hard-code ra khoi workflow.
- Gui Facebook Messenger bang credential `facebookGraphApi` cua n8n.
- Sua route tin nhan:
  - Chao/menu -> gui menu.
  - `1`, `2`, `3`, `4` -> doc Google Sheet va gui danh muc tuong ung.
  - Cau hoi khac -> doc Google Sheet, tao context san pham that, roi dua vao AI Agent.
- Sua prompt AI theo huong CSKH MiniStyle, khong bia san pham/gia/anh/chinh sach.
- Xoa cac node legacy khong con nam trong route chinh de workflow de review hon.

## Viec can lam sau khi import

1. Import `ministyle-facebook-chatbot-fixed.json` vao n8n.
2. Mo cac node HTTP Request gui Facebook va gan lai credential Facebook Graph API neu n8n yeu cau.
3. Mo cac node Google Sheets va gan lai credential Google Sheets neu n8n yeu cau.
4. Kiem tra sheet `Data` co cac cot toi thieu:
   - `STT`
   - `Ten San Pham` hoac `Ten san pham`
   - `Danh muc` hoac `Phan loai`
   - `Gia`
   - `Da ban`
   - `URL anh` hoac `ID Anh` neu muon tra anh
5. Active workflow.
6. Test trong Messenger:
   - `hi`
   - `1`
   - `2`
   - `Áo thun Basic Cotton giá bao nhiêu?`
   - `Tư vấn outfit đi học dưới 500k`

## Huong phat trien tiep

Neu website da dung Supabase lam database chinh, nen thay Google Sheets bang Supabase node/HTTP Request trong n8n. Khi do admin/staff them san pham tren website thi chatbot doc duoc du lieu moi nhat tu cung mot nguon.
