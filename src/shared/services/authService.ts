import { supabase, isSupabaseConfigured } from "@/shared/supabase/client";
import {
  User,
  UserRole,
  UserStatus,
  getLoggedUser,
  getMockUsers,
  saveMockUsers,
  setLoggedUser,
} from "@/shared/data/mockDb";

type ProfileRow = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  birth_date: string | null;
  gender: string | null;
  default_shipping_address: string | null;
  role: UserRole;
  status: UserStatus;
  created_at: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
};

const mapProfileToUser = (profile: ProfileRow): User => ({
  id: profile.id,
  name: profile.full_name,
  email: profile.email,
  phone: profile.phone || undefined,
  role: profile.role,
  status: profile.status,
  createdAt: profile.created_at,
});

async function loadProfile(userId: string): Promise<User | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,phone,birth_date,gender,default_shipping_address,role,status,created_at")
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.warn("Supabase profile load failed:", error?.message);
    return null;
  }

  return mapProfileToUser(data as ProfileRow);
}

export async function getCurrentAuthUser(): Promise<User | null> {
  if (!isSupabaseConfigured || !supabase) {
    return getLoggedUser();
  }

  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user) {
    return null;
  }

  return loadProfile(data.session.user.id);
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  if (!isSupabaseConfigured || !supabase) {
    const users = getMockUsers();
    const user = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    );

    if (!user) {
      throw new Error("Email hoặc mật khẩu không chính xác.");
    }

    if (user.status === "blocked") {
      throw new Error("Tài khoản của bạn đã bị khóa bởi Admin.");
    }

    setLoggedUser(user);
    return user;
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    throw new Error(error?.message || "Không thể đăng nhập bằng Supabase.");
  }

  const user = await loadProfile(data.user.id);
  if (!user) {
    throw new Error("Không tìm thấy hồ sơ người dùng trong bảng profiles.");
  }

  if (user.status === "blocked") {
    await supabase.auth.signOut();
    throw new Error("Tài khoản của bạn đã bị khóa bởi Admin.");
  }

  setLoggedUser(null);
  return user;
}

export async function registerWithEmail(payload: RegisterPayload): Promise<User | null> {
  if (!isSupabaseConfigured || !supabase) {
    const users = getMockUsers();
    const emailExists = users.some(
      (item) => item.email.toLowerCase() === payload.email.toLowerCase(),
    );

    if (emailExists) {
      throw new Error("Email này đã được sử dụng bởi một tài khoản khác.");
    }

    const newUser: User = {
      id: "user-" + Date.now(),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      role: "customer",
      status: "active",
      createdAt: new Date().toISOString(),
    };

    saveMockUsers([...users, newUser]);
    setLoggedUser(newUser);
    return newUser;
  }

  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      emailRedirectTo: window.location.origin,
      data: {
        full_name: payload.name,
        phone: payload.phone || null,
        birth_date: payload.birthDate || null,
        gender: payload.gender || null,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    return null;
  }

  // If email confirmation is disabled, the trigger should already have created a profile.
  // If confirmation is enabled, the session may be empty and profile access can wait until login.
  if (!data.session) {
    return null;
  }

  return loadProfile(data.user.id);
}

export async function requestPasswordReset(email: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Chức năng quên mật khẩu cần cấu hình Supabase.");
  }

  const redirectTo = `${window.location.origin}/?auth=reset-password`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentPassword(newPassword: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Chức năng đổi mật khẩu cần cấu hình Supabase.");
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    throw new Error(error.message);
  }
}

export async function logoutAuthUser() {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut();
  }

  setLoggedUser(null);
}

export async function loadUsers(): Promise<User[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getMockUsers();
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,phone,birth_date,gender,default_shipping_address,role,status,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Supabase users failed, using local users:", error.message);
    return getMockUsers();
  }

  return (data as ProfileRow[]).map(mapProfileToUser);
}

export async function updateUserRole(userId: string, role: UserRole): Promise<void> {
  const updatedLocalUsers = getMockUsers().map((user) =>
    user.id === userId ? { ...user, role } : user,
  );
  saveMockUsers(updatedLocalUsers);

  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  const { error } = await supabase.from("profiles").update({ role }).eq("id", userId);
  if (error) {
    throw new Error(`Không thể cập nhật vai trò tài khoản: ${error.message}`);
  }
}

export async function updateUserStatus(userId: string, status: UserStatus): Promise<void> {
  const updatedLocalUsers = getMockUsers().map((user) =>
    user.id === userId ? { ...user, status } : user,
  );
  saveMockUsers(updatedLocalUsers);

  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  const { error } = await supabase.from("profiles").update({ status }).eq("id", userId);
  if (error) {
    throw new Error(`Không thể cập nhật trạng thái tài khoản: ${error.message}`);
  }
}
