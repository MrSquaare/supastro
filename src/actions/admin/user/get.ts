import { createClient } from "@supabase/supabase-js";
import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";
import { SUPABASE_SERVER_KEY, SUPABASE_SERVER_URL } from "astro:env/server";

import { handleAuth, handleUnauth } from "../auth/utils";

export const adminUserGetHandler = async (
  input: unknown,
  context: ActionAPIContext,
) => {
  const accessToken = context.cookies.get("admin_access_token");
  const refreshToken = context.cookies.get("admin_refresh_token");

  if (!accessToken || !refreshToken) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  const authSupabase = createClient(SUPABASE_SERVER_URL, SUPABASE_SERVER_KEY);
  const user = await authSupabase.auth.getUser(accessToken.value);

  if (user.error) {
    if (user.error.code === "bad_jwt") {
      await handleUnauth(context);

      const newAuth = await authSupabase.auth.refreshSession({
        refresh_token: refreshToken.value,
      });
      const newAuthData = await handleAuth(newAuth, context);

      return newAuthData.user;
    }

    throw new ActionError({
      code: "UNAUTHORIZED",
      message: user.error.message,
    });
  }

  if (user.data.user.is_anonymous) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  return user.data.user;
};

export const get = defineAction({
  handler: adminUserGetHandler,
});
