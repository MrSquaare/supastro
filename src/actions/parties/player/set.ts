import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";
import { partiesUserGetHandler } from "../user/get";

export const partiesPlayerSetInput = z.object({
  partyId: z.number().int(),
  name: z.string().min(1),
  avatarId: z.string().min(1),
});

export type PartiesPlayerSetInput = z.infer<typeof partiesPlayerSetInput>;

export const partiesPlayerSetHandler = async (
  input: PartiesPlayerSetInput,
  context: ActionAPIContext,
) => {
  const user = await partiesUserGetHandler({ partyId: input.partyId }, context);

  const player = await supabase.from("parties_players").upsert(
    {
      user_id: user.id,
      party_id: input.partyId,
      name: input.name,
      avatar_id: input.avatarId,
    },
    {
      onConflict: "user_id",
    },
  );

  if (player.error) {
    console.error("ERROR: partiesPlayerSetHandler:", input, player.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: player.error.message,
    });
  }
};

export const set = defineAction({
  accept: "json",
  input: partiesPlayerSetInput,
  handler: partiesPlayerSetHandler,
});
