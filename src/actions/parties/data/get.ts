import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";

export const partiesDataGetInput = z.object({
  id: z.number().int(),
  target: z.string().min(1),
});

export type PartiesDataGetInput = z.infer<typeof partiesDataGetInput>;

export const partiesDataGetHandler = async (input: PartiesDataGetInput) => {
  const data = await supabase
    .from("parties_data")
    .select()
    .eq("party_id", input.id)
    .eq("name", input.target)
    .maybeSingle();

  if (data.error) {
    console.error("ERROR: partiesDataGetHandler:", input, data.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: data.error.message,
    });
  }

  if (!data.data) {
    throw new ActionError({
      code: "NOT_FOUND",
      message: "Data not found",
    });
  }

  return data.data;
};

export const get = defineAction({
  accept: "json",
  input: partiesDataGetInput,
  handler: partiesDataGetHandler,
});
