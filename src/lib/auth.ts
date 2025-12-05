'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

// Define types for our user
export type User = {
  id: string;
  email?: string | null;
  role?: string;
  created_at?: string;
};

// Authentication hook
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);

      // Listen for auth changes
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
          setLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    getSession();
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'member' // Default role is member
        }
      }
    });

    return { error };
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    return { error };
  };

  // Sign out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (!error) {
      setUser(null);
    }

    return { error };
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<User>) => {
    const { error } = await supabase.auth.updateUser(updates);

    return { error };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateUserProfile
  };
};