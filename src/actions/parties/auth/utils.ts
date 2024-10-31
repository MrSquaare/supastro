import type { AuthResponse } from "@supabase/supabase-js";
import { ActionError, type ActionAPIContext } from "astro:actions";

export const handleAuth = async (
  partyId: number,
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

  context.cookies.set(
    `party_${partyId}_access_token`,
    auth.data.session.access_token,
    {
      path: "/",
    },
  );
  context.cookies.set(
    `party_${partyId}_refresh_token`,
    auth.data.session.refresh_token,
    {
      path: "/",
    },
  );

  return {
    session: auth.data.session,
    user: auth.data.user,
  };
};

export const handleUnauth = (partyId: number, context: ActionAPIContext) => {
  context.cookies.delete(`party_${partyId}_access_token`, {
    path: "/",
  });
  context.cookies.delete(`party_${partyId}_refresh_token`, {
    path: "/",
  });
};
