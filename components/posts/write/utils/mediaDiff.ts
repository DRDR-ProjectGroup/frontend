import {
  collectMediaIdsAndOrdersFromHtml,
  collectNewMediaOrdersFromHtml,
} from './imageProcessor';

export function buildEditMediaPayload(initialHtml: string, finalHtml: string) {
  const initial = collectMediaIdsAndOrdersFromHtml(initialHtml);
  const final = collectMediaIdsAndOrdersFromHtml(finalHtml);
  console.log('finalHtml==============================', finalHtml);

  const deletedMediaIds = initial
    .filter(
      ({ mediaId: initialMediaId }) =>
        !final.some(
          ({ mediaId: finalMediaId }) =>
            Number(finalMediaId) === Number(initialMediaId),
        ),
    )
    .map(({ mediaId: initialMediaId }) => initialMediaId);

  const newMediaOrders = collectNewMediaOrdersFromHtml(finalHtml);

  const oldMediaIdsAndOrdersArray = initial.filter(
    ({ mediaId: initialMediaId }) =>
      final.some(
        ({ mediaId: finalMediaId }) =>
          Number(finalMediaId) === Number(initialMediaId),
      ),
  );
  const oldMediaIdsAndOrders: Record<string, number> = {};
  oldMediaIdsAndOrdersArray.forEach(({ mediaId, order }) => {
    oldMediaIdsAndOrders[mediaId] = order;
  });

  console.log('initial', initial);
  console.log('final', final);
  console.log('deletedMediaIds', deletedMediaIds);
  console.log('newMediaOrders', newMediaOrders);
  console.log('oldMediaIdsAndOrders', oldMediaIdsAndOrders);

  return {
    oldMediaIdsAndOrders,
    deletedMediaIds,
    newMediaOrders,
  };
}
