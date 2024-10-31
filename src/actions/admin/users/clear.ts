import type { AuthError } from "@supabase/supabase-js";
import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";

import { supabase } from "../../../lib/supabase/server";
import { adminUserGetHandler } from "../user/get";

export const adminUsersClearHandler = async (
  input: unknown,
  context: ActionAPIContext,
) => {
  await adminUserGetHandler({}, context);

  const users = await supabase.auth.admin.listUsers();

  if (users.error) {
    console.error("ERROR: adminUsersClearHandler:", users.error);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: users.error.message,
    });
  }

  const deleteUsers = await Promise.all(
    users.data.users
      .filter((user) => user.is_anonymous)
      .map((user) => {
        return supabase.auth.admin.deleteUser(user.id);
      }),
  );

  const errors = deleteUsers
    .map((item) => item.error)
    .filter(Boolean) as AuthError[];

  if (errors.length) {
    console.error("ERROR: adminUsersClearHandler:", errors);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: errors.map((error) => error.message).join(", "),
    });
  }
};

export const clear = defineAction({
  accept: "form",
  handler: adminUsersClearHandler,
});
