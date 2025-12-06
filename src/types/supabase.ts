export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      check_in_logs: {
        Row: {
          id: string;
          user_id: string;
          check_in_time: string;
          device: string | null;
          check_in_method: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          check_in_time?: string;
          device?: string | null;
          check_in_method?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          check_in_time?: string;
          device?: string | null;
          check_in_method?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "check_in_logs_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "members";
            referencedColumns: ["id"];
          }
        ];
      };
      memberships: {
        Row: {
          id: string;
          user_id: string;
          plan_id: number;
          start_date: string;
          end_date: string;
          status: string;
          payment_method: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_id: number;
          start_date: string;
          end_date: string;
          status: string;
          payment_method?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_id?: number;
          start_date?: string;
          end_date?: string;
          status?: string;
          payment_method?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "memberships_plan_id_fkey";
            columns: ["plan_id"];
            referencedRelation: "membership_plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memberships_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "members";
            referencedColumns: ["id"];
          }
        ];
      };
      membership_plans: {
        Row: {
          id: number;
          name: string;
          price: number;
          duration_days: number;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          price: number;
          duration_days: number;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          price?: number;
          duration_days?: number;
          description?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      user_metrics: {
        Row: {
          id: string;
          user_id: string;
          weight: number | null;
          height: number | null;
          bmi: number | null;
          date_recorded: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          weight?: number | null;
          height?: number | null;
          bmi?: number | null;
          date_recorded?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          weight?: number | null;
          height?: number | null;
          bmi?: number | null;
          date_recorded?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_metrics_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "members";
            referencedColumns: ["id"];
          }
        ];
      };
      members: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          role: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          role?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          role?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      workout_progress: {
        Row: {
          id: string;
          user_id: string;
          program_id: string;
          date: string;
          progress_note: string | null;
          completed: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          program_id: string;
          date: string;
          progress_note?: string | null;
          completed?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          program_id?: string;
          date?: string;
          progress_note?: string | null;
          completed?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "workout_progress_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workout_progress_program_id_fkey";
            columns: ["program_id"];
            referencedRelation: "workout_programs";
            referencedColumns: ["id"];
          }
        ];
      };
      workout_programs: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          level: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          level?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          level?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;