"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const payload = new URLSearchParams();
  payload.append("username", email.toString());
  payload.append("password", password.toString());

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return { error: data.detail || "Invalid credentials" };
    }

    const data = await response.json();
    
    if (data.success && data.data?.access_token) {
      cookies().set("access_token", data.data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 15, // 15 minutes
      });
      
      cookies().set("refresh_token", data.data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

  } catch (error: any) {
    return { error: "Connection error. Ensure backend is running." };
  }

  redirect("/");
}

export async function logoutAction() {
  cookies().delete("access_token");
  cookies().delete("refresh_token");
  redirect("/login");
}
