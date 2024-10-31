import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";
import { partiesGetHandler } from "../get";
import { partiesPlayerGetHandler } from "../player/get";

export const partiesDataIncrementInput = z.object({
  id: z.number().int(),
  target: z.string().min(1),
});

export type PartiesDataIncrementInput = z.infer<
  typeof partiesDataIncrementInput
>;

export const partiesDataIncrementHandler = async (
  input: PartiesDataIncrementInput,
  context: ActionAPIContext,
) => {
  const party = await partiesGetHandler({ id: input.id });

  if (party.status !== "RUNNING") {
    throw new ActionError({
      code: "BAD_REQUEST",
      message: "Party is not running",
    });
  }

  const player = await partiesPlayerGetHandler({ partyId: input.id }, context);

  const increment = await supabase.rpc("party_data_increment", {
    party_id_arg: input.id,
    name_arg: input.target,
  });

  if (increment.error) {
    console.error(
      "ERROR: partiesDataIncrementHandler:",
      input,
      increment.error,
    );

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: increment.error.message,
    });
  }

  const playerIncrement = await supabase.rpc("party_player_data_increment", {
    party_id_arg: input.id,
    player_id_arg: player.id,
    name_arg: "support",
  });

  if (playerIncrement.error) {
    console.error(
      "ERROR: partiesDataIncrementHandler:",
      input,
      playerIncrement.error,
    );

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: playerIncrement.error.message,
    });
  }
};

export const increment = defineAction({
  accept: "json",
  input: partiesDataIncrementInput,
  handler: partiesDataIncrementHandler,
});
