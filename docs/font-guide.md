# MiniStyle font guide

MiniStyle dùng hướng chữ thời trang nhưng vẫn ưu tiên dễ đọc tiếng Việt:

- Heading/editorial: `Georgia`
- Body/UI/form/button: `Verdana`

Hai font này là system font phổ biến, vì vậy dự án không cần Google Fonts và cũng không cần commit file font thương mại vào repository.

## Cấu hình trong code

```css
--font-body: Verdana, Geneva, Tahoma, sans-serif;
--font-display: Georgia, "Times New Roman", serif;
```

`Georgia` được dùng cho hero, tiêu đề trang, tiêu đề section và các điểm nhấn editorial. `Verdana` được dùng cho nội dung dài, menu, nút, bảng, form và chatbot để chữ đều, rõ và ổn định trên nhiều thiết bị.

## Lý do chọn

`Georgia` có cảm giác editorial/fashion hơn so với sans-serif thuần, còn `Verdana` có chiều rộng chữ thoáng, phù hợp tiếng Việt và dễ đọc ở kích thước nhỏ trong form, bảng dữ liệu, dashboard.
