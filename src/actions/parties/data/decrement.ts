import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";
import { partiesGetHandler } from "../get";
import { partiesPlayerGetHandler } from "../player/get";

export const partiesDataDecrementInput = z.object({
  id: z.number().int(),
  target: z.string().min(1),
});

export type PartiesDataDecrementInput = z.infer<
  typeof partiesDataDecrementInput
>;

export const partiesDataDecrementHandler = async (
  input: PartiesDataDecrementInput,
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

  const decrement = await supabase.rpc("party_data_decrement", {
    party_id_arg: input.id,
    name_arg: input.target,
  });

  if (decrement.error) {
    console.error(
      "ERROR: partiesDataDecrementHandler:",
      input,
      decrement.error,
    );

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: decrement.error.message,
    });
  }

  const playerDecrement = await supabase.rpc("party_player_data_increment", {
    party_id_arg: input.id,
    player_id_arg: player.id,
    name_arg: "hate",
  });

  if (playerDecrement.error) {
    console.error(
      "ERROR: partiesDataDecrementHandler:",
      input,
      playerDecrement.error,
    );

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: playerDecrement.error.message,
    });
  }
};

export const decrement = defineAction({
  accept: "json",
  input: partiesDataDecrementInput,
  handler: partiesDataDecrementHandler,
});
