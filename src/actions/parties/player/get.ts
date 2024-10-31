import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";
import { partiesUserGetHandler } from "../user/get";

export const partiesPlayerGetInput = z.object({
  partyId: z.number().int(),
});

export type PartiesPlayerGetInput = z.infer<typeof partiesPlayerGetInput>;

export const partiesPlayerGetHandler = async (
  input: PartiesPlayerGetInput,
  context: ActionAPIContext,
) => {
  const user = await partiesUserGetHandler({ partyId: input.partyId }, context);

  const player = await supabase
    .from("parties_players")
    .select()
    .eq("user_id", user.id)
    .neq("name", null)
    .neq("avatar_id", null)
    .maybeSingle();

  if (player.error) {
    console.error("ERROR: partiesPlayerGetHandler:", input, player.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: player.error.message,
    });
  }

  if (!player.data) {
    throw new ActionError({
      code: "NOT_FOUND",
      message: "Player not found",
    });
  }

  return player.data;
};

export const get = defineAction({
  accept: "json",
  input: partiesPlayerGetInput,
  handler: partiesPlayerGetHandler,
});
