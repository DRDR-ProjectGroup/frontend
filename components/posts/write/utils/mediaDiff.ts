import {
  collectMediaIdsAndOrdersFromHtml,
  collectNewMediaOrdersFromHtml,
} from './imageProcessor';

export function buildEditMediaPayload(initialHtml: string, finalHtml: string) {
  const initial = collectMediaIdsAndOrdersFromHtml(initialHtml);
  const final = collectMediaIdsAndOrdersFromHtml(finalHtml);

  // 삭제된 미디어 ID 추출
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

  // 새로 추가된 미디어 순서 추출
  const newMediaOrders = collectNewMediaOrdersFromHtml(finalHtml);

  // 이전 미디어 & 복붙된 이전 미디어 ID + 순서 추출
  const oldMediaIdsAndOrders: Record<string, number[]> = {}; // { mediaId: [순서], ... }
  final.forEach(({ mediaId, order }) => {
    if (!mediaId) return;
    oldMediaIdsAndOrders[mediaId] ??= []; // 왼쪽 값이 null 또는 undefined 일 때만 오른쪽 값을 할당
    oldMediaIdsAndOrders[mediaId].push(order);
  });

  console.log(
    'oldMediaIdsAndOrders=================================',
    oldMediaIdsAndOrders,
  );
  console.log('final=================================', final);

  return {
    oldMediaIdsAndOrders,
    deletedMediaIds,
    newMediaOrders,
  };
}
