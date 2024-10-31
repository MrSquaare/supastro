import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";
import { adminUserGetHandler } from "../user/get";

export const adminPartiesUpdateInput = z.object({
  id: z.number().int(),
  name: z.string().min(1).optional(),
  password: z.string().min(1).optional(),
});

export type AdminPartiesUpdateInput = z.infer<typeof adminPartiesUpdateInput>;

export const adminPartiesUpdateHandler = async (
  input: AdminPartiesUpdateInput,
  context: ActionAPIContext,
) => {
  await adminUserGetHandler({}, context);

  const party = await supabase
    .from("parties")
    .update({
      name: input.name,
      password: input.password,
    })
    .eq("id", input.id);

  if (party.error) {
    console.error("ERROR: adminPartiesUpdateHandler:", input, party.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: party.error.message,
    });
  }
};

export const update = defineAction({
  accept: "json",
  input: adminPartiesUpdateInput,
  handler: adminPartiesUpdateHandler,
});
