import { collectMediaIdsAndOrdersFromHtml } from './imageProcessor';

export function buildEditMediaPayload(initialHtml: string, finalHtml: string) {
  const initial = collectMediaIdsAndOrdersFromHtml(initialHtml);
  const final = collectMediaIdsAndOrdersFromHtml(finalHtml);

  const deletedMediaIds = initial
    .filter((i) => !final.some((f) => f.mediaId === i.mediaId))
    .map((i) => i.mediaId);

  const newMediaOrders = final
    .filter((f) => !initial.some((i) => i.mediaId === f.mediaId))
    .map((f) => f.order);

  const oldMediaIdsAndOrders = initial.filter((i) =>
    final.some((f) => f.mediaId === i.mediaId),
  );

  return {
    oldMediaIdsAndOrders,
    deletedMediaIds,
    newMediaOrders,
  };
}
