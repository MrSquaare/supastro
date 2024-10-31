import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../lib/supabase/server";

export const partiesGetInput = z.object({
  id: z.number().int(),
});

export type PartiesGetInput = z.infer<typeof partiesGetInput>;

export const partiesGetHandler = async (input: PartiesGetInput) => {
  const party = await supabase
    .from("parties")
    .select("name, status")
    .eq("id", input.id)
    .maybeSingle();

  if (party.error) {
    console.error("ERROR: partiesGetHandler:", input, party.error);

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
  input: partiesGetInput,
  handler: partiesGetHandler,
});
