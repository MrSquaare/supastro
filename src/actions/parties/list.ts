import { ActionError, defineAction } from "astro:actions";

import { supabase } from "../../lib/supabase/server";

export const partiesListHandler = async () => {
  const parties = await supabase.from("parties").select("id, name, status");

  if (parties.error) {
    console.error("ERROR: partiesListHandler:", parties.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: parties.error.message,
    });
  }

  return parties.data;
};

export const list = defineAction({
  accept: "json",
  handler: partiesListHandler,
});
