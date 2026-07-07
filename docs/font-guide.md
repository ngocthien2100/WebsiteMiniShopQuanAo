# MiniStyle font guide

MiniStyle dùng một font body và một font display để vừa đồng bộ vừa có điểm nhấn thời trang:

- Body/UI/form/button: `"Noto Sans", Arial, "Segoe UI", Roboto, Helvetica, sans-serif`
- Heading/editorial: `"Playfair Display", Georgia, "Times New Roman", serif`

Dự án self-host font qua `@fontsource`, vì vậy giao diện hiển thị ổn định hơn giữa Windows, macOS, Linux và mobile, kể cả khi máy người dùng không có font tương ứng.

## Cấu hình trong code

```css
--font-body: "Noto Sans", Arial, "Segoe UI", Roboto, Helvetica, sans-serif;
--font-display: "Playfair Display", Georgia, "Times New Roman", serif;
```

Body và UI vẫn thống nhất toàn site, còn font heading được dùng có chủ đích để tạo cảm giác thời trang hơn nhưng vẫn tự host, nên hiển thị ổn định giữa các hệ điều hành.

## Lý do chọn

Trên các máy khác nhau, một font đơn lẻ có thể render dấu tiếng Việt không giống nhau. Stack hiện tại ưu tiên font hệ thống có hỗ trợ tiếng Việt tốt, giảm rủi ro chữ bị cắt dấu, đè dòng hoặc đổi dáng quá mạnh khi deploy.
