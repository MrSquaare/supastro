import { create } from "./create";
import { del } from "./delete";
import { get } from "./get";
import { list } from "./list";
import { reset } from "./reset";
import { start } from "./start";
import { stop } from "./stop";
import { update } from "./update";

export const parties = {
  list,
  create,
  get,
  update,
  delete: del,
  start,
  stop,
  reset,
};
