import { createClient } from "@supabase/supabase-js";
import { SUPABASE_CLIENT_URL, SUPABASE_CLIENT_KEY } from "astro:env/client";

import type { Database } from "./types";

export const supabase = createClient<Database>(
  SUPABASE_CLIENT_URL,
  SUPABASE_CLIENT_KEY,
);
