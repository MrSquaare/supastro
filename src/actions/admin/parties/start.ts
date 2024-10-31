import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";
import { adminUserGetHandler } from "../user/get";

export const adminPartiesStartInput = z.object({
  id: z.number().int(),
});

export type AdminPartiesStartInput = z.infer<typeof adminPartiesStartInput>;

export const adminPartiesStartHandler = async (
  input: AdminPartiesStartInput,
  context: ActionAPIContext,
) => {
  await adminUserGetHandler({}, context);

  const party = await supabase
    .from("parties")
    .update({
      status: "RUNNING",
    })
    .eq("id", input.id);

  if (party.error) {
    console.error("ERROR: adminPartiesStartHandler:", input, party.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: party.error.message,
    });
  }
};

export const start = defineAction({
  accept: "json",
  input: adminPartiesStartInput,
  handler: adminPartiesStartHandler,
});
