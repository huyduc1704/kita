# HƯỚNG DẪN QUẢN TRỊ WEBSITE GAMMA HOME
> **Hệ quản trị nội dung:** Strapi CMS v5  
> **Áp dụng cho website:** Gamma Home (Thiết kế & Thi công trọn gói)  
> **Tác giả:** Đội ngũ phát triển kỹ thuật  

---

Chào mừng ban quản trị của **Gamma Home**! Tài liệu này sẽ hướng dẫn bạn chi tiết từ A-Z cách tự quản lý, cập nhật thông tin và đăng tải nội dung (dự án, bài viết, banner) lên website một cách dễ dàng nhất mà không cần biết viết code.

---

## 📌 MỤC LỤC
1. [Đăng Nhập Hệ Thống](#1-đăng-nhập-hệ-thống)
2. [Quản Lý Thông Tin Chung (System Setting)](#2-quản-lý-thông-tin-chung-system-setting)
3. [Quản Lý Banner Trượt Trang Chủ (Hero Slide)](#3-quản-lý-banner-trượt-trang-chủ-hero-slide)
4. [Quản Lý Danh Mục Phân Loại (Category)](#4-quản-lý-danh-mục-phân-loại-category)
5. [Đăng Tải Công Trình, Dự Án & Bài Viết (Post)](#5-đăng-tải-công-trình-dự-án--bài-viết-post)
6. [Quản Lý Khách Hàng Đăng Ký Tư Vấn (Consultation Lead)](#6-quản-lý-khách-hàng-đăng-ký-tư-vấn-consultation-lead)
7. [Các Quy Tắc Vàng Khi Cập Nhật Nội Dung](#7-các-quy-tắc-vàng-khi-cập-nhật-nội-dung)

---

## 🔑 1. ĐĂNG NHẬP HỆ THỐNG

### Bước 1: Truy cập trang quản trị
Mở trình duyệt web và nhập đường dẫn quản trị được cung cấp:
* **Đường dẫn quản trị:** `https://[TÊN-MIỀN-RAILWAY-CỦA-BẠN]/admin` (Ví dụ: `https://gamma-be-production.up.railway.app/admin`)

### Bước 2: Đăng nhập tài khoản
1. Nhập **Email** và **Mật khẩu** tài khoản quản trị của bạn.
2. Bấm nút **Login**.
3. Bạn sẽ được chuyển hướng trực tiếp đến trang **Content Manager (Trình quản lý nội dung)**.

---

## ⚙️ 2. QUẢN LÝ THÔNG TIN CHUNG (System Setting)
> **LƯU Ý:** Mục này chỉ có **duy nhất 1 bản ghi** dùng chung cho toàn bộ hệ thống. Các thay đổi tại đây sẽ cập nhật ngay lập tức lên Header, Footer và các nút liên hệ nổi của website.

### Các bước chỉnh sửa:
1. Nhìn sang cột menu bên trái, tìm mục **`SINGLE TYPES`** -> Chọn **`System Setting`**.
2. Chỉnh sửa các thông tin mong muốn:
   * **`companyName`**: Tên hiển thị của công ty (Ví dụ: `CÔNG TY CỔ PHẦN KIẾN TRÚC & XÂY DỰNG GAMMA HOME`).
   * **`hotline`**: Số điện thoại liên hệ (Định dạng hiển thị đẹp: `0827.972.555`).
   * **`email`**: Email nhận phản hồi (Ví dụ: `nhadepgamma@gmail.com`).
   * **`addressNorth` / `addressSouth`**: Địa chỉ văn phòng Miền Bắc và Miền Nam.
   * **`zaloUrl`**: Link Zalo chat (Ví dụ: `https://zalo.me/0827972555`).
   * **`facebookPage`**: Đường link dẫn đến trang Facebook cá nhân hoặc Fanpage của bạn.
   * **`messengerUrl`**: Link chát Messenger (Ví dụ: `https://m.me/100076260787549`).
   * **`tiktokUrl` / `youtubeUrl`**: Các trang mạng xã hội đi kèm.
3. Cuộn lên trên cùng bên phải và bấm nút **`Save`** (Lưu) để hoàn tất.

---

## 🖼️ 3. QUẢN LÝ BANNER TRƯỢT TRANG CHỦ (Hero Slide)
> **MẸO:** Banner là bộ mặt của website. Hãy thiết kế hình ảnh thật đẹp mắt bằng Canva hoặc Photoshop trước khi tải lên!

### Cách thêm một Banner trượt mới:
1. Tại menu bên trái, mục **`COLLECTION TYPES`** -> Chọn **`Hero Slide`**.
2. Bấm nút **`+ Create new entry`** ở góc trên bên phải.
3. Nhập các trường thông tin:
   * **`title`** *(Bắt buộc)*: Nhập tiêu đề mô tả bức ảnh (Ví dụ: `Banner dự án biệt thự tân cổ điển`). *Trường này phục vụ cho việc tối ưu tìm kiếm hình ảnh trên Google (SEO).*
   * **`image`** *(Bắt buộc)*: Click vào ô tải lên để chọn ảnh từ máy tính hoặc kéo thả ảnh trực tiếp vào.
   * **`orderNumber`**: Số thứ tự hiển thị của slide (Nhập `1` để hiển thị đầu tiên, `2` để hiển thị tiếp theo...).
   * *Mẹo:* Các ô như `subtitle`, `highlight`, `ctaText`, `ctaLink` là các tính năng dự phòng nâng cao, bạn có thể bỏ trống hoàn toàn.
4. Bấm **`Save`** (Lưu nháp) -> Bấm tiếp nút **`Publish`** (Xuất bản) ở góc trên bên phải để banner chính thức chạy ngoài trang chủ.

---

## 🏷️ 4. QUẢN LÝ DANH MỤC PHÂN LOẠI (Category)
> **QUAN TRỌNG:** Danh mục phân loại giúp hệ thống tự động gom nhóm bài viết/dự án về đúng trang mong muốn (Nhà phố, Biệt thự, Tin tức, Phong thủy...).

### Các danh mục hệ thống mặc định (Bắt buộc giữ nguyên `slug`):
Để các công trình hiển thị đúng trang con, khi tạo Danh mục mới, bạn phải đặt tên `slug` chính xác như sau:
* **`nha-pho`** -> Chuyên trang Dự án Thiết kế Nhà Phố
* **`biet-thu`** -> Chuyên trang Dự án Thiết kế Biệt Thự
* **`nha-vuon`** -> Chuyên trang Dự án Nhà Vườn
* **`noi-that`** -> Chuyên trang Dự án Thiết kế Nội Thất
* **`dich-vu`** -> Các bài viết về dịch vụ (Thi công trọn gói, hoàn thiện...)
* **`tin-tuc-noi-bo`** -> Trang Tin tức của Gamma Home
* **`kien-thuc-phong-thuy`** -> Trang Chia sẻ kiến thức xây dựng/phong thủy

### Cách tạo Danh mục mới:
1. Chọn **`Category`** bên menu trái -> Bấm **`+ Create new entry`**.
2. Nhập **`name`** (Ví dụ: `Nhà Phố`) và **`slug`** tương ứng (Ví dụ: `nha-pho`).
3. Bấm **`Save`** -> **`Publish`**.

---

## ✍️ 5. ĐĂNG TẢI CÔNG TRÌNH, DỰ ÁN & BÀI VIẾT (Post)
> Đây là tính năng bạn sẽ sử dụng thường xuyên nhất để biến website thành một catalog trực tuyến đẳng cấp.

### Quy trình đăng dự án công trình chi tiết (Nhà Phố, Biệt Thự, Nội Thế):
1. Chọn **`Post`** ở menu trái -> Bấm **`+ Create new entry`**.
2. **Nhập nội dung cơ bản:**
   * **`title`**: Tên công trình/dự án (Ví dụ: `Thiết kế biệt thự tân cổ điển 3 tầng tại Hà Đông - Anh Huy`).
   * **`slug`**: Đường link bài viết viết thường không dấu ngăn cách bởi gạch ngang (Ví dụ: `thiet-ke-biet-thu-tan-co-dien-ha-dong-anh-huy`).
   * **`thumbnail`**: Tải lên ảnh đại diện chất lượng cao (hiển thị ở trang danh sách dự án).
   * **`excerpt`**: Viết mô tả tóm tắt ngắn (1-2 câu) giới thiệu về công trình này.
   * **`content`**: Trình soạn thảo văn bản chi tiết. Bạn có thể viết giới thiệu, chèn hình ảnh thực tế bên trong bài viết để khách hàng xem.
3. **Liên kết danh mục phân loại (CỰC KỲ QUAN TRỌNG):**
   * Ở cột bên phải màn hình soạn thảo, tìm ô **`category`**.
   * Nhấp chọn danh mục mong muốn (Ví dụ: Chọn **`biet-thu`** để dự án này tự động xuất hiện trong trang "DỰ ÁN BIỆT THỰ" ngoài website).
4. **Nhập thông tin thông số kỹ thuật công trình:**
   * **`client`**: Tên chủ đầu tư (Ví dụ: `Anh Huy`).
   * **`location`**: Địa điểm xây dựng (Ví dụ: `Hà Đông, Hà Nội`).
   * **`scale`**: Quy mô công trình (Ví dụ: `3 tầng, 1 mái nhật`).
   * **`year`**: Năm thực hiện (Ví dụ: `2026`).
   * **`area`**: Diện tích sàn xây dựng (Ví dụ: `150m2 / sàn`).
5. **Tạo bộ sưu tập ảnh công trình (Gallery trượt ảnh):**
   * Tại ô **`gallery`**, bạn được phép chọn và tải lên **nhiều ảnh cùng lúc**.
   * Những hình ảnh này sẽ biến thành một bộ sưu tập ảnh trượt trình chiếu cực kỳ sang trọng ở đầu bài viết chi tiết để khách hàng lướt xem toàn cảnh căn nhà.
6. **Hoàn tất đăng bài:** Bấm **`Save`** -> Bấm **`Publish`**.

---

## 📞 6. QUẢN LÝ KHÁCH HÀNG ĐĂNG KÝ TƯ VẤN (Consultation Lead)
> **MẸO:** Đây là nơi lưu trữ danh sách khách hàng tự động khi họ điền số điện thoại đăng ký tư vấn trên website. Hãy kiểm tra mục này hàng ngày để không bỏ lỡ khách hàng tiềm năng!

### Cách quản lý và chăm sóc khách hàng:
1. Tại menu trái, chọn mục **`Consultation Lead`**.
2. Bạn sẽ thấy danh sách khách hàng xếp theo thứ tự mới nhất ở trên cùng.
3. Nhấp chọn vào từng dòng để xem thông tin chi tiết:
   * **Họ và tên khách hàng**
   * **Số điện thoại**
   * **Nhu cầu thiết kế** (Ví dụ: Thiết kế biệt thự, Xây nhà trọn gói...)
   * **Diện tích đất & số tầng muốn xây**
   * **Tỉnh thành** sinh sống
   * **Lời nhắn/yêu cầu chi tiết**
4. Gọi điện thoại tư vấn ngay cho khách hàng! Bạn có thể lưu trữ ghi chú hoặc xóa bớt các khách hàng đã chăm sóc xong tại đây.

---

## 🏆 7. CÁC QUY TẮC VÀNG KHI CẬP NHẬT NỘI DUNG

Để website luôn hoạt động nhanh, mượt mà và hiển thị đẹp mắt nhất trên mọi thiết bị (máy tính, điện thoại, máy tính bảng), ban quản trị vui lòng tuân thủ các quy tắc hình ảnh sau đây:

| Mục nội dung | Kích thước ảnh khuyên dùng | Định dạng tối ưu | Lưu ý |
| :--- | :--- | :--- | :--- |
| **Hero Banner** | `1920 x 1080 px` hoặc `1920 x 850 px` | **`.webp`** (hoặc `.jpg`) | Ảnh ngang khổ rộng, sắc nét, dung lượng < 300KB |
| **Ảnh đại diện bài viết (Thumbnail)** | `600 x 400 px` hoặc `800 x 530 px` (Tỷ lệ 3:2) | **`.webp`** | Đồng nhất tỷ lệ giữa các bài viết để trang danh sách thẳng hàng, đẹp mắt |
| **Ảnh bộ sưu tập (Gallery)** | Đồng nhất kích thước (Ví dụ: cùng là tỷ lệ 3:2 hoặc 16:9) | **`.webp`** | Tránh up ảnh dọc lẫn ảnh ngang làm xô lệch slide ảnh chi tiết dự án |

> **🌟 Mẹo nhỏ tối ưu SEO:** Trước khi đăng ảnh lên, bạn nên đổi tên ảnh không dấu, ngăn cách bằng dấu gạch ngang (Ví dụ: `thiet-ke-biet-thu-tan-co-dien.webp`) thay vì để tên mặc định như `IMG_2930.jpg`. Việc này giúp bài viết của bạn có cơ hội lên Top tìm kiếm hình ảnh của Google nhanh gấp 3 lần!
