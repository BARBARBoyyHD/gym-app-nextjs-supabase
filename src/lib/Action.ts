"use server";
import { createClient } from "@/lib/supabase/server";
import { toast } from "sonner";

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    toast.error('Login failed: ' + error.message)
    return { success: false, message: error.message }   
  }

  return { success: true }
}