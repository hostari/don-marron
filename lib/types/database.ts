export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      LearnMoreContent: {
        Row: {
          content: string | null;
          createdAt: string;
          id: string;
          imageUrl: string | null;
          section: string;
          title: string | null;
        };
        Insert: {
          content?: string | null;
          createdAt?: string;
          id?: string;
          imageUrl?: string | null;
          section: string;
          title?: string | null;
        };
        Update: {
          content?: string | null;
          createdAt?: string;
          id?: string;
          imageUrl?: string | null;
          section?: string;
          title?: string | null;
        };
        Relationships: [];
      };
      MemberApplication: {
        Row: {
          address: string | null;
          birthDate: string | null;
          companyName: string | null;
          createdAt: string;
          email: string | null;
          fashionStyle: string | null;
          firstName: string;
          id: string;
          lastName: string;
          lifestyle: string | null;
          reason: string | null;
          socials: Json | null;
          status: Database["public"]["Enums"]["ApplicationStatus"];
          title: string | null;
          workEmail: string | null;
        };
        Insert: {
          address?: string | null;
          birthDate?: string | null;
          companyName?: string | null;
          createdAt?: string;
          email?: string | null;
          fashionStyle?: string | null;
          firstName: string;
          id?: string;
          lastName: string;
          lifestyle?: string | null;
          reason?: string | null;
          socials?: Json | null;
          status?: Database["public"]["Enums"]["ApplicationStatus"];
          title?: string | null;
          workEmail?: string | null;
        };
        Update: {
          address?: string | null;
          birthDate?: string | null;
          companyName?: string | null;
          createdAt?: string;
          email?: string | null;
          fashionStyle?: string | null;
          firstName?: string;
          id?: string;
          lastName?: string;
          lifestyle?: string | null;
          reason?: string | null;
          socials?: Json | null;
          status?: Database["public"]["Enums"]["ApplicationStatus"];
          title?: string | null;
          workEmail?: string | null;
        };
        Relationships: [];
      };
      MemberPageCarousel: {
        Row: {
          backgroundColor: string | null;
          buttonLink: string | null;
          createdAt: string;
          description: string | null;
          id: number;
          title: string | null;
        };
        Insert: {
          backgroundColor?: string | null;
          buttonLink?: string | null;
          createdAt?: string;
          description?: string | null;
          id?: number;
          title?: string | null;
        };
        Update: {
          backgroundColor?: string | null;
          buttonLink?: string | null;
          createdAt?: string;
          description?: string | null;
          id?: number;
          title?: string | null;
        };
        Relationships: [];
      };
      Members: {
        Row: {
          created_at: string;
          customerId: string | null;
          dateAccepted: string;
          email: string | null;
          firstName: string | null;
          hasContract: boolean;
          hasWardrobe: boolean;
          id: string;
          lastName: string | null;
          priceId: string | null;
          role: Database["public"]["Enums"]["ProfileRoles"];
          status: Database["public"]["Enums"]["MemberStatus"] | null;
        };
        Insert: {
          created_at?: string;
          customerId?: string | null;
          dateAccepted: string;
          email?: string | null;
          firstName?: string | null;
          hasContract?: boolean;
          hasWardrobe?: boolean;
          id?: string;
          lastName?: string | null;
          priceId?: string | null;
          role?: Database["public"]["Enums"]["ProfileRoles"];
          status?: Database["public"]["Enums"]["MemberStatus"] | null;
        };
        Update: {
          created_at?: string;
          customerId?: string | null;
          dateAccepted?: string;
          email?: string | null;
          firstName?: string | null;
          hasContract?: boolean;
          hasWardrobe?: boolean;
          id?: string;
          lastName?: string | null;
          priceId?: string | null;
          role?: Database["public"]["Enums"]["ProfileRoles"];
          status?: Database["public"]["Enums"]["MemberStatus"] | null;
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
      ApplicationStatus: "pending" | "approved" | "rejected";
      MemberStatus: "waiting_for_activation" | "active" | "inactive";
      ProfileRoles: "member" | "admin";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
