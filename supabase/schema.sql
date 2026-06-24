create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role text not null default 'customer' check (role in ('admin', 'staff', 'customer')),
  status text not null default 'active' check (status in ('active', 'blocked')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null check (category in ('ao', 'quan', 'vay', 'phu-kien')),
  category_label text not null,
  price integer not null check (price >= 0),
  image_url text not null,
  badge text,
  colors text[] not null default '{}',
  sizes text[] not null default '{}',
  short_description text not null,
  description text not null,
  suitable_for text[] not null default '{}',
  tags text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id text primary key,
  customer_id text not null,
  customer_name text not null,
  phone text not null,
  address text not null,
  notes text,
  total integer not null check (total >= 0),
  status text not null default 'pending' check (status in ('pending', 'processing', 'shipping', 'delivered', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id text not null references public.orders(id) on delete cascade,
  product_id text references public.products(id),
  quantity integer not null check (quantity > 0),
  size text not null,
  color text not null,
  price_at_order_time integer not null check (price_at_order_time >= 0)
);

create table if not exists public.shop_policies (
  key text primary key,
  content text not null,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.shop_policies enable row level security;

drop policy if exists "Anyone can read active products" on public.products;
create policy "Anyone can read active products"
  on public.products for select
  using (is_active = true);

drop policy if exists "Anyone can read shop policies" on public.shop_policies;
create policy "Anyone can read shop policies"
  on public.shop_policies for select
  using (true);

drop policy if exists "Public visitors can create orders" on public.orders;
create policy "Public visitors can create orders"
  on public.orders for insert
  with check (true);

drop policy if exists "Public visitors can create order items" on public.order_items;
create policy "Public visitors can create order items"
  on public.order_items for insert
  with check (true);

drop policy if exists "Authenticated staff can manage products" on public.products;
create policy "Authenticated staff can manage products"
  on public.products for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.status = 'active'
        and profiles.role in ('admin', 'staff')
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.status = 'active'
        and profiles.role in ('admin', 'staff')
    )
  );

drop policy if exists "Authenticated staff can read orders" on public.orders;
create policy "Authenticated staff can read orders"
  on public.orders for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.status = 'active'
        and profiles.role in ('admin', 'staff')
    )
  );

drop policy if exists "Authenticated staff can update orders" on public.orders;
create policy "Authenticated staff can update orders"
  on public.orders for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.status = 'active'
        and profiles.role in ('admin', 'staff')
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.status = 'active'
        and profiles.role in ('admin', 'staff')
    )
  );

insert into public.shop_policies (key, content) values
  ('delivery', 'Giao hàng toàn quốc từ 2-4 ngày làm việc. Miễn phí vận chuyển cho đơn từ 500.000đ.'),
  ('returnPolicy', 'Đổi size trong 7 ngày nếu sản phẩm còn tem mác và chưa qua sử dụng.'),
  ('orderGuide', 'Chọn sản phẩm, thêm vào giỏ hàng, điền họ tên, số điện thoại và địa chỉ giao hàng.')
on conflict (key) do update set content = excluded.content, updated_at = now();

insert into public.products
  (id, name, category, category_label, price, image_url, badge, colors, sizes, short_description, description, suitable_for, tags)
