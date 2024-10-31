import type { ActionAPIContext } from "astro:actions";

export type ActionHandler<Input, Output> = (
  input: Input,
  context: ActionAPIContext,
) => Promise<Output>;
