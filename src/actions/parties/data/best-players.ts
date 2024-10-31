import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";

export const partiesDataBestPlayersInput = z.object({
  id: z.number().int(),
});

export type PartiesDataBestPlayersInput = z.infer<
  typeof partiesDataBestPlayersInput
>;

export const partiesDataBestPlayersHandler = async (
  input: PartiesDataBestPlayersInput,
) => {
  const supporters = await supabase
    .from("parties_players_data")
    .select("value, parties_players (name, avatar_id)")
    .eq("party_id", input.id)
    .eq("name", "support")
    .order("value", { ascending: false });

  if (supporters.error) {
    console.error(
      "ERROR: partiesDataBestPlayersHandler:",
      input,
      supporters.error,
    );

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: supporters.error.message,
    });
  }

  const supporter = supporters.data.at(0);

  if (!supporter) {
    throw new ActionError({
      code: "NOT_FOUND",
      message: "Data not found",
    });
  }

  const haters = await supabase
    .from("parties_players_data")
    .select("value, parties_players (name, avatar_id)")
    .eq("party_id", input.id)
    .eq("name", "hate")
    .order("value", { ascending: false });

  if (haters.error) {
    console.error("ERROR: partiesDataBestPlayersHandler:", input, haters.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: haters.error.message,
    });
  }

  const hater = haters.data.at(0);

  if (!hater) {
    throw new ActionError({
      code: "NOT_FOUND",
      message: "Data not found",
    });
  }

  return {
    supporter,
    hater,
  };
};

export const bestPlayers = defineAction({
  accept: "json",
  input: partiesDataBestPlayersInput,
  handler: partiesDataBestPlayersHandler,
});
