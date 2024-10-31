import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";
import { adminUserGetHandler } from "../user/get";

export const adminPartiesResetInput = z.object({
  id: z.number().int(),
});

export type AdminPartiesResetInput = z.infer<typeof adminPartiesResetInput>;

export const adminPartiesResetHandler = async (
  input: AdminPartiesResetInput,
  context: ActionAPIContext,
) => {
  await adminUserGetHandler({}, context);

  const data = await supabase
    .from("parties_data")
    .delete()
    .eq("party_id", input.id);

  if (data.error) {
    console.error("ERROR: adminPartiesResetHandler:", input, data.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: data.error.message,
    });
  }

  const playerData = await supabase
    .from("parties_players_data")
    .delete()
    .eq("party_id", input.id);

  if (playerData.error) {
    console.error("ERROR: adminPartiesResetHandler:", input, playerData.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: playerData.error.message,
    });
  }

  const party = await supabase
    .from("parties")
    .update({
      status: "OPEN",
    })
    .eq("id", input.id);

  if (party.error) {
    console.error("ERROR: adminPartiesResetHandler:", input, party.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: party.error.message,
    });
  }
};

export const reset = defineAction({
  accept: "json",
  input: adminPartiesResetInput,
  handler: adminPartiesResetHandler,
});
