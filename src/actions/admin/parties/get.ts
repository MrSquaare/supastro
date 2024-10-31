import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";
import { adminUserGetHandler } from "../user/get";

export const adminPartiesGetInput = z.object({
  id: z.number().int(),
});

export type AdminPartiesGetInput = z.infer<typeof adminPartiesGetInput>;

export const adminPartiesGetHandler = async (
  input: AdminPartiesGetInput,
  context: ActionAPIContext,
) => {
  await adminUserGetHandler({}, context);

  const party = await supabase
    .from("parties")
    .select()
    .eq("id", input.id)
    .maybeSingle();

  if (party.error) {
    console.error("ERROR: adminPartiesGetHandler:", input, party.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: party.error.message,
    });
  }

  if (!party.data) {
    throw new ActionError({
      code: "NOT_FOUND",
      message: "Party not found",
    });
  }

  return party.data;
};

export const get = defineAction({
  accept: "json",
  input: adminPartiesGetInput,
  handler: adminPartiesGetHandler,
});
