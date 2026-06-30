# MiniStyle font guide

MiniStyle dùng hướng chữ thời trang nhưng vẫn ưu tiên dễ đọc tiếng Việt:

- Heading/editorial: `"Times New Roman", "Noto Serif", Georgia, serif`
- Body/UI/form/button: `Arial, "Segoe UI", Roboto, Helvetica, sans-serif`

Đây là các system font stack phổ biến, vì vậy dự án không cần Google Fonts và cũng không cần commit file font thương mại vào repository. Cách dùng stack giúp chữ tiếng Việt ổn định hơn khi mở website trên máy khác.

## Cấu hình trong code

```css
--font-body: Arial, "Segoe UI", Roboto, Helvetica, sans-serif;
--font-display: "Times New Roman", "Noto Serif", Georgia, serif;
```

Font serif được dùng cho hero, tiêu đề trang, tiêu đề section và các điểm nhấn editorial. Font sans-serif được dùng cho nội dung dài, menu, nút, bảng, form, chatbot và các nút liên hệ để chữ đều, rõ và ổn định trên nhiều thiết bị.

## Lý do chọn

Trên các máy khác nhau, một font đơn lẻ có thể render dấu tiếng Việt không giống nhau. Stack hiện tại ưu tiên font hệ thống có hỗ trợ tiếng Việt tốt, giảm rủi ro chữ bị cắt dấu, đè dòng hoặc đổi dáng quá mạnh khi deploy.
