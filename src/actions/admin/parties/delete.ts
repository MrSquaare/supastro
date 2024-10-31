import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";
import { adminUserGetHandler } from "../user/get";

export const adminPartiesDeleteInput = z.object({
  id: z.number().int(),
  name: z.string().min(1).optional(),
  password: z.string().min(1).optional(),
});

export type AdminPartiesDeleteInput = z.infer<typeof adminPartiesDeleteInput>;

export const adminPartiesDeleteHandler = async (
  input: AdminPartiesDeleteInput,
  context: ActionAPIContext,
) => {
  await adminUserGetHandler({}, context);

  const party = await supabase.from("parties").delete().eq("id", input.id);

  if (party.error) {
    console.error("ERROR: adminPartiesDeleteHandler:", input, party.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: party.error.message,
    });
  }
};

export const del = defineAction({
  accept: "json",
  input: adminPartiesDeleteInput,
  handler: adminPartiesDeleteHandler,
});
