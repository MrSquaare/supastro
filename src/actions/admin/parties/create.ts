import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../../lib/supabase/server";
import { adminUserGetHandler } from "../user/get";

export const adminPartiesCreateInput = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
});

export type AdminPartiesCreateInput = z.infer<typeof adminPartiesCreateInput>;

export const adminPartiesCreateHandler = async (
  input: AdminPartiesCreateInput,
  context: ActionAPIContext,
) => {
  await adminUserGetHandler({}, context);

  const party = await supabase.from("parties").insert({
    name: input.name,
    password: input.password,
  });

  if (party.error) {
    console.error("ERROR: adminPartiesCreateHandler:", input, party.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: party.error.message,
    });
  }
};

export const create = defineAction({
  accept: "json",
  input: adminPartiesCreateInput,
  handler: adminPartiesCreateHandler,
});
