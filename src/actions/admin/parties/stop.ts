import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";
import { adminUserGetHandler } from "../user/get";

export const adminPartiesStopInput = z.object({
  id: z.number().int(),
});

export type AdminPartiesStopInput = z.infer<typeof adminPartiesStopInput>;

export const adminPartiesStopHandler = async (
  input: AdminPartiesStopInput,
  context: ActionAPIContext,
) => {
  await adminUserGetHandler({}, context);

  const party = await supabase
    .from("parties")
    .update({
      status: "CLOSE",
    })
    .eq("id", input.id);

  if (party.error) {
    console.error("ERROR: adminPartiesStopHandler:", input, party.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: party.error.message,
    });
  }
};

export const stop = defineAction({
  accept: "json",
  input: adminPartiesStopInput,
  handler: adminPartiesStopHandler,
});
