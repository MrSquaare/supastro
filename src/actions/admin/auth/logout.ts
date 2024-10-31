import { defineAction, type ActionAPIContext } from "astro:actions";

import { handleUnauth } from "./utils";

export const adminAuthLogoutHandler = async (
  input: unknown,
  context: ActionAPIContext,
) => {
  handleUnauth(context);
};

export const logout = defineAction({
  accept: "form",
  handler: adminAuthLogoutHandler,
});
