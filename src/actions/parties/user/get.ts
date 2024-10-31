import { createClient } from "@supabase/supabase-js";
import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { SUPABASE_SERVER_KEY, SUPABASE_SERVER_URL } from "astro:env/server";
import { z } from "astro:schema";

export const partiesUserGetInput = z.object({
  partyId: z.number().int(),
});

export type PartiesUserGetInput = z.infer<typeof partiesUserGetInput>;

export const partiesUserGetHandler = async (
  input: PartiesUserGetInput,
  context: ActionAPIContext,
) => {
  const accessToken = context.cookies.get(
    `party_${input.partyId}_access_token`,
  );
  const refreshToken = context.cookies.get(
    `party_${input.partyId}_refresh_token`,
  );

  if (!accessToken || !refreshToken) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  const authSupabase = createClient(SUPABASE_SERVER_URL, SUPABASE_SERVER_KEY);
  const auth = await authSupabase.auth.getUser(accessToken.value);

  if (auth.error) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: auth.error.message,
    });
  }

  if (!auth.data.user.is_anonymous) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  if (auth.data.user.user_metadata.party_id !== input.partyId) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  return auth.data.user;
};

export const get = defineAction({
  input: partiesUserGetInput,
  handler: partiesUserGetHandler,
});
