import { createClient } from "@supabase/supabase-js";
import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { SUPABASE_SERVER_KEY, SUPABASE_SERVER_URL } from "astro:env/server";
import { z } from "astro:schema";

import { supabase } from "../../lib/supabase/server";

import { handleAuth } from "./auth/utils";

export const partiesJoinInput = z.object({
  id: z.number().int(),
  password: z.string().min(1, "Password is required"),
});

export type PartiesJoinInput = z.infer<typeof partiesJoinInput>;

export const partiesJoinHandler = async (
  input: PartiesJoinInput,
  context: ActionAPIContext,
) => {
  const party = await supabase
    .from("parties")
    .select()
    .eq("id", input.id)
    .eq("password", input.password)
    .maybeSingle();

  if (party.error) {
    console.error("ERROR: partiesJoinHandler:", input, party.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: party.error.message,
    });
  }

  if (!party.data) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "Invalid party credentials",
    });
  }

  const authSupabase = createClient(SUPABASE_SERVER_URL, SUPABASE_SERVER_KEY);
  const auth = await authSupabase.auth.signInAnonymously({
    options: {
      data: {
        party_id: party.data.id,
      },
    },
  });

  await handleAuth(input.id, auth, context);
};

export const join = defineAction({
  accept: "json",
  input: partiesJoinInput,
  handler: partiesJoinHandler,
});
