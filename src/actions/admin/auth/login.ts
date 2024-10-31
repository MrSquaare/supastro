import { createClient } from "@supabase/supabase-js";
import { defineAction, type ActionAPIContext } from "astro:actions";
import { SUPABASE_SERVER_KEY, SUPABASE_SERVER_URL } from "astro:env/server";
import { z } from "astro:schema";

import { handleAuth } from "./utils";

export const adminAuthLoginInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AdminAuthLoginInput = z.infer<typeof adminAuthLoginInput>;

export const adminAuthLoginHandler = async (
  input: AdminAuthLoginInput,
  context: ActionAPIContext,
) => {
  const authSupabase = createClient(SUPABASE_SERVER_URL, SUPABASE_SERVER_KEY);
  const auth = await authSupabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  await handleAuth(auth, context);
};

export const login = defineAction({
  accept: "form",
  input: adminAuthLoginInput,
  handler: adminAuthLoginHandler,
});
