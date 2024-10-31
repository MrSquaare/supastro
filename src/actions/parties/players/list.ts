import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";

export const partiesPlayersListInput = z.object({
  id: z.number().int(),
});

export type PartiesPlayersListInput = z.infer<typeof partiesPlayersListInput>;

export const partiesPlayersListHandler = async (
  input: PartiesPlayersListInput,
) => {
  const players = await supabase
    .from("parties_players")
    .select("id, name, avatar_id")
    .eq("party_id", input.id)
    .neq("name", null)
    .neq("avatar_id", null);

  if (players.error) {
    console.error("ERROR: partiesPlayersListHandler:", input, players.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: players.error.message,
    });
  }

  return players.data;
};

export const list = defineAction({
  accept: "json",
  handler: partiesPlayersListHandler,
});
