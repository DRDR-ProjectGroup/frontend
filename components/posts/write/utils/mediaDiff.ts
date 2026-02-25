import {
  collectMediaIdsAndOrdersFromHtml,
  collectNewMediaOrdersFromHtml,
} from './imageProcessor';

export function buildEditMediaPayload(initialHtml: string, finalHtml: string) {
  const initial = collectMediaIdsAndOrdersFromHtml(initialHtml);
  const final = collectMediaIdsAndOrdersFromHtml(finalHtml);
  console.log('finalHtml==============================', finalHtml);

  const deletedMediaIds = [
    ...new Set( // 중복된 값 제거 -> 스프레드 연산자로 배열로 변환
      initial
        .filter(
          ({ mediaId: initialMediaId }) =>
            initialMediaId &&
            !final.some(
              ({ mediaId: finalMediaId }) =>
                Number(finalMediaId) === Number(initialMediaId),
            ),
        )
        .map(({ mediaId: initialMediaId }) => initialMediaId),
    ),
  ];

  const newMediaOrders = collectNewMediaOrdersFromHtml(finalHtml);

  const oldMediaIdsAndOrders: Record<string, number> = {};
  final.forEach(({ mediaId: finalMediaId, order: finalOrder }) => {
    if (!finalMediaId) return;
    initial.forEach(({ mediaId: initialMediaId, order: initialOrder }) => {
      if (!initialMediaId) return;
      if (Number(finalMediaId) === Number(initialMediaId)) {
        oldMediaIdsAndOrders[finalMediaId] = finalOrder;
      }
    });
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
