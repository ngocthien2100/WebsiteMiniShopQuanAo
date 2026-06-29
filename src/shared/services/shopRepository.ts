import { supabase, isSupabaseConfigured } from "@/shared/supabase/client";
import { Product, ProductCategory } from "@/shared/data/products";
import {
  Order,
  OrderStatus,
  User,
  getMockOrders,
  getMockProducts,
  saveMockOrders,
  saveMockProducts,
} from "@/shared/data/mockDb";

type ProductRow = {
  id: string;
  name: string;
  category: ProductCategory;
  category_label: string;
  price: number;
  image_url: string;
  badge: string | null;
  colors: string[];
  sizes: string[];
  short_description: string;
  description: string;
  suitable_for: string[];
  tags: string[];
  is_active: boolean;
};

type OrderRow = {
  id: string;
  customer_id: string;
  customer_name: string;
  phone: string;
  address: string;
  notes: string | null;
  total: number;
  status: OrderStatus;
  created_at: string;
};

type OrderItemRow = {
  product_id: string;
  quantity: number;
  size: string;
  color: string;
  price_at_order_time: number;
  products: ProductRow | null;
};

const toProduct = (row: ProductRow): Product => ({
  id: row.id,
  name: row.name,
  category: row.category,
  categoryLabel: row.category_label,
  price: row.price,
  image: row.image_url,
  badge: row.badge || undefined,
  colors: row.colors || [],
  sizes: row.sizes || [],
  shortDescription: row.short_description,
  description: row.description,
  suitableFor: row.suitable_for || [],
  tags: row.tags || [],
});

const toProductRow = (product: Product): ProductRow => ({
  id: product.id,
  name: product.name,
  category: product.category,
  category_label: product.categoryLabel,
  price: product.price,
  image_url: product.image,
  badge: product.badge || null,
  colors: product.colors,
  sizes: product.sizes,
  short_description: product.shortDescription,
  description: product.description,
  suitable_for: product.suitableFor,
  tags: product.tags,
  is_active: true,
});

export async function loadProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getMockProducts();
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Supabase products failed, using local data:", error.message);
    return getMockProducts();
  }

  return (data as ProductRow[]).map(toProduct);
}

export async function saveProducts(products: Product[]): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    saveMockProducts(products);
    return products;
  }

  const { error } = await supabase.from("products").upsert(products.map(toProductRow));
  if (error) {
    throw new Error(`Không thể lưu sản phẩm lên Supabase: ${error.message}`);
  }

  saveMockProducts(products);
  return products;
}

export async function deleteProduct(productId: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    saveMockProducts(getMockProducts().filter((product) => product.id !== productId));
    return;
  }

  const { error } = await supabase
    .from("products")
    .update({ is_active: false })
    .eq("id", productId);

  if (error) {
    throw new Error(`Không thể xóa sản phẩm trên Supabase: ${error.message}`);
  }

  saveMockProducts(getMockProducts().filter((product) => product.id !== productId));
}

export async function createOrder(order: Order): Promise<Order> {
  if (!isSupabaseConfigured || !supabase) {
    const localOrders = [...getMockOrders(), order];
    saveMockOrders(localOrders);
    return order;
  }

  const { error: orderError } = await supabase.from("orders").insert({
    id: order.id,
    customer_id: order.customerId,
    customer_name: order.customerName,
    phone: order.phone,
    address: order.address,
    notes: order.notes || null,
    total: order.total,
    status: order.status,
    created_at: order.createdAt,
  });

  if (orderError) {
    throw new Error(`Không thể lưu đơn hàng lên Supabase: ${orderError.message}`);
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    order.items.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      price_at_order_time: item.product.price,
    })),
  );

  if (itemsError) {
    throw new Error(`Không thể lưu chi tiết đơn hàng lên Supabase: ${itemsError.message}`);
  }

  const localOrders = [...getMockOrders(), order];
  saveMockOrders(localOrders);
  return order;
}

export async function loadOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getMockOrders();
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Supabase orders failed, using local data:", error.message);
    return getMockOrders();
  }

  return (data as Array<OrderRow & { order_items: OrderItemRow[] }>).map((row) => ({
    id: row.id,
    customerId: row.customer_id,
    customerName: row.customer_name,
    phone: row.phone,
    address: row.address,
    notes: row.notes || "",
    total: row.total,
    status: row.status,
    createdAt: row.created_at,
    items: (row.order_items || [])
      .filter((item) => item.products)
      .map((item) => ({
        product: toProduct(item.products!),
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
  }));
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    const updatedLocalOrders = getMockOrders().map((order) =>
      order.id === orderId ? { ...order, status } : order,
    );
    saveMockOrders(updatedLocalOrders);
    return;
  }

  const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
  if (error) {
    throw new Error(`Không thể cập nhật trạng thái đơn hàng: ${error.message}`);
  }

  const updatedLocalOrders = getMockOrders().map((order) =>
    order.id === orderId ? { ...order, status } : order,
  );
  saveMockOrders(updatedLocalOrders);
}

export function getDatabaseModeLabel() {
  return isSupabaseConfigured ? "Supabase cloud" : "Local demo";
}

export function isCloudDatabaseEnabled() {
  return isSupabaseConfigured;
}

export function getCustomerId(user: User | null) {
  return user?.id || "guest-customer";
}
