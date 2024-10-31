export type PartiesItemPayload = {
  id: number;
  name: string;
  status: string;
};

export const getPartiesItemHTML = (payload: PartiesItemPayload) => {
  return `
    <li
      data-party-item="${payload.id}"
      class="flex items-center gap-2 rounded-base border-2 border-border bg-main p-4 text-black shadow-light"
    >
      <h2 class="text-2xl font-medium">${payload.name}</h2>
      <span
        class="inline-flex items-center rounded-base border-2 border-border bg-white px-2.5 py-0.5 text-xs font-base text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >${payload.status}</span
      >
      ${
        payload.status === "OPEN"
          ? `
          <a
            href="/parties/${payload.id}/join"
            class="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-base border-2 border-border bg-white px-4 py-2 text-sm font-base text-text shadow-light ring-offset-white transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >Join</a
          >
        `
          : payload.status === "CLOSE"
            ? `
          <a
            href="/parties/${payload.id}/results"
            class="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-base border-2 border-border bg-white px-4 py-2 text-sm font-base text-text shadow-light ring-offset-white transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >See results</a
          >
        `
            : ""
      }
    </div>
  `;
};

export const createPartiesItemElement = (payload: PartiesItemPayload) => {
  const element = document.createElement("div");

  element.outerHTML = getPartiesItemHTML(payload);

  return element;
};