values
  ('ao-thun-basic-cotton', 'Áo thun Basic Cotton', 'ao', 'Áo', 189000, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80', 'Best seller', array['Trắng','Đen','Be'], array['S','M','L','XL'], 'Áo thun cotton mềm, dễ phối đồ, phù hợp đi học và đi chơi.', 'Chất cotton thoáng, form regular dễ mặc hằng ngày. Sản phẩm phù hợp với sinh viên cần một item gọn gàng, giá tốt và dễ kết hợp với nhiều kiểu quần.', array['Sinh viên','Đi học','Đi chơi','Ngân sách tiết kiệm'], array['cotton','basic','sinh viên','giá tốt']),
  ('ao-so-mi-oxford', 'Áo sơ mi Oxford', 'ao', 'Áo', 329000, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80', 'New', array['Trắng','Xanh nhạt'], array['S','M','L'], 'Áo sơ mi lịch sự, chất đứng form, hợp đi học, đi làm và hẹn gặp.', 'Kiểu áo sơ mi Oxford có mặt vải đẹp, đứng form vừa phải. Đây là lựa chọn an toàn khi cần một bộ đồ gọn gàng nhưng không quá trang trọng.', array['Đi học','Đi làm','Phong cách thanh lịch'], array['sơ mi','lịch sự','oxford']),
  ('quan-jeans-straight', 'Quần jeans Straight Fit', 'quan', 'Quần', 459000, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80', null, array['Xanh đậm','Xanh nhạt'], array['28','29','30','31','32'], 'Quần jeans ống đứng, bền, dễ mặc với áo thun hoặc sơ mi.', 'Form straight fit cân bằng giữa thoải mái và gọn gàng. Chất jeans dày vừa, phù hợp sử dụng thường ngày.', array['Đi học','Đi chơi','Phong cách năng động'], array['jeans','straight','hằng ngày']),
  ('vay-midi-linen', 'Váy midi Linen', 'vay', 'Váy', 399000, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80', 'Sale', array['Kem','Nâu sữa'], array['S','M','L'], 'Váy midi nhẹ, thanh lịch, hợp cafe, đi học và đi làm.', 'Chất linen pha thoáng mát, chiều dài vừa phải. Màu trung tính giúp dễ phối với áo thun, cardigan hoặc sơ mi.', array['Nữ tính','Đi chơi','Đi làm'], array['váy','linen','thanh lịch']),
  ('quan-tay-relaxed', 'Quần tây Relaxed', 'quan', 'Quần', 389000, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80', null, array['Đen','Ghi','Be'], array['S','M','L','XL'], 'Quần tây thoải mái, lên form gọn, hợp phong cách tối giản.', 'Thiết kế relaxed giúp dễ vận động, lưng cao vừa phải. Phù hợp với áo sơ mi, polo hoặc blazer nhẹ.', array['Đi làm','Thuyết trình','Phong cách tối giản'], array['quần tây','tối giản','lịch sự']),
  ('ao-khoac-cardigan', 'Áo khoác Cardigan', 'ao', 'Áo', 349000, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', 'New', array['Nâu','Kem','Xanh rêu'], array['S','M','L'], 'Cardigan mỏng, dễ khoác ngoài khi đi học hoặc đi làm.', 'Áo khoác len mỏng có độ co giãn nhẹ, giữ ấm vừa đủ và tạo cảm giác mềm mại cho outfit hằng ngày.', array['Đi học','Thời tiết mát','Layering'], array['cardigan','len mỏng','layer']),
  ('tui-canvas-mini', 'Túi canvas Mini', 'phu-kien', 'Phụ kiện', 159000, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80', null, array['Kem','Đen'], array['Free size'], 'Túi canvas nhỏ gọn, đựng đủ vật dụng cơ bản khi ra ngoài.', 'Kích thước vừa đủ cho điện thoại, ví, sạc và phụ kiện nhỏ. Chất canvas dễ vệ sinh, hợp với phong cách trẻ trung.', array['Sinh viên','Đi học','Giá tốt'], array['túi','canvas','phụ kiện','sinh viên']),
  ('mu-bucket-kaki', 'Mũ bucket Kaki', 'phu-kien', 'Phụ kiện', 129000, 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?auto=format&fit=crop&w=900&q=80', null, array['Be','Đen','Xanh rêu'], array['Free size'], 'Mũ bucket gọn nhẹ, tạo điểm nhấn cho outfit hằng ngày.', 'Chất kaki đứng phom, dễ gấp mang theo. Phù hợp khi đi chơi, du lịch ngắn ngày hoặc chụp ảnh lookbook.', array['Đi chơi','Du lịch','Năng động'], array['mũ','bucket','phụ kiện'])
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  category_label = excluded.category_label,
  price = excluded.price,
  image_url = excluded.image_url,
  badge = excluded.badge,
  colors = excluded.colors,
  sizes = excluded.sizes,
  short_description = excluded.short_description,
  description = excluded.description,
  suitable_for = excluded.suitable_for,
  tags = excluded.tags,
  updated_at = now();
