import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "../../lib/supabase/server";

import { handleUnauth } from "./auth/utils";
import { partiesUserGetHandler } from "./user/get";

export const partiesLeaveInput = z.object({
  id: z.number().int(),
});

export type PartiesLeaveInput = z.infer<typeof partiesLeaveInput>;

export const partiesLeaveHandler = async (
  input: PartiesLeaveInput,
  context: ActionAPIContext,
) => {
  const user = await partiesUserGetHandler({ partyId: input.id }, context);

  const deleteUser = await supabase.auth.admin.deleteUser(user.id);

  if (deleteUser.error) {
    console.error("ERROR: partiesLeaveHandler:", input, deleteUser.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: deleteUser.error.message,
    });
  }

  handleUnauth(input.id, context);
};

export const leave = defineAction({
  accept: "json",
  input: partiesLeaveInput,
  handler: partiesLeaveHandler,
});
