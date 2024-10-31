import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";

import { supabase } from "../../../lib/supabase/server";
import { adminUserGetHandler } from "../user/get";

export const adminPartiesListHandler = async (
  input: unknown,
  context: ActionAPIContext,
) => {
  await adminUserGetHandler({}, context);

  const parties = await supabase.from("parties").select("id, name, status");

  if (parties.error) {
    console.error("ERROR: adminPartiesListHandler:", parties.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: parties.error.message,
    });
  }

  return parties.data;
};

export const list = defineAction({
  accept: "json",
  handler: adminPartiesListHandler,
});
