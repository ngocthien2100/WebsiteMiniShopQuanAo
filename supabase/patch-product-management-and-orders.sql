-- Patch for existing Supabase projects.
-- Run this once in Supabase SQL Editor if product add/edit/delete or order history
-- does not persist after deploying the app.

grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant insert on public.orders to anon, authenticated;
grant select, insert, update on public.orders to authenticated;
grant insert on public.order_items to anon, authenticated;
grant select, insert on public.order_items to authenticated;

drop policy if exists "Authenticated staff can manage products" on public.products;
create policy "Authenticated staff can manage products"
  on public.products for all
  using (public.current_profile_is_staff())
  with check (public.current_profile_is_staff());

drop policy if exists "Users can read own orders" on public.orders;
create policy "Users can read own orders"
  on public.orders for select
  using (customer_id = auth.uid()::text);

drop policy if exists "Authenticated staff can read orders" on public.orders;
create policy "Authenticated staff can read orders"
  on public.orders for select
  using (public.current_profile_is_staff());

drop policy if exists "Authenticated staff can update orders" on public.orders;
create policy "Authenticated staff can update orders"
  on public.orders for update
  using (public.current_profile_is_staff())
  with check (public.current_profile_is_staff());

drop policy if exists "Authenticated staff can read order items" on public.order_items;
create policy "Authenticated staff can read order items"
  on public.order_items for select
  using (public.current_profile_is_staff());

drop policy if exists "Users can read own order items" on public.order_items;
create policy "Users can read own order items"
  on public.order_items for select
  using (
    exists (
      select 1
      from public.orders
      where orders.id = order_items.order_id
        and orders.customer_id = auth.uid()::text
    )
  );
