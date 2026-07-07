# MiniStyle font guide

MiniStyle dùng một font duy nhất để giao diện đồng bộ hơn trên mọi máy:

- Body/UI/form/button/heading: `"Noto Sans", Arial, "Segoe UI", Roboto, Helvetica, sans-serif`

Dự án self-host font qua `@fontsource`, vì vậy giao diện hiển thị ổn định hơn giữa Windows, macOS, Linux và mobile, kể cả khi máy người dùng không có font tương ứng.

## Cấu hình trong code

```css
--font-body: "Noto Sans", Arial, "Segoe UI", Roboto, Helvetica, sans-serif;
--font-display: "Noto Sans", Arial, "Segoe UI", Roboto, Helvetica, sans-serif;
```

Font được thống nhất trên toàn site, giúp người dùng không thấy sự thay đổi kiểu chữ giữa các trang hoặc giữa các hệ điều hành.

## Lý do chọn

Trên các máy khác nhau, một font đơn lẻ có thể render dấu tiếng Việt không giống nhau. Stack hiện tại ưu tiên font hệ thống có hỗ trợ tiếng Việt tốt, giảm rủi ro chữ bị cắt dấu, đè dòng hoặc đổi dáng quá mạnh khi deploy.
