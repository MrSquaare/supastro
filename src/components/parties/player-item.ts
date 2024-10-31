export type PartiesPlayerItemPayload = {
  id: number;
  name: string | null;
  avatar_id: string | null;
};

export const getPartiesPlayerItemHTML = (payload: PartiesPlayerItemPayload) => {
  return `
    <div
      data-player-item="${payload.id}"
      class="flex flex-col items-center"
    >
      <img
        src="https://api.multiavatar.com/${payload.avatar_id}.svg"
        alt="${payload.name}"
        class="relative mb-2 flex max-w-32 max-h-32 shrink-0 overflow-hidden rounded-full outline outline-2 outline-black"
      />
      <p class="text-center font-medium">${payload.name}</p>
    </div>
  `;
};

export const createPartiesPlayerItemElement = (
  payload: PartiesPlayerItemPayload,
) => {
  const element = document.createElement("div");

  element.outerHTML = getPartiesPlayerItemHTML(payload);

  return element;
};
