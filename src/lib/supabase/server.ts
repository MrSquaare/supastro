import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SERVER_URL, SUPABASE_SERVER_KEY } from "astro:env/server";

import type { Database } from "./types";

export const supabase = createClient<Database>(
  SUPABASE_SERVER_URL,
  SUPABASE_SERVER_KEY,
);
