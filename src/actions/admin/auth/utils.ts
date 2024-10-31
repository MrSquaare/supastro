import type { AuthResponse } from "@supabase/supabase-js";
import { ActionError, type ActionAPIContext } from "astro:actions";

export const handleAuth = async (
  auth: AuthResponse,
  context: ActionAPIContext,
) => {
  if (auth.error) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: auth.error.message,
    });
  }

  if (!auth.data.session) {
    console.error("ERROR: handleAuth:", auth);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create session",
    });
  }

  if (!auth.data.user) {
    console.error("ERROR: handleAuth:", auth);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create user",
    });
  }

  context.cookies.set("admin_access_token", auth.data.session.access_token, {
    path: "/admin",
  });
  context.cookies.set("admin_refresh_token", auth.data.session.refresh_token, {
    path: "/admin",
  });

  return auth.data;
};

export const handleUnauth = (context: ActionAPIContext) => {
  context.cookies.delete("admin_access_token", {
    path: "/admin",
  });
  context.cookies.delete("admin_refresh_token", {
    path: "/admin",
  });
};
