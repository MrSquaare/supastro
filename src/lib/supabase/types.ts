export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      parties: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          password: string;
          status: Database["public"]["Enums"]["party_status"];
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          password: string;
          status?: Database["public"]["Enums"]["party_status"];
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          password?: string;
          status?: Database["public"]["Enums"]["party_status"];
        };
        Relationships: [];
      };
      parties_data: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          party_id: number;
          value: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          party_id: number;
          value: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          party_id?: number;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: "parties_data_party_id_fkey";
            columns: ["party_id"];
            isOneToOne: false;
            referencedRelation: "parties";
            referencedColumns: ["id"];
          },
        ];
      };
      parties_players: {
        Row: {
          avatar_id: string | null;
          created_at: string;
          id: number;
          name: string | null;
          party_id: number;
          user_id: string;
        };
        Insert: {
          avatar_id?: string | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          party_id: number;
          user_id: string;
        };
        Update: {
          avatar_id?: string | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          party_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "parties_players_party_id_fkey";
            columns: ["party_id"];
            isOneToOne: false;
            referencedRelation: "parties";
            referencedColumns: ["id"];
          },
        ];
      };
      parties_players_data: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          party_id: number;
          player_id: number;
          value: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          party_id: number;
          player_id: number;
          value: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          party_id?: number;
          player_id?: number;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: "parties_players_data_party_id_fkey";
            columns: ["party_id"];
            isOneToOne: false;
            referencedRelation: "parties";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "parties_players_data_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "parties_players";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      party_data_decrement: {
        Args: {
          party_id_arg: number;
          name_arg: string;
        };
        Returns: undefined;
      };
      party_data_increment: {
        Args: {
          party_id_arg: number;
          name_arg: string;
        };
        Returns: undefined;
      };
      party_player_data_decrement: {
        Args: {
          party_id_arg: number;
          player_id_arg: number;
          name_arg: string;
        };
        Returns: undefined;
      };
      party_player_data_increment: {
        Args: {
          party_id_arg: number;
          player_id_arg: number;
          name_arg: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      party_status: "OPEN" | "RUNNING" | "CLOSE";
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
